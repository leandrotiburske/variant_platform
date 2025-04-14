from typing import List, Optional

from app.dtos.variant import VariantResponse

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    pass


class UserUpdate(UserCreate):
    name: Optional[str]
    email: Optional[EmailStr]


class UserResponse(UserCreate):
    id: int
    variants: List[VariantResponse] = []

    class Config:
        from_attributes = True
        use_enum_values = True
