from sqlalchemy.orm import Session

from app.infra.variant import Variant
from app.dtos.variant import VariantCreate

def create_variant(db: Session, variant: VariantCreate):
    variant = Variant(chromosome = variant.chromosome,
                      position = variant.position,
                      reference = variant.reference,
                      classification = variant.classification)
    db.add(variant)
    db.commit()
    db.refresh(variant)
    return variant
