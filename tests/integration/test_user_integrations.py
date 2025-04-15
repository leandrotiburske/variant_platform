from fastapi.testclient import TestClient

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
        chromosome="1",
        position=123456,
        reference="A",
        alternative="T",
        gene="BRCA1",
        classification="pathogenic",
    )
    variant = client.post("/variants/", json=variant.model_dump())
    variant_id = variant.json()["id"]

    # Add the variant to the user
    response = client.patch(f"/users/{user_id}/add_variants/?variant_id={variant_id}")
    assert response.status_code == 200
    assert response.json()["id"] == user_id

    # Access the variants list
    variants = response.json()["variants"]
    assert len(variants) == 1
    assert variants[0]["chromosome"] == variant.json()["chromosome"]
    assert variants[0]["position"] == variant.json()["position"]
    assert variants[0]["reference"] == variant.json()["reference"]
    assert variants[0]["classification"] == variant.json()["classification"]
    assert variants[0]["id"] == variant.json()["id"]


def test_get_user():
    client = TestClient(app)
    user = UserCreate(name="Leandro", email="leandro@email.com")
    user_persisted = client.post("/users/", json=user.model_dump())
    response = client.get(f"/users/{user_persisted.json()['id']}")
    assert response.status_code == 200
    assert response.json()["name"] == user_persisted.json()["name"]
    assert response.json()["email"] == user_persisted.json()["email"]
    assert response.json()["id"] == user_persisted.json()["id"]


def test_get_users_variants():
    client = TestClient(app)

    # Create a user
    user = UserCreate(name="Leandro", email="leandro@email.com")
    user = client.post("/users/", json=user.model_dump())
    user_id = user.json()["id"]

    # Create a variant
    variant = VariantCreate(
        chromosome="1",
        position=123456,
        reference="A",
        alternative="T",
        gene="BRCA1",
        classification="pathogenic",
    )
    variant = client.post("/variants/", json=variant.model_dump())
    variant_id = variant.json()["id"]

    # Add the variant to the user
    client.patch(f"/users/{user_id}/add_variants/?variant_id={variant_id}")

    response = client.get(f"/users/{user_id}/variants/")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()["variants"][0]["chromosome"] == variant.json()["chromosome"]
    assert response.json()["variants"][0]["position"] == variant.json()["position"]
    assert response.json()["variants"][0]["reference"] == variant.json()["reference"]
    assert (
        response.json()["variants"][0]["classification"]
        == variant.json()["classification"]
    )
    assert response.json()["variants"][0]["id"] == variant.json()["id"]


def test_filter_users_variants():
    client = TestClient(app)

    user = UserCreate(name="Leandro", email="leandro@email.com")
    user = client.post("/users/", json=user.model_dump())
    user_id = user.json()["id"]

    # Create variant 1
    variant1 = VariantCreate(
        chromosome="1",
        position=123456,
        reference="A",
        alternative="T",
        gene="BRCA1",
        classification="pathogenic",
    )
    variant1 = client.post("/variants/", json=variant1.model_dump())
    variant1_id = variant1.json()["id"]

    # Add the variant to the user
    client.patch(f"/users/{user_id}/add_variants/?variant_id={variant1_id}")

    # Create variant 2
    variant2 = VariantCreate(
        chromosome="X",
        position=123456,
        reference="A",
        alternative="T",
        gene="ABCD1",
        classification="benign",
    )
    variant2 = client.post("/variants/", json=variant2.model_dump())
    variant2_id = variant2.json()["id"]

    # Add the variant to the user
    client.patch(f"/users/{user_id}/add_variants/?variant_id={variant2_id}")

    response = client.get(f"/users/{user_id}/variants/?chromosome=X")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()["variants"][0]["chromosome"] == variant2.json()["chromosome"]
    assert response.json()["variants"][0]["position"] == variant2.json()["position"]
    assert response.json()["variants"][0]["reference"] == variant2.json()["reference"]
    assert (
        response.json()["variants"][0]["classification"]
        == variant2.json()["classification"]
    )
    assert response.json()["variants"][0]["gene"] == variant2.json()["gene"]
    assert response.json()["variants"][0]["id"] == variant2.json()["id"]
