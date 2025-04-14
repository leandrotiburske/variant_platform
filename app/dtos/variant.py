from typing import List, Optional

from pydantic import BaseModel

from app.infra.variant import ChromosomeEnum, ClassificationEnum


class VariantCreate(BaseModel):
    chromosome: ChromosomeEnum
    position: int
    reference: str
    classification: ClassificationEnum

    class Config:
        from_attributes = True
        use_enum_values = True


class VariantResponse(VariantCreate):
    id: int

    class Config:
        from_attributes = True
        use_enum_values = True
