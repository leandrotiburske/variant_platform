from typing import List, Optional

from pydantic import BaseModel

from app.infra.variant import ChromosomeEnum, ClassificationEnum


class VariantCreate(BaseModel):
    chromosome: ChromosomeEnum
    position: int
    reference: str
    alternative: str
    gene: str
    classification: Optional[ClassificationEnum] = None
    phenotypes: Optional[List[str]] = None
    external_id: Optional[str] = None
    publications: Optional[List[str]] = None

    class Config:
        from_attributes = True
        use_enum_values = True


class VariantResponse(VariantCreate):
    id: int

    class Config:
        from_attributes = True
        use_enum_values = True


class VariantList(BaseModel):
    variants: List[VariantResponse]
