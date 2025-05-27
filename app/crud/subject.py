from typing import Optional, List

from sqlalchemy.orm import Session

from app.dtos.subject import SubjectCreate, SubjectResponse, SubjectList
from app.dtos.variant import VariantList
from app.infra.subject import Subject
from app.infra.variant import Variant


def create_subject(db: Session, subject: SubjectCreate) -> SubjectResponse:
    subject = Subject(name=subject.name, email=subject.email)
    db.add(subject)
    db.commit()
    db.refresh(subject)
    return subject

def get_all_subjects(db: Session) -> List[SubjectResponse]:
    subjects = db.query(Subject).all()
    return subjects


def get_subject_by_id(db: Session, subject_id: int) -> SubjectResponse:
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise ValueError(f"Subject with id {subject_id} not found.")
    return subject


def add_variant_to_subject(
    db: Session, subject_id: int, variant_id: int
) -> SubjectResponse:
    subject = get_subject_by_id(db, subject_id)
    variant = db.query(Variant).filter(Variant.id == variant_id).first()
    if subject and variant:
        subject.variants.append(variant)
        db.commit()
        db.refresh(subject)
    else:
        raise ValueError(f"Variant with id {variant_id} not found.")
    return subject


def get_subject_variants(db: Session, subject_id: int) -> VariantList:
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if subject:
        variants = subject.variants
        return variants
    else:
        raise ValueError(f"Subject with id {subject_id} not found.")


def get_subject_variants_and_filter(
    db: Session,
    subject_id: int,
    chromosome: Optional[str] = None,
    gene: Optional[str] = None,
    classification: Optional[str] = None,
    phenotypes: Optional[str] = None,
) -> VariantList:
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if subject:
        variants = subject.variants or []
        if chromosome:
            variants = [v for v in variants if v.chromosome == chromosome]
        if gene:
            variants = [v for v in variants if v.gene == gene]
        if classification:
            variants = [v for v in variants if v.classification == classification]
        if phenotypes:
            variants = [v for v in variants if phenotypes in v.phenotypes]
        return variants
    else:
        raise Exception(f"Subject with id {subject_id} not found.")
