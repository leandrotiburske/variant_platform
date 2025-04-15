from fastapi import APIRouter, Depends, HTTPException, status

from app.crud.variant import (create_variant, get_all_variants,
                              get_variant_by_id)
from app.db import session
from app.db.session import current_session
from app.dtos.variant import VariantCreate, VariantList, VariantResponse
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


@router.get(
    "/{variant_id}", response_model=VariantResponse, status_code=status.HTTP_200_OK
)
async def get_variant(variant_id: int, db: session = Depends(current_session)):
    """
    Get a variant by id.
    """
    try:
        variant = get_variant_by_id(db=db, variant_id=variant_id)
        return variant
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subject with id {variant_id} not found: {str(e)}",
        ) from e


@router.get("/", response_model=VariantList, status_code=status.HTTP_200_OK)
async def get_variants(db: session = Depends(current_session)):
    """
    Get all variants.
    """
    try:
        variants = get_all_variants(db=db)
        return {"variants": variants}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Error retrieving variants: {str(e)}",
        ) from e
