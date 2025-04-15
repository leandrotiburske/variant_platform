from enum import Enum

from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.types import Enum as SqlEnum

from app.db.session import Base


class ChromosomeEnum(str, Enum):
    CHR1 = "1"
    CHR2 = "2"
    CHR3 = "3"
    CHR4 = "4"
    CHR5 = "5"
    CHR6 = "6"
    CHR7 = "7"
    CHR8 = "8"
    CHR9 = "9"
    CHR10 = "10"
    CHR11 = "11"
    CHR12 = "12"
    CHR13 = "13"
    CHR14 = "14"
    CHR15 = "15"
    CHR16 = "16"
    CHR17 = "17"
    CHR18 = "18"
    CHR19 = "19"
    CHR20 = "20"
    CHR21 = "21"
    CHR22 = "22"
    CHRX = "X"
    CHRY = "Y"
    CHRMT = "MT"


class ClassificationEnum(str, Enum):
    BENIGN = "benign"
    LIKELY_BENIGN = "likely_benign"
    UNCERTAIN_SIGNIFICANCE = "uncertain_significance"
    LIKELY_PATHOGENIC = "likely_pathogenic"
    PATHOGENIC = "pathogenic"


class Variant(Base):

    __tablename__ = "variants"

    id = Column(Integer, primary_key=True)
    chromosome = Column(SqlEnum(ChromosomeEnum), index=True, nullable=False)
    position = Column(Integer, index=True, nullable=False)
    reference = Column(String, index=True, nullable=False)
    alternative = Column(String, index=True, nullable=False)
    gene = Column(String, index=True, nullable=False)

    classification = Column(SqlEnum(ClassificationEnum), index=True, nullable=True)
    phenotypes = Column(ARRAY(String), index=True, nullable=True)
    external_id = Column(String, index=True, nullable=True)
    publications = Column(ARRAY(String), nullable=True)

    users = relationship("User", secondary="user_variants", back_populates="variants")
