from typing import List, Optional
from app.infra.variant import ChromosomeEnum, ClassificationEnum

from pydantic import BaseModel

class VariantCreate(BaseModel):
    chromosome: ChromosomeEnum
    position: int
    reference: str
    classification: ClassificationEnum

    class Config:
        from_attributes = True
        use_enum_values = True