from fastapi.testclient import TestClient

from app.dtos.variant import VariantCreate
from app.main import app


def test_create_variant():
    client = TestClient(app)

    variant = VariantCreate(
        chromosome="1", position=123456, reference="A", classification="pathogenic"
    )
    response = client.post("/variants/", json=variant.model_dump())

    assert response.status_code == 201
    assert response.json()["chromosome"] == "1"
    assert response.json()["position"] == 123456
    assert response.json()["reference"] == "A"
    assert response.json()["classification"] == "pathogenic"
    assert response.json()["id"] == 1
