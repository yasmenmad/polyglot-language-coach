from pydantic import BaseModel
from typing import Optional, List
import datetime


# ─── Auth ────────────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    username: str
    password: str
    email: Optional[str] = None
    role: Optional[str] = "student"


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: Optional[str] = None
    xp: int
    level: int
    streak: int
    shields: int
    avatar: Optional[str] = None
    native_lang: Optional[str] = None
    learning_goal: Optional[str] = None
    energy_mood: Optional[str] = None
    role: Optional[str] = "student"
    teacher_status: Optional[str] = "none"
    teacher_bio: Optional[str] = None
    teacher_credentials: Optional[str] = None
    preferred_notification_time: Optional[str] = None
    notifications_enabled: bool = True
    joined_at: Optional[datetime.datetime] = None

    model_config = {"from_attributes": True}


# ─── Learning ─────────────────────────────────────────────────────────────────

class LessonComplete(BaseModel):
    lesson_id: int
    xp_gained: int = 10


class SavedWordCreate(BaseModel):
    hanzi: str
    pinyin: str
    meaning: str


class SavedWordResponse(BaseModel):
    id: int
    hanzi: str
    pinyin: str
    meaning: str
    saved_at: Optional[datetime.datetime] = None

    model_config = {"from_attributes": True}


# ─── SRS ──────────────────────────────────────────────────────────────────────

class SRSReview(BaseModel):
    hanzi: str
    pinyin: str
    meaning: str
    quality: int  # 1=Hard, 2=Good, 3=Easy


class SRSResponse(BaseModel):
    id: int
    hanzi: str
    pinyin: str
    meaning: str
    ease_factor: float
    interval_days: int
    repetitions: int
    next_review_at: Optional[datetime.datetime] = None
    last_reviewed_at: Optional[datetime.datetime] = None

    model_config = {"from_attributes": True}


# ─── Writing Coach ────────────────────────────────────────────────────────────

class WritingCreate(BaseModel):
    original_text: str
    language: Optional[str] = None


class WritingResponse(BaseModel):
    id: int
    original_text: str
    corrected_text: Optional[str] = None
    feedback: Optional[str] = None
    grammar_score: int
    vocabulary_score: int
    fluency_score: int
    overall_score: int
    submitted_at: Optional[datetime.datetime] = None

    model_config = {"from_attributes": True}
