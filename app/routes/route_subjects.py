from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status

import app.dtos as dtos
from app.auth.authentication import get_current_account
from app.crud.subject import (add_variant_to_subject, create_subject,
                              get_subject_by_id,
                              get_subject_variants_and_filter)
from app.db import session
from app.db.session import current_session
from app.infra.account import Account
from app.settings import logger

router = APIRouter(prefix="/subjects", tags=["subjects"])


@router.get(
    "/{subject_id}/",
    response_model=dtos.subject.SubjectResponse,
    status_code=status.HTTP_200_OK,
)
async def get_subject(
    subject_id: int,
    db: session = Depends(current_session),
    account: Account = Depends(get_current_account),
):
    try:
        subject = get_subject_by_id(db=db, subject_id=subject_id)
        return subject
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subject with id {subject_id} not found: {str(e)}",
        ) from e


@router.post(
    "/",
    response_model=dtos.subject.SubjectResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_new_subject(
    subject: dtos.subject.SubjectCreate,
    db: session = Depends(current_session),
    current_user: Account = Depends(get_current_account),
):
    try:
        new_subject = create_subject(subject=subject, db=db)
        logger.info(
            f"New subject created. Subject name: {new_subject.name}, id: {new_subject.id}"
        )
        return new_subject

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating subject: {str(e)}",
        ) from e


@router.patch(
    "/{subject_id}/add_variants/",
    response_model=dtos.subject.SubjectResponse,
    status_code=status.HTTP_200_OK,
)
async def add_variant(
    subject_id: int,
    variant_id: int,
    db: session = Depends(current_session),
    current_user: Account = Depends(get_current_account),
):
    try:
        subject = add_variant_to_subject(
            db=db, subject_id=subject_id, variant_id=variant_id
        )
        return subject
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error adding variant to subject: {str(e)}",
        ) from e


@router.get(
    "/{subject_id}/variants/",
    response_model=dtos.variant.VariantList,
    status_code=status.HTTP_200_OK,
)
async def get_subject_variants(
    subject_id: int,
    db: session = Depends(current_session),
    chromosome: Optional[str] = Query(None),
    gene: Optional[str] = Query(None),
    classification: Optional[str] = Query(None),
    phenotypes: Optional[str] = Query(None),
    current_user: Account = Depends(get_current_account),
):
    """
    Get all subject's variants and filter by chromosome, gene, classification, and phenotypes.
    """
    try:
        variants = get_subject_variants_and_filter(
            db=db,
            subject_id=subject_id,
            chromosome=chromosome,
            gene=gene,
            classification=classification,
            phenotypes=phenotypes,
        )
        return {"variants": variants}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subject with id {subject_id} not found: {str(e)}",
        ) from e
