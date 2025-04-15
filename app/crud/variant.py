from sqlalchemy.orm import Session

from app.dtos.variant import VariantCreate, VariantList, VariantResponse
from app.infra.variant import Variant


def create_variant(db: Session, variant: VariantCreate) -> VariantResponse:
    variant = Variant(
        chromosome=variant.chromosome,
        position=variant.position,
        reference=variant.reference,
        alternative=variant.alternative,
        gene=variant.gene,
        phenotypes=variant.phenotypes,
        external_id=variant.external_id,
        publications=variant.publications,
        classification=variant.classification,
    )
    db.add(variant)
    db.commit()
    db.refresh(variant)
    return variant


def get_variant_by_id(db: Session, variant_id: int) -> VariantResponse:
    variant = db.query(Variant).filter(Variant.id == variant_id).first()
    if not variant:
        raise ValueError(f"Variant with id {variant_id} not found.")
    return variant


def get_all_variants(db: Session) -> VariantList:
    variants = db.query(Variant).all()
    if not variants:
        raise ValueError(f"No variants found.")
    return variants
