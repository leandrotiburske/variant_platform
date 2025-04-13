from fastapi import APIRouter, Depends, HTTPException, status

import app.dtos as dtos
from app.crud.user import create_user
from app.db import session
from app.db.session import current_session
from app.settings import logger

router = APIRouter(prefix="/users", tags=["users"])


@router.post(
    "/", response_model=dtos.user.UserCreate, status_code=status.HTTP_201_CREATED
)
async def create_new_user(
    user: dtos.user.UserCreate, db: session = Depends(current_session)
):
    try:
        new_user = create_user(user=user, db=db)
        logger.info(f"New user created. User name: {new_user.name}, id: {new_user.id}")
        return new_user
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating user: {str(e)}"
        ) from e