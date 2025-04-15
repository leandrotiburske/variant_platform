from sqlalchemy import Column, ForeignKey, Integer

from app.db.session import Base


class SubjectVariant(Base):
    __tablename__ = "subject_variants"

    subject_id = Column(
        Integer, ForeignKey("subjects.id", ondelete="CASCADE"), primary_key=True
    )
    variant_id = Column(
        Integer, ForeignKey("variants.id", ondelete="CASCADE"), primary_key=True
    )
