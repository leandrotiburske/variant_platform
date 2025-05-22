from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

import app.dtos as dtos
from app.auth.authentication import create_access_token, verify_password
from app.crud.account import create_account, retrieve_account
from app.db import session
from app.db.session import current_session
from app.settings import logger

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post(
    "/register/",
    response_model=dtos.account.AccountResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    account: dtos.account.AccountCreate,
    db: session = Depends(current_session),
) -> dtos.account.AccountResponse:
    """
    Register a new user account.
    """
    logger.info(f"Registering new account: {account.username}")
    try:
        return create_account(db, account)
    except Exception as e:
        logger.error(f"Error creating account: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while creating the account.",
        )


@router.post("/login/", response_model=None)
def user_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: session = Depends(current_session),
):
    """
    Login registered user.
    """
    try:
        email = form_data.username
        password = form_data.password
        account = retrieve_account(email=email, db=db)
        if not account or not verify_password(
            plain_password=password, hashed_password=account.hashed_password
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        else:
            access_token = create_access_token(data={"sub": str(account.id)})
            return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        logger.error(f"Error logging in: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while logging in.",
        )
