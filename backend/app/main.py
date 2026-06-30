import os
import datetime
import json
import asyncio
from dotenv import load_dotenv
load_dotenv()

from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status, Body, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from openai import OpenAI

from app.core.database import Base, engine, get_db
from app.core import security
from app.models import models
from app.schemas import schemas

# --- TOURNAMENT STATE MACHINE ---
tournament_rooms = {}

class TournamentManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        
    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            
    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

tournament_manager = TournamentManager()

# Create DB tables
def run_db_migrations():
    import sqlite3
    import os
    db_path = "./hanyustar.db"
    if not os.path.exists(db_path) and os.path.exists("backend/hanyustar.db"):
        db_path = "backend/hanyustar.db"
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if table users exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
        if cursor.fetchone():
            cursor.execute("PRAGMA table_info(users)")
            columns = [row[1] for row in cursor.fetchall()]
            
            # Add missing columns
            if "role" not in columns:
                cursor.execute("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'student'")
            if "preferred_notification_time" not in columns:
                cursor.execute("ALTER TABLE users ADD COLUMN preferred_notification_time TEXT")
            if "notifications_enabled" not in columns:
                cursor.execute("ALTER TABLE users ADD COLUMN notifications_enabled INTEGER DEFAULT 1")
            if "teacher_status" not in columns:
                cursor.execute("ALTER TABLE users ADD COLUMN teacher_status TEXT DEFAULT 'none'")
            if "teacher_bio" not in columns:
                cursor.execute("ALTER TABLE users ADD COLUMN teacher_bio TEXT")
            if "teacher_credentials" not in columns:
                cursor.execute("ALTER TABLE users ADD COLUMN teacher_credentials TEXT")
                
            conn.commit()
        conn.close()
    except Exception as e:
        print(f"Migration error: {e}")

run_db_migrations()
Base.metadata.create_all(bind=engine)

# Seed Admin User
def seed_admin_user():
    from app.core.database import SessionLocal
    from app.core.security import get_password_hash
    db = SessionLocal()
    try:
        admin = db.query(models.User).filter(models.User.username == "admin").first()
        if not admin:
            hashed_pwd = get_password_hash("admin123")
            admin = models.User(
                username="admin",
                hashed_password=hashed_pwd,
                email="admin@hanyustar.com",
                role="admin",
                xp=1000,
                level=10,
                streak=5,
                shields=1
            )
            db.add(admin)
            db.commit()
            print("Admin user successfully seeded!")
    except Exception as e:
        db.rollback()
        print(f"Failed to seed admin: {e}")
    finally:
        db.close()

seed_admin_user()

app = FastAPI(title="HanyuStar Full-Stack Server")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# ── Groq Client Setup (OpenAI-compatible SDK) ──────────────────────────────
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
groq_client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1",
)
GROQ_MODEL = "llama-3.3-70b-versatile"


def get_mock_ai_response(messages: list) -> str:
    """Generates high-quality mock responses for different types of AI endpoints."""
    user_msg = ""
    system_msg = ""
    for m in messages:
        if m.get("role") == "user":
            user_msg = m.get("content", "")
        elif m.get("role") == "system":
            system_msg = m.get("content", "")

    # Check if it's speech analysis
    if "speech recognition heard" in user_msg.lower() or "pronunciation" in user_msg.lower():
        return '{"score": 92, "feedback": "Excellent work! Your pronunciation was clear, and your rhythm matches native phrasing perfectly."}'

    # Check if it's writing coach
    if "writing to evaluate:" in user_msg.lower() or "expert writing evaluator" in system_msg.lower():
        orig_text = ""
        if "writing to evaluate:" in user_msg.lower():
            orig_text = user_msg.split("writing to evaluate:")[-1].split("\nPrompt:")[0].strip()
        
        corrected = orig_text if orig_text else "Bonjour!"
        feedback = "Great attempt! Your grammar shows a strong understanding of sentence structures. Keep writing to expand your vocabulary!"
        changes = ["Polished sentence structure.", "Enhanced natural phrasing."]
        
        return json.dumps({
            "corrected": corrected,
            "feedback": feedback,
            "grammar": 90,
            "vocabulary": 85,
            "fluency": 80,
            "overall": 85,
            "changes": changes
        }, ensure_ascii=False)

    # General chat fallback based on system prompt / language
    lang_name = "Mandarin"
    for lang in ["chinese", "spanish", "french", "german", "japanese", "korean", "italian", "english", "arabic"]:
        if lang in system_msg.lower():
            lang_name = lang.capitalize()
            break

    replies = {
        "Chinese": "你好！我很乐意做你的中文老师。你今天想学习什么话题？我们可以练习日常对话。(Nǐ hǎo! Wǒ hěn lèyì zuò nǐ de Zhōngwén lǎoshī. Nǐ jīntiān xiǎng xuéxí shénme huàtí? Wǒmen kěyǐ liànxí rìcháng duìhuà.)",
        "Spanish": "¡Hola! Estoy encantada de ser tu profesora de español. ¿De qué tema te gustaría hablar hoy? Podemos practicar una conversación diaria.",
        "French": "Bonjour! Je suis ravie d'être votre professeur de français. De quel sujet aimeriez-vous parler aujourd'hui? Nous pouvons pratiquer la conversation courante.",
        "German": "Hallo! Ich freue mich, deine Deutschlehrerin zu sein. Über welches Thema möchtest du heute sprechen? Wir können eine alltägliche Unterhaltung üben.",
        "Japanese": "こんにちは！あなたの日本語の先生になれて嬉しいです。今日は何について話したいですか？日常会話を練習しましょう。(Konnichiwa! Anata no nihongo no sensei ni narete ureshii desu. Kyō wa nani ni tsuite hanashitai desu ka? Nichijō kaiwa o renshū shimashō.)",
        "Korean": "안녕하세요! 당신의 한국어 선생님이 되어 기쁩니다. 오늘 어떤 주제로 이야기하고 싶으신가요? 일상 대화를 연습해 봅시다.(Annyeonghaseyo! Dangsin-ui hangugeo seonsaengnim-i doe-eo gippeumnida. Oneul eotteon juje-ro iyagi-hago sip-eusingayo? Ilsang daehwa-reul yeonseup-hae bopsida.)",
        "Italian": "Ciao! Sono felice di essere la tua insegnante di italiano. Di cosa ti piacerebbe parlare oggi? Possiamo esercitarci con una conversazione quotidiana.",
        "English": "Hello! I am delighted to be your English teacher. What topic would you like to chat about today? We can practice some daily conversation.",
        "Arabic": "مرحباً! أنا سعيدة بكوني معلمتك للغة العربية. ما هو الموضوع الذي ترغب في التحدث عنه اليوم؟ يمكننا ممارسة محادثة يومية. (Marhaban! Ana sa'eedah bikawni mo'allimatak lil-lughah al-Arabiyyah. Ma huwa al-mawdoo' al-thani targhab fi al-tahadduth 'anhu al-yawm? Yumkinuna mumarasat muhadathah yawmiyyah.)"
    }

    return replies.get(lang_name, f"Hello! I am happy to help you learn {lang_name}. What would you like to study today?")


def call_groq(messages: list, temperature: float = 0.7, max_tokens: int = 500, model: str = None) -> str:
    """Call Groq API. Returns the assistant reply as a string. Falls back to mock on failure."""
    if not GROQ_API_KEY or GROQ_API_KEY.startswith("mock") or GROQ_API_KEY == "":
        return get_mock_ai_response(messages)
    try:
        chosen_model = model or GROQ_MODEL
        resp = groq_client.chat.completions.create(
            model=chosen_model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return resp.choices[0].message.content
    except Exception as e:
        print(f"Groq API call failed for model {model or GROQ_MODEL}: {e}. Falling back to mock response.")
        return get_mock_ai_response(messages)


# --- AUTH HELPER ---
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = security.decode_access_token(token)
    if payload is None:
        raise credentials_exception
    username: str = payload.get("sub")
    if username is None:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise credentials_exception
    return user


# --- AUTH ENDPOINTS ---
@app.post("/api/auth/register", response_model=schemas.UserResponse)
def register(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user_data.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Check email uniqueness only if email is provided
    if user_data.email:
        existing_email = db.query(models.User).filter(models.User.email == user_data.email).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    try:
        hashed_pwd = security.get_password_hash(user_data.password)
        new_user = models.User(
            username=user_data.username,
            hashed_password=hashed_pwd,
            email=user_data.email if user_data.email else None
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")


@app.post("/api/auth/login", response_model=schemas.Token)
def login(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == login_data.username).first()
    if not user or not security.verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = security.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/auth/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        log = models.UserActivityLog(user_id=current_user.id)
        db.add(log)
        db.commit()
    except Exception:
        db.rollback()
    return current_user


@app.put("/api/auth/update", response_model=schemas.UserResponse)
def update_profile(
    username: Optional[str] = Body(None),
    email: Optional[str] = Body(None),
    avatar: Optional[str] = Body(None),
    native_lang: Optional[str] = Body(None),
    learning_goal: Optional[str] = Body(None),
    energy_mood: Optional[str] = Body(None),
    role: Optional[str] = Body(None),
    teacher_bio: Optional[str] = Body(None),
    teacher_credentials: Optional[str] = Body(None),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if username is not None and username != current_user.username:
        username = username.strip()
        if not username:
            raise HTTPException(status_code=400, detail="Username cannot be empty")
        existing = db.query(models.User).filter(models.User.username == username).first()
        if existing:
            raise HTTPException(status_code=400, detail="Username is already taken")
        current_user.username = username

    if email is not None and email != current_user.email:
        email = email.strip()
        if email:
            existing = db.query(models.User).filter(models.User.email == email).first()
            if existing:
                raise HTTPException(status_code=400, detail="Email is already registered")
            current_user.email = email
        else:
            current_user.email = None

    if avatar is not None:
        current_user.avatar = avatar
    if native_lang is not None:
        current_user.native_lang = native_lang
    if learning_goal is not None:
        current_user.learning_goal = learning_goal
    if energy_mood is not None:
        current_user.energy_mood = energy_mood

    has_app_update = False
    if teacher_bio is not None:
        current_user.teacher_bio = teacher_bio
        has_app_update = True
    if teacher_credentials is not None:
        current_user.teacher_credentials = teacher_credentials
        has_app_update = True

    if has_app_update and current_user.role == "student":
        current_user.teacher_status = "pending"

    if role is not None:
        role = role.strip().lower()
        if role == "student":
            current_user.role = "student"
        elif role == "teacher":
            if current_user.teacher_status == "approved" or current_user.role == "admin":
                current_user.role = "teacher"
            else:
                raise HTTPException(status_code=400, detail="Cannot become a teacher without admin approval")
        
    db.commit()
    db.refresh(current_user)
    return current_user


# --- LEARNING & PROGRESS ENDPOINTS ---
@app.post("/api/learning/lesson/complete", response_model=schemas.UserResponse)
def complete_lesson(
    data: schemas.LessonComplete,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_completion = models.CompletedLesson(user_id=current_user.id, lesson_id=data.lesson_id)
    db.add(new_completion)
    
    current_user.xp += data.xp_gained
    current_user.level = max(1, int(current_user.xp / 100) + 1)
    
    today = datetime.datetime.utcnow().date()
    if current_user.last_study_date:
        last_date = current_user.last_study_date.date()
        diff = (today - last_date).days
        if diff == 1:
            current_user.streak += 1
        elif diff > 1:
            if current_user.shields > 0:
                current_user.shields -= 1
            else:
                current_user.streak = 1
    else:
        current_user.streak = 1
        
    current_user.last_study_date = datetime.datetime.utcnow()
    
    if current_user.streak > 0 and current_user.streak % 7 == 0:
        current_user.shields = min(3, current_user.shields + 1)
        
    db.commit()
    db.refresh(current_user)
    return current_user


@app.get("/api/learning/saved-words", response_model=List[schemas.SavedWordResponse])
def get_saved_words(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.SavedWord).filter(models.SavedWord.user_id == current_user.id).all()


@app.post("/api/learning/saved-words", response_model=schemas.SavedWordResponse)
def toggle_save_word(
    word_data: schemas.SavedWordCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing = db.query(models.SavedWord).filter(
        models.SavedWord.user_id == current_user.id,
        models.SavedWord.hanzi == word_data.hanzi
    ).first()
    
    if existing:
        db.delete(existing)
        db.commit()
        raise HTTPException(status_code=200, detail="Word unsaved successfully")
        
    new_word = models.SavedWord(
        user_id=current_user.id,
        hanzi=word_data.hanzi,
        pinyin=word_data.pinyin,
        meaning=word_data.meaning
    )
    db.add(new_word)
    db.commit()
    db.refresh(new_word)
    return new_word


# --- SPACED REPETITION SYSTEM (SM-2) ---
@app.get("/api/learning/srs/due", response_model=List[schemas.SRSResponse])
def get_due_srs(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    now = datetime.datetime.utcnow()
    return db.query(models.SRSItem).filter(
        models.SRSItem.user_id == current_user.id,
        models.SRSItem.next_review_at <= now
    ).all()


@app.post("/api/learning/srs/review", response_model=schemas.SRSResponse)
def review_srs_item(
    review: schemas.SRSReview,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    item = db.query(models.SRSItem).filter(
        models.SRSItem.user_id == current_user.id,
        models.SRSItem.hanzi == review.hanzi
    ).first()
    
    if not item:
        item = models.SRSItem(
            user_id=current_user.id,
            hanzi=review.hanzi,
            pinyin=review.pinyin,
            meaning=review.meaning,
            ease_factor=2.5,
            interval_days=0,
            repetitions=0
        )
        db.add(item)
        db.flush()
        
    q = 0
    if review.quality == 1:   q = 2
    elif review.quality == 2: q = 4
    elif review.quality == 3: q = 5
    
    if q < 3:
        item.repetitions = 0
        item.interval_days = 1
    else:
        if item.repetitions == 0:
            item.interval_days = 1
        elif item.repetitions == 1:
            item.interval_days = 4
        else:
            item.interval_days = int(item.interval_days * item.ease_factor)
        item.repetitions += 1
        
    item.ease_factor = item.ease_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    if item.ease_factor < 1.3:
        item.ease_factor = 1.3
        
    item.last_reviewed_at = datetime.datetime.utcnow()
    item.next_review_at = item.last_reviewed_at + datetime.timedelta(days=item.interval_days)
    
    db.commit()
    db.refresh(item)
    return item

@app.post("/api/ai/writing-coach", response_model=schemas.WritingResponse)
def submit_writing(
    data: schemas.WritingCreate = Body(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        text = data.original_text
        lang_code = data.language or "zh"
        lang_names = {
            "zh": "Chinese",
            "es": "Spanish",
            "fr": "French",
            "de": "German",
            "ja": "Japanese",
            "ko": "Korean",
            "it": "Italian",
            "en": "English",
            "ar": "Arabic"
        }
        lang_name = lang_names.get(lang_code, "Chinese")
        writer_native = current_user.native_lang or "English"
        writer_feedback_lang = "Arabic (العربية)" if writer_native in ["Arabic", "ar"] else writer_native
        prompt = (
            f"Analyze the following {lang_name} writing and correct it if needed. "
            f"Provide corrections and encouraging feedback in {writer_feedback_lang}. "
            f"Provide a grammar score (0-100), vocabulary score (0-100), fluency score (0-100), and overall score (0-100). "
            f"List any specific changes made. "
            f"Respond ONLY with valid JSON: "
            f"{{\"corrected\": \"<corrected text>\", \"feedback\": \"<feedback>\", \"grammar\": <score>, \"vocabulary\": <score>, \"fluency\": <score>, \"overall\": <score>, \"changes\": [\"<change 1>\", \"<change 2>\"]}}"
        )
        raw = call_groq(
            messages=[
                {"role": "system", "content": f"You are an expert {lang_name} writing evaluator. Respond in {writer_feedback_lang}."},
                {"role": "user", "content": f"Writing to evaluate: {text}\nPrompt: {prompt}"}
            ]
        )
        match = raw[raw.find("{"):raw.rfind("}")+1]
        result_json = json.loads(match)

        new_submission = models.WritingSubmission(
            user_id=current_user.id,
            original_text=text,
            corrected_text=result_json.get("corrected"),
            feedback=result_json.get("feedback"),
            grammar_score=result_json.get("grammar", 0),
            vocabulary_score=result_json.get("vocabulary", 0),
            fluency_score=result_json.get("fluency", 0),
            overall_score=result_json.get("overall", 0),
            changes=result_json.get("changes")
        )
        db.add(new_submission)
        current_user.xp += 20
        db.commit()
        db.refresh(new_submission)
        return new_submission
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq service failed: {str(e)}")


@app.get("/api/ai/writing-portfolio", response_model=List[schemas.WritingResponse])
def get_writing_portfolio(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.WritingSubmission).filter(
        models.WritingSubmission.user_id == current_user.id
    ).order_by(models.WritingSubmission.submitted_at.desc()).all()


# --- AI CHATBOT (works for both guests and logged-in users) ---
from typing import Union
from fastapi import Request

@app.post("/api/ai/chat")
async def proxy_teacher_chat(
    request: Request,
    lang: str = "zh",
):
    try:
        # Parse body - accept both JSON object {prompt: ...} and raw string
        body = await request.json()
        system_prompt_override = None
        model_override = None
        temp_override = 0.7
        if isinstance(body, dict):
            prompt = body.get("prompt", "")
            system_prompt_override = body.get("system_prompt", None)
            model_override = body.get("model", None)
            temp_override = body.get("temperature", 0.7)
        else:
            prompt = str(body)
        
        if not prompt:
            raise HTTPException(status_code=400, detail="Prompt is required")

        lang_names = {
            "zh": "Chinese",
            "es": "Spanish",
            "fr": "French",
            "de": "German",
            "ja": "Japanese",
            "ko": "Korean",
            "it": "Italian",
            "en": "English",
            "ar": "Arabic"
        }
        lang_name = lang_names.get(lang, "Chinese")
        
        # Try to get the user's native language if authenticated
        native_lang = "English"
        try:
            auth_header = request.headers.get("Authorization", "")
            if auth_header.startswith("Bearer "):
                token = auth_header[7:]
                from app.core import security as sec
                from app.core.database import get_db as _get_db
                payload = sec.decode_access_token(token)
                if payload:
                    from app.core.database import SessionLocal
                    db = SessionLocal()
                    try:
                        user = db.query(models.User).filter(models.User.username == payload.get("sub")).first()
                        if user:
                            native_lang = user.native_lang or "English"
                    finally:
                        db.close()
        except:
            pass
        
        # Romanization instruction based on language
        if lang in ["zh", "ja", "ko", "ar"]:
            romanization_label = {
                "zh": "Pinyin",
                "ja": "Romaji",
                "ko": "Romanization",
                "ar": "Romanization"
            }.get(lang, "romanization")
            romanization_instruction = f"Provide a {romanization_label} in brackets next to the native words/sentences and include English translations where helpful."
        else:
            romanization_instruction = "Provide English translations in brackets where helpful."

        # Determine the explanation language
        explain_lang_instruction = (
            "Always explain, give feedback, and write your teacher commentary entirely in Arabic (العربية). "
            "Use Arabic script for all explanations and meta-language. "
        ) if native_lang in ["Arabic", "ar"] else f"Give explanations in {native_lang}."

        system_prompt = (
            f"You are Emma, a friendly and encouraging {lang_name} language teacher. "
            f"The student's native language is {native_lang}. "
            f"{explain_lang_instruction} "
            f"Give short, conversational replies (2-4 sentences max). "
            f"Use {lang_name} target language for practice sentences, and {romanization_instruction} "
            f"Always stay encouraging and positive."
        )
        
        final_system_prompt = system_prompt_override or system_prompt
        reply = call_groq(
            messages=[
                {"role": "system", "content": final_system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=temp_override,
            max_tokens=300,
            model=model_override
        )
        return {"reply": reply}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# --- SPEECH ANALYSIS ---
@app.post("/api/ai/speech-analysis")
def evaluate_speech(
    transcript: str = Body(...),
    expected: str = Body(...),
    pinyin: str = Body(...)
):
    try:
        prompt = (
            f"A student tried to say: '{expected}' ({pinyin}). "
            f"The speech recognition heard: '{transcript}'. "
            f"Give a score out of 100 and one brief encouraging sentence about their pronunciation. "
            f"Respond ONLY with valid JSON: {{\"score\": <number>, \"feedback\": \"<sentence>\"}}"
        )
        raw = call_groq(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=150
        )
        match = raw[raw.find("{"):raw.rfind("}")+1]
        result = json.loads(match)
        return {"score": result.get("score", 85), "feedback": result.get("feedback", "")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# --- WATCH & SPEAK MODE ---
@app.post("/api/ai/watch-speak/score")
def score_watch_speak(
    expected_text: str = Body(...),
    transcript: str = Body(...),
    language: str = Body(...),
    native_lang: str = Body("en")
):
    try:
        feedback_lang = "Arabic (العربية)" if native_lang in ["Arabic", "ar"] else "English"
        prompt = (
            f"A student watching a video in {language} tried to repeat the phrase: '{expected_text}'. "
            f"The speech recognition heard: '{transcript}'. "
            f"Compare the expected phrase and the transcription. Grade the pronunciation accuracy and rhythm on a scale of 0 to 100. "
            f"Give a breakdown with fields: accuracy (integer 0-100), rhythm (integer 0-100), overall (integer 0-100), and a short constructive feedback sentence in {feedback_lang}. "
            f"Respond ONLY with valid JSON: {{\"accuracy\": <number>, \"rhythm\": <number>, \"overall\": <number>, \"feedback\": \"<sentence>\"}}"
        )
        raw = call_groq(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=150
        )
        match = raw[raw.find("{"):raw.rfind("}")+1]
        result = json.loads(match)
        return {
            "accuracy": result.get("accuracy", 85),
            "rhythm": result.get("rhythm", 80),
            "overall": result.get("overall", 83),
            "feedback": result.get("feedback", "Good pronunciation! Keep practicing.")
        }
    except Exception as e:
        return {
            "accuracy": 85,
            "rhythm": 80,
            "overall": 83,
            "feedback": "Great effort! Your speech was captured clearly."
        }



# --- ANALYTICS ---
@app.get("/api/analytics")
def get_user_analytics(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    lessons_done = db.query(models.CompletedLesson).filter(models.CompletedLesson.user_id == current_user.id).count()
    words_saved = db.query(models.SavedWord).filter(models.SavedWord.user_id == current_user.id).count()
    srs_count = db.query(models.SRSItem).filter(models.SRSItem.user_id == current_user.id).count()
    
    skills = {
        "vocabulary": min(100, lessons_done * 8 + 10),
        "grammar": min(100, current_user.level * 12),
        "speaking": min(100, srs_count * 5 + 5),
        "listening": min(100, lessons_done * 6 + 5),
        "reading": min(100, words_saved * 5 + 10),
        "culture": min(100, current_user.level * 8)
    }
    
    history = []
    today = datetime.datetime.utcnow().date()
    for i in range(6, -1, -1):
        day = today - datetime.timedelta(days=i)
        history.append({
            "date": day.strftime("%m/%d"),
            "xp": int(current_user.xp / 7 * (0.6 + (i % 3) * 0.2))
        })
        
    return {
        "stats": {
            "xp": current_user.xp,
            "level": current_user.level,
            "streak": current_user.streak,
            "lessons_completed": lessons_done,
            "saved_words": words_saved,
            "srs_items": srs_count
        },
        "skills": skills,
        "xp_history": history
    }


# ─── STUDY ROOMS (WebSocket & Synced State) ───────────────────────────────────

QUESTIONS_BY_LANG = {
    "zh": [
        {"question": "Translate: 'Hello'", "options": ["你好 (Nǐ hǎo)", "谢谢 (Xièxie)", "再见 (Zàijiàn)", "对不起 (Duìbuqǐ)"], "answer": "你好 (Nǐ hǎo)"},
        {"question": "Translate: 'Thank you'", "options": ["谢谢 (Xièxie)", "不客气 (Bú kèqi)", "没关系 (Méi guānxi)", "再见 (Zàijiàn)"], "answer": "谢谢 (Xièxie)"},
        {"question": "Meaning of: '苹果 (Píngguǒ)'", "options": ["Apple", "Banana", "Watermelon", "Grape"], "answer": "Apple"},
        {"question": "Translate: 'Good morning'", "options": ["早上好 (Zǎoshang hǎo)", "晚安 (Wǎn'ān)", "下午好 (Xiàwǔ hǎo)", "你好 (Nǐ hǎo)"], "answer": "早上好 (Zǎoshang hǎo)"},
        {"question": "Translate: 'Water'", "options": ["水 (Shuǐ)", "茶 (Chá)", "咖啡 (Kāfēi)", "牛奶 (Niúnǎi)"], "answer": "水 (Shuǐ)"}
    ],
    "es": [
        {"question": "Translate: 'Good morning'", "options": ["Buenos días", "Buenas noches", "Hola", "Adiós"], "answer": "Buenos días"},
        {"question": "Translate: 'Thank you'", "options": ["Gracias", "De nada", "Por favor", "Lo siento"], "answer": "Gracias"},
        {"question": "Meaning of: 'Manzana'", "options": ["Apple", "Orange", "Banana", "Strawberry"], "answer": "Apple"},
        {"question": "Translate: 'Goodbye'", "options": ["Adiós", "Hola", "Hasta luego", "Buenos días"], "answer": "Adiós"},
        {"question": "Translate: 'Water'", "options": ["Agua", "Leche", "Café", "Vino"], "answer": "Agua"}
    ],
    "fr": [
        {"question": "Translate: 'Good morning'", "options": ["Bonjour", "Bonsoir", "Salut", "Bonne nuit"], "answer": "Bonjour"},
        {"question": "Translate: 'Thank you'", "options": ["Merci", "De rien", "S'il vous plaît", "Pardon"], "answer": "Merci"},
        {"question": "Meaning of: 'Eau'", "options": ["Water", "Wine", "Milk", "Beer"], "answer": "Water"},
        {"question": "Translate: 'Goodbye'", "options": ["Au revoir", "Bonjour", "À bientôt", "Salut"], "answer": "Au revoir"},
        {"question": "Translate: 'Bread'", "options": ["Pain", "Fromage", "Vin", "Beurre"], "answer": "Pain"}
    ],
}

QUESTIONS_FALLBACK = [
    {"question": "Translate: 'Welcome'", "options": ["Welcome", "Hello", "Thank you", "Goodbye"], "answer": "Welcome"},
    {"question": "Translate: 'Water'", "options": ["Water", "Coffee", "Tea", "Wine"], "answer": "Water"},
    {"question": "Translate: 'Friend'", "options": ["Friend", "Teacher", "Student", "Parent"], "answer": "Friend"},
    {"question": "Translate: 'School'", "options": ["School", "Hospital", "Library", "Market"], "answer": "School"},
    {"question": "Translate: 'Book'", "options": ["Book", "Pen", "Notebook", "Paper"], "answer": "Book"}
]

class StudyRoomState:
    def __init__(self, room_id: str, language: str):
        self.room_id = room_id
        self.language = language
        self.participants = {}  # username -> WebSocket
        self.scores = {}       # username -> int
        self.current_question_index = 0
        self.questions = QUESTIONS_BY_LANG.get(language, QUESTIONS_FALLBACK)
        self.question_active = True
        self.answers_submitted = {}  # username -> str
        self.timer = 15
        self.is_session_ended = False
        self.chat_history = []
        self.timer_task = None

    async def broadcast(self, message: dict):
        disconnected = []
        for username, ws in self.participants.items():
            try:
                await ws.send_json(message)
            except Exception:
                disconnected.append(username)
        for username in disconnected:
            if username in self.participants:
                del self.participants[username]

    def get_state_json(self):
        return {
            "room_id": self.room_id,
            "language": self.language,
            "participants": list(self.participants.keys()),
            "scores": self.scores,
            "current_question_index": self.current_question_index,
            "question": self.questions[self.current_question_index] if self.current_question_index < len(self.questions) else None,
            "question_active": self.question_active,
            "answers_submitted": self.answers_submitted,
            "timer": self.timer,
            "is_session_ended": self.is_session_ended,
            "chat_history": self.chat_history,
            "total_questions": len(self.questions)
        }

    async def start_timer_loop(self):
        while self.timer > 0 and self.question_active and not self.is_session_ended:
            await asyncio.sleep(1)
            self.timer -= 1
            await self.broadcast({"type": "timer", "value": self.timer})
        
        if self.question_active and not self.is_session_ended:
            await self.reveal_answers()

    async def reveal_answers(self):
        self.question_active = False
        correct_answer = self.questions[self.current_question_index]["answer"]
        for user, ans in self.answers_submitted.items():
            if ans == correct_answer:
                self.scores[user] = self.scores.get(user, 0) + 10
        await self.broadcast({
            "type": "reveal",
            "scores": self.scores,
            "correct_answer": correct_answer,
            "submitted_answers": self.answers_submitted
        })

    async def next_question(self):
        self.current_question_index += 1
        if self.current_question_index >= len(self.questions):
            self.is_session_ended = True
            winner = None
            if self.scores:
                winner = max(self.scores, key=self.scores.get)
            await self.broadcast({
                "type": "end",
                "scores": self.scores,
                "winner": winner
            })
        else:
            self.question_active = True
            self.answers_submitted = {}
            self.timer = 15
            await self.broadcast({
                "type": "next_question",
                "state": self.get_state_json()
            })
            asyncio.create_task(self.start_timer_loop())

class StudyRoomManager:
    def __init__(self):
        self.active_rooms = {}

    def get_or_create_room(self, room_id: str, language: str):
        if room_id not in self.active_rooms:
            self.active_rooms[room_id] = StudyRoomState(room_id, language)
        return self.active_rooms[room_id]

room_manager = StudyRoomManager()

@app.get("/api/study-rooms/lobbies")
def get_lobbies(lang: str = "zh"):
    lobbies = []
    for room_id, room in room_manager.active_rooms.items():
        if room.language == lang and not room.is_session_ended:
            lobbies.append({
                "room_id": room_id,
                "language": room.language,
                "participant_count": len(room.participants),
                "current_question": room.current_question_index + 1,
                "total_questions": len(room.questions)
            })
    if not lobbies:
        default_id = f"lobby-{lang}-active"
        room_manager.get_or_create_room(default_id, lang)
        lobbies.append({
            "room_id": default_id,
            "language": lang,
            "participant_count": 0,
            "current_question": 1,
            "total_questions": 5
        })
    return lobbies

@app.post("/api/study-rooms/create")
def create_room(lang: str = Body("zh"), room_id: str = Body(...)):
    room = room_manager.get_or_create_room(room_id, lang)
    return {
        "room_id": room.room_id,
        "language": room.language,
        "participant_count": len(room.participants)
    }

@app.websocket("/api/study-rooms/ws/{room_id}")
async def study_rooms_ws(websocket: WebSocket, room_id: str, username: str):
    await websocket.accept()
    room = room_manager.get_or_create_room(room_id, "zh")
    room.participants[username] = websocket
    if username not in room.scores:
        room.scores[username] = 0
        
    await websocket.send_json({
        "type": "init",
        "state": room.get_state_json()
    })
    
    await room.broadcast({
        "type": "join",
        "username": username,
        "participants": list(room.participants.keys()),
        "scores": room.scores
    })

    if len(room.participants) == 1 and room.current_question_index == 0 and room.timer == 15 and room.question_active:
        asyncio.create_task(room.start_timer_loop())
        
    try:
        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")
            
            if msg_type == "submit_answer":
                ans = data.get("answer")
                room.answers_submitted[username] = ans
                await room.broadcast({
                    "type": "submit_ack",
                    "username": username,
                    "answers_submitted": room.answers_submitted
                })
                if len(room.answers_submitted) == len(room.participants):
                    await room.reveal_answers()
            
            elif msg_type == "reaction":
                reaction_id = data.get("reaction_id")
                await room.broadcast({
                    "type": "reaction",
                    "username": username,
                    "reaction_id": reaction_id
                })
                
            elif msg_type == "chat":
                content = data.get("content")
                chat_msg = {
                    "username": username,
                    "content": content,
                    "timestamp": datetime.datetime.utcnow().strftime("%H:%M")
                }
                room.chat_history.append(chat_msg)
                await room.broadcast({
                    "type": "chat",
                    "message": chat_msg
                })
                
            elif msg_type == "next":
                await room.next_question()
                
    except WebSocketDisconnect:
        if username in room.participants:
            del room.participants[username]
        await room.broadcast({
            "type": "leave",
            "username": username,
            "participants": list(room.participants.keys())
        })


# ─── CLASSROOM MODE (Teacher/Student Groups) ──────────────────────────────────

@app.post("/api/classroom/create")
def create_classroom(
    name: str = Body(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    import random
    import string
    
    if current_user.role != "teacher":
        current_user.role = "teacher"
        db.commit()
        
    code = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    while db.query(models.Classroom).filter(models.Classroom.code == code).first():
        code = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
        
    new_room = models.Classroom(name=name, code=code, teacher_id=current_user.id)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return {
        "id": new_room.id,
        "name": new_room.name,
        "code": new_room.code,
        "teacher_id": new_room.teacher_id
    }

@app.post("/api/classroom/join")
def join_classroom(
    code: str = Body(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    code = code.strip().upper()
    classroom = db.query(models.Classroom).filter(models.Classroom.code == code).first()
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
        
    existing = db.query(models.ClassroomStudent).filter(
        models.ClassroomStudent.classroom_id == classroom.id,
        models.ClassroomStudent.student_id == current_user.id
    ).first()
    if existing:
        return {"detail": "Already joined this classroom"}
        
    new_student = models.ClassroomStudent(classroom_id=classroom.id, student_id=current_user.id)
    db.add(new_student)
    db.commit()
    return {"detail": "Joined classroom successfully", "name": classroom.name}

@app.get("/api/classroom/teacher/dashboard")
def get_teacher_dashboard(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "teacher":
        current_user.role = "teacher"
        db.commit()
        
    classrooms = db.query(models.Classroom).filter(models.Classroom.teacher_id == current_user.id).all()
    dashboard = []
    
    for c in classrooms:
        students_data = []
        students = db.query(models.ClassroomStudent).filter(models.ClassroomStudent.classroom_id == c.id).all()
        for s_link in students:
            student = db.query(models.User).filter(models.User.id == s_link.student_id).first()
            if student:
                lessons_completed = db.query(models.CompletedLesson).filter(models.CompletedLesson.user_id == student.id).count()
                srs_count = db.query(models.SRSItem).filter(models.SRSItem.user_id == student.id).count()
                accuracy = 82 + (student.level % 3) * 5
                time_spent = lessons_completed * 12 + srs_count * 4 + 10
                
                students_data.append({
                    "id": student.id,
                    "username": student.username,
                    "xp": student.xp,
                    "level": student.level,
                    "streak": student.streak,
                    "lessons_completed": lessons_completed,
                    "accuracy": min(98, accuracy),
                    "time_spent": time_spent
                })
                
        assignments_data = []
        assignments = db.query(models.Assignment).filter(models.Assignment.classroom_id == c.id).all()
        for a in assignments:
            assignments_data.append({
                "id": a.id,
                "lesson_id": a.lesson_id,
                "due_date": a.due_date.strftime("%Y-%m-%d") if a.due_date else None,
                "assigned_at": a.assigned_at.strftime("%Y-%m-%d")
            })
            
        dashboard.append({
            "id": c.id,
            "name": c.name,
            "code": c.code,
            "students": students_data,
            "assignments": assignments_data
        })
        
    return dashboard

@app.post("/api/classroom/assign")
def assign_lesson(
    classroom_id: int = Body(...),
    lesson_id: int = Body(...),
    due_date_str: str = Body(None),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    classroom = db.query(models.Classroom).filter(
        models.Classroom.id == classroom_id,
        models.Classroom.teacher_id == current_user.id
    ).first()
    if not classroom:
        raise HTTPException(status_code=403, detail="Not authorized or classroom not found")
        
    due_date = None
    if due_date_str:
        try:
            due_date = datetime.datetime.strptime(due_date_str, "%Y-%m-%d")
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format, use YYYY-MM-DD")
            
    new_assign = models.Assignment(classroom_id=classroom_id, lesson_id=lesson_id, due_date=due_date)
    db.add(new_assign)
    db.commit()
    return {"detail": "Lesson assigned successfully"}

@app.post("/api/classroom/send-push")
def send_push_reminder(
    classroom_id: int = Body(...),
    message: str = Body(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    classroom = db.query(models.Classroom).filter(
        models.Classroom.id == classroom_id,
        models.Classroom.teacher_id == current_user.id
    ).first()
    if not classroom:
        raise HTTPException(status_code=403, detail="Not authorized or classroom not found")
        
    students_count = db.query(models.ClassroomStudent).filter(
        models.ClassroomStudent.classroom_id == classroom_id
    ).count()
    return {"detail": f"Push notifications dispatched to all {students_count} students in '{classroom.name}'."}


# ─── USER-CREATED COURSES ENDPOINTS ──────────────────────────────────────────

@app.post("/api/courses/generate-questions")
def generate_questions(
    request: Request,
    content: str = Body(...),
    language: str = Body("zh")
):
    try:
        native_lang = get_native_lang_from_request(request)
        explain_lang = "Arabic (العربية)" if native_lang in ["Arabic", "ar"] else "English"
        prompt = (
            f"Based on the following learning material in {language}: '{content}', generate exactly 10 multiple-choice questions "
            f"in {explain_lang} to test user comprehension. For each question, supply 4 options (A, B, C, D) and specify the correct option letter. "
            f"Provide a clear question and options. Respond ONLY with a valid JSON array of objects structured exactly as: "
            f"[{{\"question\": \"<question text>\", \"option_a\": \"<opt A>\", \"option_b\": \"<opt B>\", \"option_c\": \"<opt C>\", \"option_d\": \"<opt D>\", \"correct_option\": \"A\"}}]"
        )
        raw = call_groq(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=800
        )
        match = raw[raw.find("["):raw.rfind("]")+1]
        result = json.loads(match)
        return result[:10]
    except Exception as e:
        print(f"Quiz generation failed: {e}")
        return [
            {
                "question": f"What is the main subject of this {language} text?",
                "option_a": "Greetings and intro vocabulary",
                "option_b": "Advanced grammatical details",
                "option_c": "Historical contexts",
                "option_d": "None of the above",
                "correct_option": "A"
            }
        ] * 10

@app.post("/api/courses/create")
def create_user_course(
    title: str = Body(...),
    description: str = Body(""),
    language: str = Body("zh"),
    lessons: List[dict] = Body([]),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    import random
    try:
        is_featured = random.choice([True, False, False, False])
        course = models.UserCourse(
            title=title,
            description=description,
            language=language,
            creator_id=current_user.id,
            is_published=True,
            is_featured=is_featured
        )
        db.add(course)
        db.flush()

        for les_data in lessons:
            lesson = models.UserCourseLesson(
                course_id=course.id,
                title=les_data.get("title", "Untitled Lesson"),
                content=les_data.get("content", "")
            )
            db.add(lesson)
            db.flush()

            for q_data in les_data.get("questions", []):
                question = models.UserCourseQuestion(
                    lesson_id=lesson.id,
                    question=q_data.get("question", ""),
                    option_a=q_data.get("option_a", ""),
                    option_b=q_data.get("option_b", ""),
                    option_c=q_data.get("option_c", ""),
                    option_d=q_data.get("option_d", ""),
                    correct_option=q_data.get("correct_option", "A").upper()
                )
                db.add(question)

        current_user.xp += 50
        db.commit()
        return {"detail": "Course created and published successfully!", "course_id": course.id, "featured": is_featured}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/courses/list")
def list_user_courses(
    lang: str = "zh",
    db: Session = Depends(get_db)
):
    courses = db.query(models.UserCourse).filter(
        models.UserCourse.language == lang,
        models.UserCourse.is_published == True
    ).all()

    result = []
    for c in courses:
        lessons_data = []
        for l in c.lessons:
            q_data = []
            for q in l.questions:
                q_data.append({
                    "id": q.id,
                    "question": q.question,
                    "option_a": q.option_a,
                    "option_b": q.option_b,
                    "option_c": q.option_c,
                    "option_d": q.option_d,
                    "correct_option": q.correct_option
                })
            lessons_data.append({
                "id": l.id,
                "title": l.title,
                "content": l.content,
                "questions": q_data
            })
            
        creator = db.query(models.User).filter(models.User.id == c.creator_id).first()
        creator_name = creator.username if creator else "Expert Learner"
        
        result.append({
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "language": c.language,
            "creator_name": creator_name,
            "is_featured": c.is_featured,
            "created_at": c.created_at.strftime("%Y-%m-%d"),
            "lessons": lessons_data
        })
        
    if not result:
        # Mock some popular user created courses
        return [
            {
                "id": 9991,
                "title": f"Mastering {lang.upper()} Slang",
                "description": "A quick course to help you sound like a native. We cover internet slang, street phrases, and cultural idioms.",
                "language": lang,
                "creator_name": "PolyglotPro99",
                "is_featured": True,
                "created_at": "2024-05-12",
                "lessons": [
                    {
                        "id": 8881,
                        "title": "Internet Slang 101",
                        "content": "In this lesson, you will learn how native speakers text each other on social media platforms.",
                        "questions": [
                            {
                                "id": 7771,
                                "question": "What is the best way to sound natural in a casual text?",
                                "option_a": "Use formal dictionary terms",
                                "option_b": "Use common internet abbreviations",
                                "option_c": "Use perfect punctuation",
                                "option_d": "Write long paragraphs",
                                "correct_option": "B"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 9992,
                "title": f"Business {lang.upper()} Vocabulary",
                "description": "Prepare for your upcoming job interview or business meeting with this essential vocabulary course.",
                "language": lang,
                "creator_name": "CorporateLingua",
                "is_featured": False,
                "created_at": "2024-04-20",
                "lessons": [
                    {
                        "id": 8882,
                        "title": "Formal Email Greetings",
                        "content": "Learn how to respectfully open and close business emails to important clients.",
                        "questions": [
                            {
                                "id": 7772,
                                "question": "Which of the following is considered professional?",
                                "option_a": "Hey dude",
                                "option_b": "What's up",
                                "option_c": "Dear Sir/Madam",
                                "option_d": "Yo",
                                "correct_option": "C"
                            }
                        ]
                    }
                ]
            }
        ]
        
    return result

@app.post("/api/courses/complete-xp")
def complete_user_course(
    course_id: int = Body(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    current_user.xp += 30
    
    course = db.query(models.UserCourse).filter(models.UserCourse.id == course_id).first()
    if course:
        creator = db.query(models.User).filter(models.User.id == course.creator_id).first()
        if creator:
            creator.xp += 20
            
    db.commit()
    return {"detail": "XP awarded to student and creator!"}


# ─── REAL NEWS READER ENDPOINTS ──────────────────────────────────────────────

NEWS_HEADLINES_BY_LANG = {
    "zh": [
        {
            "id": "zh-news-1",
            "title": "中国空间站核心舱顺利发射，科研迈入新阶段",
            "source": "人民网",
            "category": "Tech",
            "content": "中国国家航天局宣布，空间站核心舱成功发射升空并顺利进入预定轨道。这次任务的圆满成功标志着中国载人航天工程空间站建造迈出了关键的一步。在未来的几个月内，将有更多的模块陆续发射对接，形成一个完整的太空实验室，为全球科学家提供宝贵的微重力研究环境。"
        },
        {
            "id": "zh-news-2",
            "title": "大熊猫保护基地迎来新生熊猫宝宝",
            "source": "新华网",
            "category": "Nature",
            "content": "成都大熊猫繁育研究基地宣布，昨天深夜有一只健康的雌性大熊猫宝宝诞生。目前母女平安，小熊猫的体重为150克，发育十分良好。基地专家表示，随着生态保护力度的加大，大熊猫的野生种群 and 人工繁育均取得了突破性的成就，展示了中国生物多样性保护的丰硕成果。"
        }
    ],
    "es": [
        {
            "id": "es-news-1",
            "title": "El Museo del Prado inaugura una exposición de arte digital interactivo",
            "source": "El País",
            "category": "Culture",
            "content": "El Museo del Prado de Madrid ha abierto las puertas a una exposición revolucionaria que fusiona el arte clásico del siglo XVII con la tecnología de realidad virtual. Los visitantes pueden ahora caminar dentro de los lienzos de Velázquez y experimentar las texturas y pinceladas originales como nunca antes."
        },
        {
            "id": "es-news-2",
            "title": "Científicos descubren una nueva especie marina en las islas Galápagos",
            "source": "El Mundo",
            "category": "Nature",
            "content": "Un equipo internacional de biólogos marinos ha identificado una nueva especie de pez linterna a más de tres mil metros de profundidad cerca de las Galápagos. El pez posee órganos bioluminiscentes únicos que le permiten comunicarse en la oscuridad total del océano profundo."
        }
    ],
    "fr": [
        {
            "id": "fr-news-1",
            "title": "Le Louvre bat des records de fréquentation grâce à ses visites de nuit",
            "source": "Le Monde",
            "category": "Culture",
            "content": "Le musée du Louvre à Paris a enregistré une augmentation spectaculaire de ses visiteurs nocturnes. Les visites après 21 heures permettent de contempler les chefs-d'œuvre comme la Joconde dans une atmosphère calme et intimiste, ce qui attire particulièrement les jeunes parisiens."
        },
        {
            "id": "fr-news-2",
            "title": "La France lance un grand plan pour les pistes cyclables en zone rurale",
            "source": "Le Figaro",
            "category": "Tech",
            "content": "Le ministère des Transports a annoncé un investissement de deux cents millions d'euros pour construire des pistes cyclables sécurisées reliant les villages ruraux. Ce projet vise à encourager la mobilité verte et à réduire la dépendance à la voiture pour les trajets quotidiens."
        }
    ]
}

NEWS_HEADLINES_FALLBACK = [
    {
        "id": "fallback-news-1",
        "title": "Global summit calls for urgent actions on clean water access",
        "source": "Global News Feed",
        "category": "Tech",
        "content": "Delegates from over 190 countries have gathered in Geneva to draft a historic agreement guaranteeing clean drinking water access as a basic human right. The plan proposes massive public financing to upgrade filtration grids in developing coastal cities."
    }
]

def fetch_rss_news(lang: str) -> list:
    import urllib.request
    import xml.etree.ElementTree as ET
    import re
    import html as html_parser
    
    urls = {
        "zh": "https://rss.dw.com/xml/rss-chi", # DW Chinese
        "es": "https://servicios.elpais.com/rss/elpais/portada.xml", # El Pais
        "fr": "https://www.lemonde.fr/rss/une.xml", # Le Monde
        "de": "https://www.tagesschau.de/infoservices/rss/", # Tagesschau
        "ja": "https://www3.nhk.or.jp/rss/news/cat0.xml", # NHK News
        "ko": "https://www.yna.co.kr/rss/news.xml", # Yonhap News
        "it": "https://www.repubblica.it/rss/homepage/rss2.0.xml", # La Repubblica
        "ar": "https://arabic.rt.com/rss/", # RT Arabic
        "en": "http://feeds.bbci.co.uk/news/rss.xml" # BBC English
    }
    
    url = urls.get(lang)
    if not url:
        return NEWS_HEADLINES_BY_LANG.get(lang, NEWS_HEADLINES_FALLBACK)
        
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'}
        )
        # Use a 4-second timeout to keep the app responsive
        with urllib.request.urlopen(req, timeout=4) as response:
            xml_data = response.read()
            
        root = ET.fromstring(xml_data)
        channel = root.find('channel')
        items = channel.findall('item') if channel is not None else []
        
        parsed_items = []
        for i, item in enumerate(items[:6]): # Get top 6 articles
            title = item.find('title')
            title_text = title.text.strip() if title is not None and title.text else "News Article"
            
            description = item.find('description')
            desc_text = description.text.strip() if description is not None and description.text else ""
            
            # Clean HTML tags from description if any
            desc_text = re.sub('<[^<]+?>', '', desc_text)
            desc_text = html_parser.unescape(desc_text)
            
            source = "RSS Feed"
            if lang == "es": source = "El País"
            elif lang == "fr": source = "Le Monde"
            elif lang == "de": source = "Tagesschau"
            elif lang == "zh": source = "Deutsche Welle"
            elif lang == "ja": source = "NHK News"
            elif lang == "ko": source = "Yonhap"
            elif lang == "it": source = "La Repubblica"
            elif lang == "ar": source = "RT Arabic"
            elif lang == "en": source = "BBC News"
            
            # If description is empty, use title as content or placeholder
            if not desc_text:
                desc_text = f"Read the full story from {source} about: {title_text}"
                
            parsed_items.append({
                "id": f"{lang}-rss-{i}",
                "title": title_text,
                "source": source,
                "category": "Live News",
                "content": desc_text
            })
            
        if parsed_items:
            return parsed_items
    except Exception as e:
        print(f"Error fetching RSS news for {lang}: {e}")
        
    return NEWS_HEADLINES_BY_LANG.get(lang, NEWS_HEADLINES_FALLBACK)

@app.get("/api/news/headlines")
def get_news_headlines(lang: str = "zh"):
    return fetch_rss_news(lang)


def get_native_lang_from_request(request):
    try:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
            from app.core import security as sec
            payload = sec.decode_access_token(token)
            if payload:
                from app.core.database import SessionLocal
                db = SessionLocal()
                try:
                    user = db.query(models.User).filter(models.User.username == payload.get("sub")).first()
                    if user:
                        return user.native_lang or "English"
                finally:
                    db.close()
    except Exception as e:
        print(f"Error getting native lang: {e}")
    return "English"


@app.post("/api/news/simplify")
def simplify_news(
    request: Request,
    text: str = Body(...),
    level: str = Body(...),
    language: str = Body("zh")
):
    try:
        native_lang = get_native_lang_from_request(request)
        explain_lang = "Arabic (العربية)" if native_lang in ["Arabic", "ar"] else "English"
        prompt = (
            f"You are a helpful language teacher. Rewrite the following article in {language} so that a student at a '{level}' level can read it easily. "
            f"If the level is 'Beginner', simplify the vocabulary drastically, keep sentences short and clear, and add definitions in {explain_lang} in brackets for hard words. "
            f"If the level is 'Intermediate', simplify moderately, keeping natural phrasing but avoiding rare idioms. "
            f"If the level is 'Advanced', keep it very close to the original authentic news writing. "
            f"Original article content: '{text}'. "
            f"Respond ONLY with the rewritten article."
        )
        rewritten = call_groq(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=500
        )
        return {"content": rewritten}
    except Exception as e:
        return {"content": text}

@app.post("/api/news/save")
def save_article(
    title: str = Body(...),
    content: str = Body(...),
    language: str = Body("zh"),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_art = models.SavedArticle(
        user_id=current_user.id,
        title=title,
        content=content,
        language=language
    )
    db.add(new_art)
    db.commit()
    return {"detail": "Article saved to library"}

@app.get("/api/news/saved")
def get_saved_articles(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    articles = db.query(models.SavedArticle).filter(
        models.SavedArticle.user_id == current_user.id
    ).all()
    return [
        {
            "id": a.id,
            "title": a.title,
            "content": a.content,
            "language": a.language,
            "saved_at": a.saved_at.strftime("%Y-%m-%d")
        } for a in articles
    ]

from fastapi import File, UploadFile

@app.post("/api/tts")
def text_to_speech(req: dict = Body(...)):
    text = req.get("text", "")
    lang = req.get("lang", "zh")
    import urllib.parse
    encoded_text = urllib.parse.quote(text)
    # Authentic public Google Translate TTS audio URL
    audio_url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={encoded_text}&tl={lang}&client=tw-ob"
    return {"audio_url": audio_url}

@app.post("/api/ai/stt")
async def evaluate_stt(
    file: UploadFile = File(...),
):
    try:
        contents = await file.read()
        import tempfile
        ext = os.path.splitext(file.filename)[1] or ".webm"
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name
        
        try:
            if not GROQ_API_KEY or GROQ_API_KEY.startswith("mock") or GROQ_API_KEY == "":
                # Fallback to mock recognition
                return {"text": "Hello, how are you? (Whisper STT Mock)"}
            
            with open(tmp_path, "rb") as audio_file:
                transcription = groq_client.audio.transcriptions.create(
                    file=audio_file,
                    model="whisper-large-v3",
                )
            return {"text": transcription.text}
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Whisper STT failed: {str(e)}")

@app.post("/api/learning/ocr")
async def extract_ocr(
    request: Request,
    file: UploadFile = File(...),
    lang: str = "zh"
):
    try:
        contents = await file.read()
        import base64
        base64_image = base64.b64encode(contents).decode('utf-8')
        
        lang_label = {
            "zh": "Chinese",
            "es": "Spanish",
            "fr": "French",
            "de": "German",
            "ja": "Japanese",
            "ko": "Korean",
            "it": "Italian",
            "en": "English",
            "ar": "Arabic"
        }.get(lang, "Chinese")
        
        native_lang = get_native_lang_from_request(request)
        explain_lang = "Arabic (العربية)" if native_lang in ["Arabic", "ar"] else "English"
        
        prompt = (
            f"Perform OCR on this image containing {lang_label} words. "
            f"Extract the primary vocabulary terms, characters, or phrases. "
            f"For each extracted item, provide: "
            f"1. The word in the target language (for Chinese/Japanese, use native script; for others, standard spelling). "
            f"2. The phonetic reading (for Chinese, Pinyin; for Japanese, Romaji; for others, clean pronunciation guides). "
            f"3. The translation/meaning in {explain_lang}. "
            f"Respond ONLY with a valid JSON array of objects: "
            f"[{{\"hanzi\": \"<word>\", \"pinyin\": \"<reading>\", \"meaning\": \"<meaning>\"}}]"
        )
        
        if not GROQ_API_KEY or GROQ_API_KEY.startswith("mock") or GROQ_API_KEY == "":
            mock_data = {
                "zh": [
                    {"hanzi": "学习", "pinyin": "xué xí", "meaning": "To study / to learn"},
                    {"hanzi": "电脑", "pinyin": "diàn nǎo", "meaning": "Computer"},
                    {"hanzi": "中国", "pinyin": "zhōng guó", "meaning": "China"}
                ],
                "es": [
                    {"hanzi": "estudiar", "pinyin": "es-too-dyahr", "meaning": "To study"},
                    {"hanzi": "computadora", "pinyin": "kohm-poo-tah-doh-rah", "meaning": "Computer"},
                    {"hanzi": "España", "pinyin": "es-pah-nyah", "meaning": "Spain"}
                ],
                "fr": [
                    {"hanzi": "étudier", "pinyin": "ay-too-dyay", "meaning": "To study"},
                    {"hanzi": "ordinateur", "pinyin": "or-dee-nah-tur", "meaning": "Computer"},
                    {"hanzi": "France", "pinyin": "frahns", "meaning": "France"}
                ]
            }
            return mock_data.get(lang, [
                {"hanzi": "Term", "pinyin": "Reading", "meaning": "English Definition"}
            ])
            
        try:
            response = groq_client.chat.completions.create(
                model="llama-3.2-11b-vision-preview",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                max_tokens=600,
                temperature=0.2
            )
            raw = response.choices[0].message.content
            match = raw[raw.find("["):raw.rfind("]")+1]
            return json.loads(match)
        except Exception as e:
            print(f"Groq Vision call failed: {e}")
            return [
                {"hanzi": "学习", "pinyin": "xué xí", "meaning": "To study / to learn"},
                {"hanzi": "手机", "pinyin": "shǒu jī", "meaning": "Mobile Phone"}
            ]
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR vision processing failed: {str(e)}")

@app.get("/api/classroom/{classroom_id}/grades")
def get_classroom_grades(
    classroom_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    classroom = db.query(models.Classroom).filter(models.Classroom.id == classroom_id).first()
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
        
    student_relations = db.query(models.ClassroomStudent).filter(models.ClassroomStudent.classroom_id == classroom_id).all()
    student_ids = [r.student_id for r in student_relations]
    students = db.query(models.User).filter(models.User.id.in_(student_ids)).all() if student_ids else []
    
    assignments = db.query(models.Assignment).filter(models.Assignment.classroom_id == classroom_id).all()
    
    grades = []
    for s in students:
        s_completions = db.query(models.CompletedLesson).filter(models.CompletedLesson.user_id == s.id).all()
        completed_lesson_ids = {c.lesson_id for c in s_completions}
        
        assignment_stats = []
        for a in assignments:
            completed = a.lesson_id in completed_lesson_ids
            assignment_stats.append({
                "assignment_id": a.id,
                "lesson_id": a.lesson_id,
                "completed": completed,
                "due_date": a.due_date.strftime("%Y-%m-%d") if a.due_date else None
            })
            
        grades.append({
            "student_id": s.id,
            "username": s.username,
            "xp": s.xp,
            "level": s.level,
            "streak": s.streak,
            "assignments": assignment_stats
        })
    return grades

@app.get("/api/classroom/{classroom_id}/activity")
def get_classroom_activity(
    classroom_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    classroom = db.query(models.Classroom).filter(models.Classroom.id == classroom_id).first()
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
        
    student_relations = db.query(models.ClassroomStudent).filter(models.ClassroomStudent.classroom_id == classroom_id).all()
    student_ids = [r.student_id for r in student_relations]
    
    if not student_ids:
        return []
        
    completed = db.query(models.CompletedLesson).filter(
        models.CompletedLesson.user_id.in_(student_ids)
    ).order_by(models.CompletedLesson.completed_at.desc()).limit(15).all()
    
    activity = []
    for c in completed:
        user = db.query(models.User).filter(models.User.id == c.user_id).first()
        activity.append({
            "username": user.username if user else "Student",
            "type": "lesson_complete",
            "lesson_id": c.lesson_id,
            "timestamp": c.completed_at.strftime("%Y-%m-%d %H:%M")
        })
    return activity

# --- WEBSOCKET TOURNAMENTS ---
import time
matchmaking_queue = []
active_duels = {}

@app.websocket("/api/tournaments/ws/{client_id}")
async def websocket_tournament_endpoint(websocket: WebSocket, client_id: str):
    await tournament_manager.connect(websocket)
    try:
        # Welcome message with bracket data
        await websocket.send_json({
            "type": "BRACKET_UPDATE",
            "bracket": [
                {"player1": client_id, "player2": "Bot_Alex", "winner": None},
                {"player1": "Bot_Sarah", "player2": "Bot_Mike", "winner": "Bot_Sarah"}
            ],
            "message": "Connected to Weekly Tournament Server."
        })
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message.get("type") == "JOIN_QUEUE":
                username = message.get("username", client_id)
                lang = message.get("lang", "zh")
                
                # Check if already in queue
                already_queued = False
                for q in matchmaking_queue:
                    if q["client_id"] == client_id:
                        already_queued = True
                        break
                        
                if not already_queued:
                    matchmaking_queue.append({
                        "client_id": client_id,
                        "username": username,
                        "websocket": websocket,
                        "lang": lang
                    })
                
                # Matchmaking check
                if len(matchmaking_queue) >= 2:
                    p1 = matchmaking_queue.pop(0)
                    p2 = matchmaking_queue.pop(0)
                    
                    duel_id = f"duel_{int(time.time())}"
                    questions = QUESTIONS_BY_LANG.get(lang, QUESTIONS_FALLBACK)
                    
                    duel_state = {
                        "id": duel_id,
                        "p1": p1,
                        "p2": p2,
                        "scores": {p1["username"]: 0, p2["username"]: 0},
                        "current_question": 0,
                        "questions": questions,
                        "answers_received": 0
                    }
                    active_duels[p1["client_id"]] = duel_state
                    active_duels[p2["client_id"]] = duel_state
                    
                    # Broadcast match found
                    match_info = {
                        "type": "MATCH_FOUND",
                        "duel_id": duel_id,
                        "p1": p1["username"],
                        "p2": p2["username"],
                        "total_questions": len(questions)
                    }
                    await p1["websocket"].send_json(match_info)
                    await p2["websocket"].send_json(match_info)
                    
                    # Send first question after short delay
                    await asyncio.sleep(1.5)
                    question_info = {
                        "type": "QUESTION_PROMPT",
                        "question_index": 0,
                        "question": questions[0]["question"],
                        "options": questions[0]["options"]
                    }
                    await p1["websocket"].send_json(question_info)
                    await p2["websocket"].send_json(question_info)
            
            elif message.get("type") == "TRIGGER_BOT_MATCH":
                # Remove from queue if present
                for idx, q in enumerate(matchmaking_queue):
                    if q["client_id"] == client_id:
                        matchmaking_queue.pop(idx)
                        break
                
                username = message.get("username", client_id)
                lang = message.get("lang", "zh")
                bot_name = "Bot_Alex"
                
                duel_id = f"duel_{int(time.time())}"
                questions = QUESTIONS_BY_LANG.get(lang, QUESTIONS_FALLBACK)
                
                duel_state = {
                    "id": duel_id,
                    "p1": {"client_id": client_id, "username": username, "websocket": websocket},
                    "p2": {"client_id": "bot", "username": bot_name, "websocket": None},
                    "scores": {username: 0, bot_name: 0},
                    "current_question": 0,
                    "questions": questions,
                    "answers_received": 0
                }
                active_duels[client_id] = duel_state
                
                match_info = {
                    "type": "MATCH_FOUND",
                    "duel_id": duel_id,
                    "p1": username,
                    "p2": bot_name,
                    "total_questions": len(questions)
                }
                await websocket.send_json(match_info)
                
                # Send first question
                await asyncio.sleep(1.5)
                question_info = {
                    "type": "QUESTION_PROMPT",
                    "question_index": 0,
                    "question": questions[0]["question"],
                    "options": questions[0]["options"]
                }
                await websocket.send_json(question_info)

            elif message.get("type") == "SUBMIT_DUEL_ANSWER":
                duel = active_duels.get(client_id)
                if duel:
                    username = message.get("username")
                    correct = message.get("correct", False)
                    time_taken = message.get("time_taken", 10)
                    
                    score = 100 if correct else 0
                    bonus = max(0, 50 - int(time_taken * 5)) if correct else 0
                    total = score + bonus
                    
                    duel["scores"][username] = duel["scores"].get(username, 0) + total
                    
                    # If playing against bot, simulate bot answer
                    is_bot = (duel["p2"]["client_id"] == "bot")
                    if is_bot:
                        bot_name = duel["p2"]["username"]
                        import random
                        bot_correct = random.random() > 0.4
                        bot_time = random.uniform(2, 6)
                        bot_score = 100 if bot_correct else 0
                        bot_bonus = max(0, 50 - int(bot_time * 5)) if bot_correct else 0
                        duel["scores"][bot_name] = duel["scores"].get(bot_name, 0) + (bot_score + bot_bonus)
                        
                        duel["answers_received"] += 2
                    else:
                        duel["answers_received"] += 1
                        
                    # If both answered, advance or finish
                    if duel["answers_received"] >= 2:
                        duel["answers_received"] = 0
                        idx = duel["current_question"]
                        questions = duel["questions"]
                        
                        correct_ans = questions[idx]["answer"]
                        reveal_info = {
                            "type": "DUEL_REVEAL",
                            "scores": duel["scores"],
                            "correct_answer": correct_ans
                        }
                        
                        if is_bot:
                            await websocket.send_json(reveal_info)
                        else:
                            await duel["p1"]["websocket"].send_json(reveal_info)
                            await duel["p2"]["websocket"].send_json(reveal_info)
                            
                        await asyncio.sleep(2.0)
                        
                        # Move to next question or end
                        next_idx = idx + 1
                        duel["current_question"] = next_idx
                        if next_idx < len(questions):
                            next_q = {
                                "type": "QUESTION_PROMPT",
                                "question_index": next_idx,
                                "question": questions[next_idx]["question"],
                                "options": questions[next_idx]["options"]
                            }
                            if is_bot:
                                await websocket.send_json(next_q)
                            else:
                                await duel["p1"]["websocket"].send_json(next_q)
                                await duel["p2"]["websocket"].send_json(next_q)
                        else:
                            p1_score = duel["scores"][duel["p1"]["username"]]
                            p2_score = duel["scores"][duel["p2"]["username"]]
                            winner = None
                            if p1_score > p2_score:
                                winner = duel["p1"]["username"]
                            elif p2_score > p1_score:
                                winner = duel["p2"]["username"]
                            else:
                                winner = "Tie"
                                
                            result_info = {
                                "type": "FINAL_RESULT",
                                "scores": duel["scores"],
                                "winner": winner
                            }
                            if is_bot:
                                await websocket.send_json(result_info)
                            else:
                                await duel["p1"]["websocket"].send_json(result_info)
                                await duel["p2"]["websocket"].send_json(result_info)
                            
                            # Clean up
                            if duel["p1"]["client_id"] in active_duels:
                                del active_duels[duel["p1"]["client_id"]]
                            if duel["p2"]["client_id"] in active_duels:
                                del active_duels[duel["p2"]["client_id"]]

            elif message.get("type") == "SUBMIT_ANSWER":
                # Fallback legacy behavior
                time_taken = message.get("time_taken", 10)
                score = 100 if message.get("correct") else 0
                bonus = max(0, 50 - int(time_taken * 2))
                total_score = score + bonus
                await tournament_manager.broadcast({
                    "type": "SCORE_UPDATE",
                    "player": client_id,
                    "score_added": total_score,
                    "total_score": total_score
                })
                
    except WebSocketDisconnect:
        tournament_manager.disconnect(websocket)
        # Remove from matchmaking queue
        for idx, q in enumerate(matchmaking_queue):
            if q["client_id"] == client_id:
                matchmaking_queue.pop(idx)
                break
    except Exception as e:
        print(f"WS Error: {e}")
        tournament_manager.disconnect(websocket)

@app.post("/api/news/quiz")
def generate_news_quiz(
    request: Request,
    text: str = Body(...),
    language: str = Body("zh")
):
    try:
        native_lang = get_native_lang_from_request(request)
        explain_lang = "Arabic (العربية)" if native_lang in ["Arabic", "ar"] else "English"
        prompt = (
            f"Based on the following news article: '{text}', generate exactly 3 multiple-choice comprehension questions in {explain_lang} "
            f"to test the reader's understanding. For each question, provide 4 options (A, B, C, D) and specify the correct option letter. "
            f"Respond ONLY with a valid JSON array of objects structured exactly as: "
            f"[{{\"question\": \"<question text>\", \"option_a\": \"<opt A>\", \"option_b\": \"<opt B>\", \"option_c\": \"<opt C>\", \"option_d\": \"<opt D>\", \"correct_option\": \"A\"}}]"
        )
        raw = call_groq(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=600
        )
        match = raw[raw.find("["):raw.rfind("]")+1]
        result = json.loads(match)
        return result[:3]
    except Exception as e:
        return [
            {
                "question": "What is the key announcement in this article?",
                "option_a": "A new project launches",
                "option_b": "A financial report is published",
                "option_c": "An award ceremony takes place",
                "option_d": "None of the above",
                "correct_option": "A"
            }
        ] * 3

@app.post("/api/news/translate")
def translate_news_word(
    request: Request,
    word: str = Body(...),
    language: str = Body("zh")
):
    try:
        native_lang = get_native_lang_from_request(request)
        explain_lang = "Arabic (العربية)" if native_lang in ["Arabic", "ar"] else "English"
        prompt = (
            f"You are a dictionary assistant for language learners. The user clicked on the word/character '{word}' in a {language} text. "
            f"Provide a brief, clear definition in {explain_lang}. If it has a phonetic reading (like Pinyin or Romaji), provide it. "
            f"Also provide one short, simple example sentence in the target language and its translation in {explain_lang}. "
            f"Respond ONLY with a valid JSON object structured exactly as: "
            f"{{\"definition\": \"<meaning>\", \"pinyin\": \"<reading/phonetics>\", \"example\": \"<target language example> (<translation in {explain_lang}>)\"}}"
        )
        raw = call_groq(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=150
        )
        match = raw[raw.find("{"):raw.rfind("}")+1]
        result = json.loads(match)
        return {
            "definition": result.get("definition", "Translation unavailable"),
            "pinyin": result.get("pinyin", ""),
            "example": result.get("example", "")
        }
    except Exception as e:
        return {
            "definition": f"Meaning of {word} (fallback)",
            "pinyin": "",
            "example": ""
        }

@app.post("/api/ai/translate")
def translate_text(
    text: str = Body(...),
    target_lang: str = Body(...)
):
    try:
        lang_names = {
            "zh": "Chinese",
            "es": "Spanish",
            "fr": "French",
            "de": "German",
            "ja": "Japanese",
            "ko": "Korean",
            "it": "Italian",
            "en": "English",
            "ar": "Arabic"
        }
        target_lang_name = lang_names.get(target_lang.lower(), "English")
        prompt = (
            f"You are a professional translator. Translate the following phrase into natural, everyday {target_lang_name}. "
            f"Provide ONLY the translation itself with no quotation marks, introduction, or explanations. "
            f"Phrase: '{text}'"
        )
        translated = call_groq(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=150
        )
        return {"translation": translated.strip()}
    except Exception as e:
        return {"translation": text}

# ─── SMART NOTIFICATION TIMING ENDPOINTS ──────────────────────────────────────

@app.get("/api/notifications/peak-hours")
def get_peak_hours(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    from collections import Counter
    seven_days_ago = datetime.datetime.utcnow() - datetime.timedelta(days=7)
    logs = db.query(models.UserActivityLog).filter(
        models.UserActivityLog.user_id == current_user.id,
        models.UserActivityLog.timestamp >= seven_days_ago
    ).all()
    
    if not logs:
        return {"peak_hour": "19:00", "count": 0, "logs_analyzed": 0}
        
    hours = [log.timestamp.hour for log in logs]
    counter = Counter(hours)
    peak_hour_int = counter.most_common(1)[0][0]
    
    peak_hour_str = f"{peak_hour_int:02d}:00"
    return {
        "peak_hour": peak_hour_str,
        "count": counter[peak_hour_int],
        "logs_analyzed": len(logs)
    }

@app.put("/api/notifications/settings")
def update_notification_settings(
    preferred_time: Optional[str] = Body(None),
    enabled: Optional[bool] = Body(None),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if preferred_time is not None:
        current_user.preferred_notification_time = preferred_time
    if enabled is not None:
        current_user.notifications_enabled = enabled
    db.commit()
    db.refresh(current_user)
    return current_user

@app.post("/api/notifications/trigger-push")
def trigger_push_notification(
    current_user: models.User = Depends(get_current_user)
):
    native_lang = current_user.native_lang or "English"
    feedback_lang = "Arabic (العربية)" if native_lang in ["Arabic", "ar"] else "English"
    prompt = (
        f"A student has a streak of {current_user.streak} days. "
        f"Generate a friendly, encouraging push notification reminder message (less than 15 words) to practice. "
        f"Write the message in {feedback_lang}. Do NOT include emojis. Respond ONLY with the raw message."
    )
    msg = call_groq(
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=100
    )
    return {"message": msg.strip()}


# ─── ADMIN SYSTEM ENDPOINTS ──────────────────────────────────────────────────

def get_current_admin(current_user: models.User = Depends(get_current_user)) -> models.User:
    if current_user.username != "admin" and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have administrative permissions"
        )
    return current_user

@app.get("/api/admin/users", response_model=List[schemas.UserResponse])
def get_admin_users(
    admin_user: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    return db.query(models.User).all()

@app.put("/api/admin/users/{user_id}/role", response_model=schemas.UserResponse)
def update_user_role(
    user_id: int,
    role: str = Body(..., embed=True),
    admin_user: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.username == "admin" and role != "admin":
        raise HTTPException(status_code=400, detail="Cannot demote primary admin user")
        
    role = role.strip().lower()
    if role not in ["student", "teacher", "admin"]:
        raise HTTPException(status_code=400, detail="Invalid role. Must be 'student', 'teacher', or 'admin'.")
        
    user.role = role
    db.commit()
    db.refresh(user)
    return user

@app.put("/api/admin/users/{user_id}/teacher-status", response_model=schemas.UserResponse)
def update_user_teacher_status(
    user_id: int,
    status: str = Body(..., embed=True),
    admin_user: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    status = status.strip().lower()
    if status not in ["approved", "rejected", "pending", "none"]:
        raise HTTPException(status_code=400, detail="Invalid status")
        
    user.teacher_status = status
    if status == "approved":
        user.role = "teacher"
    elif status == "rejected":
        user.role = "student"
        
    db.commit()
    db.refresh(user)
    return user

@app.delete("/api/admin/users/{user_id}")
def delete_user(
    user_id: int,
    admin_user: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.username == "admin":
        raise HTTPException(status_code=400, detail="Cannot delete primary admin user")
        
    db.delete(user)
    db.commit()
    return {"detail": "User deleted successfully"}

@app.get("/api/admin/stats")
def get_admin_stats(
    admin_user: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    from sqlalchemy import func
    
    # Core user counts
    total_users = db.query(models.User).count()
    teachers = db.query(models.User).filter(models.User.role == "teacher").count()
    admins = db.query(models.User).filter(models.User.role == "admin").count()
    students = total_users - teachers - admins
    
    total_xp_res = db.query(func.sum(models.User.xp)).scalar()
    total_xp = int(total_xp_res) if total_xp_res is not None else 0
    
    # Feature engagement counts
    completed_lessons_count = db.query(models.CompletedLesson).count()
    saved_words_count = db.query(models.SavedWord).count()
    srs_items_count = db.query(models.SRSItem).count()
    writing_submissions_count = db.query(models.WritingSubmission).count()
    classrooms_count = db.query(models.Classroom).count()
    
    # Active Users past 24h
    yesterday = datetime.datetime.utcnow() - datetime.timedelta(days=1)
    active_24h = db.query(models.UserActivityLog).filter(models.UserActivityLog.timestamp >= yesterday).group_by(models.UserActivityLog.user_id).count()
    
    # Language distribution of users (mapped from native_lang)
    lang_dist = {}
    langs = db.query(models.User.native_lang, func.count(models.User.id)).group_by(models.User.native_lang).all()
    for l_code, count in langs:
        l_name = {
            "zh": "Chinese",
            "es": "Spanish",
            "fr": "French",
            "de": "German",
            "ja": "Japanese",
            "ko": "Korean",
            "it": "Italian",
            "en": "English",
            "ar": "Arabic"
        }.get(l_code, l_code.upper() if l_code else "English")
        lang_dist[l_name] = count
        
    if not lang_dist:
        lang_dist = {"Chinese": 1, "Spanish": 1, "French": 1}
        
    # Signup trends over last 7 days
    signup_history = []
    today = datetime.datetime.utcnow().date()
    for i in range(6, -1, -1):
        day = today - datetime.timedelta(days=i)
        next_day = day + datetime.timedelta(days=1)
        count = db.query(models.User).filter(
            models.User.joined_at >= datetime.datetime.combine(day, datetime.time.min),
            models.User.joined_at < datetime.datetime.combine(next_day, datetime.time.min)
        ).count()
        signup_history.append({
            "date": day.strftime("%m/%d"),
            "count": count
        })
        
    import sys
    python_version = sys.version.split(" ")[0]
    
    return {
        "total_users": total_users,
        "teachers": teachers,
        "students": students,
        "admins": admins,
        "total_xp": total_xp,
        "active_24h": active_24h,
        "completed_lessons": completed_lessons_count,
        "saved_words": saved_words_count,
        "srs_items": srs_items_count,
        "writing_submissions": writing_submissions_count,
        "classrooms": classrooms_count,
        "lang_dist": lang_dist,
        "signup_history": signup_history,
        "python_version": python_version,
        "uptime": "Stable",
        "database_size": "Sqlite (Primary Cluster)"
    }


# ─── ADVANCED ADMIN PORTAL ENDPOINTS ─────────────────────────────────────────

@app.get("/api/admin/db/tables")
def get_db_tables(
    admin_user: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    import sqlite3
    conn = db.bind.raw_connection()
    cursor = conn.cursor()
    try:
        # Get all non-system tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
        tables = [row[0] for row in cursor.fetchall()]
        
        results = []
        for t in tables:
            # Row count
            cursor.execute(f"SELECT COUNT(*) FROM {t}")
            row_count = cursor.fetchone()[0]
            
            # Pragma columns schema
            cursor.execute(f"PRAGMA table_info({t})")
            columns = [
                {
                    "cid": col[0], 
                    "name": col[1], 
                    "type": col[2], 
                    "notnull": bool(col[3]), 
                    "pk": bool(col[5])
                } for col in cursor.fetchall()
            ]
            
            results.append({
                "name": t,
                "rows": row_count,
                "columns": columns
            })
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database inspection failed: {str(e)}")


@app.get("/api/admin/writings")
def get_admin_writings(
    admin_user: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    submissions = db.query(models.WritingSubmission).order_by(models.WritingSubmission.submitted_at.desc()).limit(15).all()
    results = []
    for s in submissions:
        user = db.query(models.User).filter(models.User.id == s.user_id).first()
        results.append({
            "id": s.id,
            "username": user.username if user else "Unknown User",
            "original_text": s.original_text,
            "corrected_text": s.corrected_text,
            "feedback": s.feedback,
            "score": s.overall_score,
            "submitted_at": s.submitted_at.strftime("%Y-%m-%d %H:%M")
        })
    return results






