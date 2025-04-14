from fastapi.testclient import TestClient

from app.crud.user import create_user
from app.dtos.user import UserCreate
from app.dtos.variant import VariantCreate
from app.main import app


def test_create_user():
    client = TestClient(app)
    user = UserCreate(name="Leandro", email="leandro@email.com")
    response = client.post("/users/", json=user.model_dump())
    assert response.status_code == 201
    assert response.json()["name"] == "Leandro"
    assert response.json()["email"] == "leandro@email.com"

def test_add_variant_to_user():
    client = TestClient(app)

    # Create a user
    user = UserCreate(name="Leandro", email="leandro@email.com")
    user = client.post("/users/", json=user.model_dump())
    user_id = user.json()["id"]

    # Create a variant
    variant = VariantCreate(
        chromosome="1", position=123456, reference="A", classification="pathogenic"
    )
    variant = client.post("/variants/", json=variant.model_dump())
    variant_id = variant.json()["id"]

    # Add the variant to the user
    response = client.patch(f"/users/{user_id}/add_variants/?variant_id={variant_id}")
    assert response.status_code == 200
