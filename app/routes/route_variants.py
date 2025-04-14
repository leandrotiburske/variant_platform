from fastapi import APIRouter, Depends, HTTPException, status

from app.crud.variant import create_variant
from app.db import session
from app.db.session import current_session
from app.dtos.variant import VariantCreate, VariantResponse
from app.settings import logger

router = APIRouter(prefix="/variants", tags=["variants"])


@router.post("/", response_model=VariantResponse, status_code=status.HTTP_201_CREATED)
async def create_new_variant(
    variant: VariantCreate, db: session = Depends(current_session)
):
    """
    Create a new variant.
    """
    try:
        variant = create_variant(db, variant)
        logger.info("Variant created successfully")
        return variant

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating variant: {str(e)}",
        ) from e
