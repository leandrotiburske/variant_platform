from sqlalchemy import Column, Integer, String

from app.db.session import Base


class Account(Base):

    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True)
    username = Column(String, index=True, nullable=False)
    email = Column(String, index=True, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
