from typing import List, Optional

from pydantic import BaseModel, EmailStr

from app.dtos.variant import VariantResponse


class SubjectBase(BaseModel):
    name: str
    email: EmailStr


class SubjectCreate(SubjectBase):
    pass


class SubjectUpdate(SubjectCreate):
    name: Optional[str]
    email: Optional[EmailStr]


class SubjectResponse(SubjectCreate):
    id: int
    variants: List[VariantResponse] = []

    class Config:
        from_attributes = True
        use_enum_values = True

class SubjectList(BaseModel):
    subjects: List[SubjectResponse]
    class Config:
        orm_mode = True