import datetime
from sqlalchemy.orm import Session
from app.models import models

def calculate_sm2(quality: int, repetitions: int, ease_factor: float, interval: int):
    """
    SuperMemo-2 (SM-2) Algorithm
    quality: 0-5 (0=complete blackout, 5=perfect response)
    """
    if quality < 3:
        # Incorrect response, reset repetitions
        repetitions = 0
        interval = 1
    else:
        # Correct response
        if repetitions == 0:
            interval = 1
        elif repetitions == 1:
            interval = 6
        else:
            interval = int(round(interval * ease_factor))
        repetitions += 1

    # Update ease factor
    ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    if ease_factor < 1.3:
        ease_factor = 1.3

    return repetitions, ease_factor, interval

def get_due_items(db: Session, user_id: int, limit: int = 20):
    """Fetch items that are due for review."""
    now = datetime.datetime.utcnow()
    return db.query(models.SRSItem).filter(
        models.SRSItem.user_id == user_id,
        models.SRSItem.next_review_at <= now
    ).limit(limit).all()

def review_item(db: Session, item_id: int, user_id: int, quality: int):
    """Process a review for a specific item using SM-2."""
    item = db.query(models.SRSItem).filter(
        models.SRSItem.id == item_id,
        models.SRSItem.user_id == user_id
    ).first()
    
    if not item:
        return None

    # Calculate next metrics
    reps, ef, interval = calculate_sm2(
        quality=quality,
        repetitions=item.repetitions,
        ease_factor=item.ease_factor,
        interval=item.interval_days
    )

    # Update item
    item.repetitions = reps
    item.ease_factor = ef
    item.interval_days = interval
    item.last_reviewed_at = datetime.datetime.utcnow()
    item.next_review_at = datetime.datetime.utcnow() + datetime.timedelta(days=interval)

    db.commit()
    db.refresh(item)
    return item

def add_new_item(db: Session, user_id: int, hanzi: str, pinyin: str, meaning: str):
    """Add a new item to the user's SRS queue."""
    existing = db.query(models.SRSItem).filter(
        models.SRSItem.user_id == user_id,
        models.SRSItem.hanzi == hanzi
    ).first()
    
    if existing:
        return existing
        
    new_item = models.SRSItem(
        user_id=user_id,
        hanzi=hanzi,
        pinyin=pinyin,
        meaning=meaning,
        ease_factor=2.5,
        interval_days=0,
        repetitions=0,
        next_review_at=datetime.datetime.utcnow()
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item
