from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, index=True, unique=True, nullable=False)

    variants = relationship(
        "Variant", secondary="user_variants", back_populates="users"
    )
