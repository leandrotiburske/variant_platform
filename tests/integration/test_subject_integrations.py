from fastapi.testclient import TestClient

from app.dtos.account import AccountCreate
from app.dtos.subject import SubjectCreate
from app.dtos.variant import VariantCreate
from app.main import app


def get_auth_token(client: TestClient):
    user = AccountCreate(
        username="testuser", email="testuser@example.com", password="password123"
    )

    res = client.post("/auth/register", json=user.model_dump())
    print("User creation status:", res.status_code)
    print("User creation response:", res.json())

    response = client.post(
        "/auth/login/",
        data={"username": "testuser@example.com", "password": "password123"},
    )

    print("Login status:", response.status_code)
    print("Login response:", response.text)

    assert response.status_code == 200, "Login failed"
    return response.json()["access_token"]



def test_create_individual():
    client = TestClient(app)

    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    subject = SubjectCreate(name="Leandro", email="leandro@email.com")
    response = client.post("/subjects/", json=subject.model_dump(), headers=headers)
    assert response.status_code == 201
    assert response.json()["name"] == "Leandro"
    assert response.json()["email"] == "leandro@email.com"


def test_add_variant_to_subject():
    client = TestClient(app)

    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    # Create a subject
    subject = SubjectCreate(name="Leandro", email="leandro@email.com")
    subject = client.post("/subjects/", json=subject.model_dump(), headers=headers)
    subject_id = subject.json()["id"]

    # Create a variant
    variant = VariantCreate(
        chromosome="1",
        position=123456,
        reference="A",
        alternative="T",
        gene="BRCA1",
        classification="pathogenic",
    )
    variant = client.post("/variants/", json=variant.model_dump(), headers=headers)
    variant_id = variant.json()["id"]

    # Add the variant to the subject
    response = client.patch(
        f"/subjects/{subject_id}/add_variants/?variant_id={variant_id}",
        headers=headers
    )
    assert response.status_code == 200
    assert response.json()["id"] == subject_id

    # Access the variants list
    variants = response.json()["variants"]
    assert len(variants) == 1
    assert variants[0]["chromosome"] == variant.json()["chromosome"]
    assert variants[0]["position"] == variant.json()["position"]
    assert variants[0]["reference"] == variant.json()["reference"]
    assert variants[0]["classification"] == variant.json()["classification"]
    assert variants[0]["id"] == variant.json()["id"]


def test_get_subject():
    client = TestClient(app)

    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    subject = SubjectCreate(name="Leandro", email="leandro@email.com")
    subject_persisted = client.post("/subjects/", json=subject.model_dump(), headers=headers)
    response = client.get(f"/subjects/{subject_persisted.json()['id']}", headers=headers)
    assert response.status_code == 200
    assert response.json()["name"] == subject_persisted.json()["name"]
    assert response.json()["email"] == subject_persisted.json()["email"]
    assert response.json()["id"] == subject_persisted.json()["id"]


def test_get_subjects_variants():
    client = TestClient(app)

    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    # Create a subject
    subject = SubjectCreate(name="Leandro", email="leandro@email.com")
    subject = client.post("/subjects/", json=subject.model_dump(), headers=headers)
    subject_id = subject.json()["id"]

    # Create a variant
    variant = VariantCreate(
        chromosome="1",
        position=123456,
        reference="A",
        alternative="T",
        gene="BRCA1",
        classification="pathogenic",
    )
    variant = client.post("/variants/", json=variant.model_dump(), headers=headers)
    variant_id = variant.json()["id"]

    # Add the variant to the subject
    client.patch(f"/subjects/{subject_id}/add_variants/?variant_id={variant_id}",
                  headers=headers)

    response = client.get(f"/subjects/{subject_id}/variants/", headers=headers)

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


def test_filter_subjects_variants():
    client = TestClient(app)

    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    subject = SubjectCreate(name="Leandro", email="leandro@email.com")
    subject = client.post("/subjects/", json=subject.model_dump(), headers=headers)
    subject_id = subject.json()["id"]

    # Create variant 1
    variant1 = VariantCreate(
        chromosome="1",
        position=123456,
        reference="A",
        alternative="T",
        gene="BRCA1",
        classification="pathogenic",
    )
    variant1 = client.post("/variants/", json=variant1.model_dump(), headers=headers)
    variant1_id = variant1.json()["id"]

    # Add the variant to the subject
    client.patch(f"/subjects/{subject_id}/add_variants/?variant_id={variant1_id}",
                  headers=headers)

    # Create variant 2
    variant2 = VariantCreate(
        chromosome="X",
        position=123456,
        reference="A",
        alternative="T",
        gene="ABCD1",
        classification="benign",
    )
    variant2 = client.post("/variants/", json=variant2.model_dump(), headers=headers)
    variant2_id = variant2.json()["id"]

    # Add the variant to the subject
    client.patch(f"/subjects/{subject_id}/add_variants/?variant_id={variant2_id}",
                  headers=headers)

    response = client.get(f"/subjects/{subject_id}/variants/?chromosome=X", headers=headers)
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
