from app.dtos.variant import VariantCreate


def test_create_variant():
    variant_data = VariantCreate(
        chromosome="1", position=123456, reference="A", classification="pathogenic"
    )

    assert variant_data.chromosome == "1"
    assert variant_data.position == 123456
    assert variant_data.reference == "A"
    assert variant_data.classification == "pathogenic"
