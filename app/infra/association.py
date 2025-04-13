from sqlalchemy import Column, ForeignKey, Integer

from app.db.session import Base


class UserVariant(Base):
    __tablename__ = "user_variants"

    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    variant_id = Column(
        Integer, ForeignKey("variants.id", ondelete="CASCADE"), primary_key=True
    )
