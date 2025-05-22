from pydantic import BaseModel, EmailStr


class AccountBase(BaseModel):
    username: str
    email: EmailStr


class AccountCreate(AccountBase):
    password: str


class AccountLogin(AccountBase):
    password: str


class AccountResponse(AccountBase):
    id: int

    class Config:
        from_attributes = True
