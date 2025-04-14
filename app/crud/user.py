from sqlalchemy.orm import Session

from app.dtos.user import UserCreate, UserResponse
from app.infra.user import User
from app.infra.variant import Variant


def create_user(db: Session, user: UserCreate) -> UserResponse:
    user = User(name=user.name, email=user.email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_id(db: Session, user_id: int) -> UserResponse:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError(f"User with id {user_id} not found.")
    return user

def add_variant_to_user(db: Session, user_id: int, variant_id: int) -> UserResponse:
    user = get_user_by_id(db, user_id)
    variant = db.query(Variant).filter(Variant.id == variant_id).first()
    if user and variant:
        user.variants.append(variant)
        db.commit()
        db.refresh(user)
    else:
        raise ValueError(f"Variant with id {variant_id} not found.")
    return user