from typing import List, Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    pass


class UserUpdate(UserCreate):
    name: Optional[str]
    email: Optional[EmailStr]


class UserResponse(UserBase):
    id: int
    variants: List[int] = []

    class Config:
        from_attributes = True
