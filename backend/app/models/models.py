import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    
    # Core stats
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    streak = Column(Integer, default=0)
    last_study_date = Column(DateTime, nullable=True)
    shields = Column(Integer, default=0)
    
    # Custom Profile / Configs
    avatar = Column(String, default="star")
    native_lang = Column(String, default="en")
    learning_goal = Column(String, default="general")
    energy_mood = Column(String, default="focused")
    role = Column(String, default="student") # "student" or "teacher"
    teacher_status = Column(String, default="none") # "none", "pending", "approved", "rejected"
    teacher_bio = Column(String, nullable=True)
    teacher_credentials = Column(String, nullable=True)
    preferred_notification_time = Column(String, nullable=True) # e.g. "19:00"
    notifications_enabled = Column(Boolean, default=True)
    joined_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    saved_words = relationship("SavedWord", back_populates="user", cascade="all, delete-orphan")
    srs_items = relationship("SRSItem", back_populates="user", cascade="all, delete-orphan")
    completed_lessons = relationship("CompletedLesson", back_populates="user", cascade="all, delete-orphan")
    achievements = relationship("UserAchievement", back_populates="user", cascade="all, delete-orphan")
    writings = relationship("WritingSubmission", back_populates="user", cascade="all, delete-orphan")


class SavedWord(Base):
    __tablename__ = "saved_words"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    hanzi = Column(String, nullable=False)
    pinyin = Column(String, nullable=False)
    meaning = Column(String, nullable=False)
    saved_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="saved_words")


class SRSItem(Base):
    __tablename__ = "srs_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    hanzi = Column(String, nullable=False)
    pinyin = Column(String, nullable=False)
    meaning = Column(String, nullable=False)
    
    # SM-2 metrics
    ease_factor = Column(Float, default=2.5)
    interval_days = Column(Integer, default=0)
    repetitions = Column(Integer, default=0)
    next_review_at = Column(DateTime, default=datetime.datetime.utcnow)
    last_reviewed_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="srs_items")


class CompletedLesson(Base):
    __tablename__ = "completed_lessons"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lesson_id = Column(Integer, nullable=False)
    completed_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="completed_lessons")


class UserAchievement(Base):
    __tablename__ = "user_achievements"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    achievement_id = Column(String, nullable=False)
    unlocked_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="achievements")


class WritingSubmission(Base):
    __tablename__ = "writing_submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    original_text = Column(String, nullable=False)
    corrected_text = Column(String, nullable=True)
    feedback = Column(String, nullable=True)
    
    # Scores
    grammar_score = Column(Integer, default=0)
    vocabulary_score = Column(Integer, default=0)
    fluency_score = Column(Integer, default=0)
    overall_score = Column(Integer, default=0)
    changes = Column(JSON, nullable=True) # list of changes
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="writings")


class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    code = Column(String, unique=True, index=True, nullable=False)
    teacher_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    teacher = relationship("User", foreign_keys=[teacher_id])
    students = relationship("ClassroomStudent", back_populates="classroom", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="classroom", cascade="all, delete-orphan")


class ClassroomStudent(Base):
    __tablename__ = "classroom_students"

    id = Column(Integer, primary_key=True, index=True)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    joined_at = Column(DateTime, default=datetime.datetime.utcnow)

    classroom = relationship("Classroom", back_populates="students")
    student = relationship("User", foreign_keys=[student_id])


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"), nullable=False)
    lesson_id = Column(Integer, nullable=False)
    due_date = Column(DateTime, nullable=True)
    assigned_at = Column(DateTime, default=datetime.datetime.utcnow)

    classroom = relationship("Classroom", back_populates="assignments")


class UserCourse(Base):
    __tablename__ = "user_courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    language = Column(String, default="zh")
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_published = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    creator = relationship("User", foreign_keys=[creator_id])
    lessons = relationship("UserCourseLesson", back_populates="course", cascade="all, delete-orphan")


class UserCourseLesson(Base):
    __tablename__ = "user_course_lessons"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("user_courses.id"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    audio_url = Column(String, nullable=True)

    course = relationship("UserCourse", back_populates="lessons")
    questions = relationship("UserCourseQuestion", back_populates="lesson", cascade="all, delete-orphan")


class UserCourseQuestion(Base):
    __tablename__ = "user_course_questions"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("user_course_lessons.id"), nullable=False)
    question = Column(String, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)
    correct_option = Column(String, nullable=False)

    lesson = relationship("UserCourseLesson", back_populates="questions")


class SavedArticle(Base):
    __tablename__ = "saved_articles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    language = Column(String, default="zh")
    saved_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", foreign_keys=[user_id])


class UserActivityLog(Base):
    __tablename__ = "user_activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", foreign_keys=[user_id])


