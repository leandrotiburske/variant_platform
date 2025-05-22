from sqlalchemy.orm import Session

from app.auth.authentication import hash_password
from app.dtos.account import AccountCreate, AccountLogin, AccountResponse
from app.infra.account import Account


def create_account(db: Session, account: AccountCreate) -> AccountResponse:
    hashed_password = hash_password(account.password)
    account_data = Account(
        username=account.username,
        email=account.email,
        hashed_password=hashed_password,
    )
    db.add(account_data)
    db.commit()
    db.refresh(account_data)
    return account_data


def retrieve_account(db: Session, email: str) -> AccountLogin:
    account = db.query(Account).filter(Account.email == email).first()
    if account:
        return account
    else:
        raise ValueError("Account not found")
