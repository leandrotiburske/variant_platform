from fastapi import APIRouter, Depends, HTTPException, status

import app.dtos as dtos
from app.crud.user import create_user, add_variant_to_user, get_user_by_id
from app.db import session
from app.db.session import current_session
from app.settings import logger

router = APIRouter(prefix="/users", tags=["users"])

@router.get(
    "/{user_id}/", response_model=dtos.user.UserResponse, status_code=status.HTTP_200_OK
)
async def get_user(user_id: int, db: session = Depends(current_session)):
    try:
        user = get_user_by_id(db=db, user_id=user_id)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found: {str(e)}",
        ) from e

@router.post(
    "/", response_model=dtos.user.UserResponse, status_code=status.HTTP_201_CREATED
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
            detail=f"Error creating user: {str(e)}",
        ) from e

@router.patch(
    "/{user_id}/add_variants/", response_model=dtos.user.UserResponse, status_code=status.HTTP_200_OK
)
async def add_variant(
    user_id: int, variant_id: int, db: session = Depends(current_session)
):
    try:
        user = add_variant_to_user(
            db=db, user_id=user_id, variant_id=variant_id
            )
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error adding variant to user: {str(e)}",
        ) from e