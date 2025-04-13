from sqlalchemy.orm import Session

from app.infra.user import User
from app.dtos.user import UserCreate


def create_user(db: Session, user: UserCreate) -> User:
    user = User(name=user.name, email=user.email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
