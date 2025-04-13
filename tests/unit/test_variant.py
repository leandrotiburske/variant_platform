from app.crud.variant import create_variant
from app.dtos.variant import VariantCreate

def test_create_variant(db_session):
    variant_data = VariantCreate(
        chromosome="1",
        position=123456,
        reference="A",
        classification="pathogenic"
    )
    variant = create_variant(db_session, variant_data)
    assert variant.id is not None
    assert variant.chromosome == "1"
    assert variant.position == 123456
    assert variant.reference == "A"
    assert variant.classification == "pathogenic"
