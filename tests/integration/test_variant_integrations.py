from fastapi.testclient import TestClient

from app.dtos.variant import VariantCreate
from app.main import app

from app.dtos.account import AccountCreate

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



def test_create_variant():
    client = TestClient(app)

    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    variant = VariantCreate(
        chromosome="1",
        position=123456,
        reference="A",
        alternative="T",
        gene="BRCA1",
        classification="pathogenic",
        phenotypes=["breast cancer"],
        external_id="17661",
        publications=["https://pubmed.ncbi.nlm.nih.gov/21990134/"],
    )
    response = client.post("/variants/", json=variant.model_dump(), headers=headers)

    assert response.status_code == 201
    assert response.json()["chromosome"] == "1"
    assert response.json()["position"] == 123456
    assert response.json()["reference"] == "A"
    assert response.json()["alternative"] == "T"
    assert response.json()["gene"] == "BRCA1"
    assert response.json()["classification"] == "pathogenic"
    assert response.json()["phenotypes"] == ["breast cancer"]
    assert response.json()["external_id"] == "17661"
    assert response.json()["publications"] == [
        "https://pubmed.ncbi.nlm.nih.gov/21990134/"
    ]
    assert response.json()["id"] == 1


def test_get_variant():
    client = TestClient(app)

    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    variant = VariantCreate(
        chromosome="1",
        position=123456,
        reference="A",
        alternative="T",
        gene="BRCA1",
        classification="pathogenic",
        phenotypes=["breast cancer"],
        external_id="17661",
        publications=["https://pubmed.ncbi.nlm.nih.gov/21990134/"],
    )
    variant_persisted = client.post("/variants/", json=variant.model_dump(), headers=headers)
    response = client.get(f"/variants/{variant_persisted.json()['id']}", headers=headers)
    assert response.status_code == 200
    assert response.json()["chromosome"] == variant_persisted.json()["chromosome"]
    assert response.json()["position"] == variant_persisted.json()["position"]
    assert response.json()["reference"] == variant_persisted.json()["reference"]
    assert response.json()["alternative"] == variant_persisted.json()["alternative"]
    assert (
        response.json()["classification"] == variant_persisted.json()["classification"]
    )
    assert response.json()["gene"] == variant_persisted.json()["gene"]
    assert response.json()["phenotypes"] == variant_persisted.json()["phenotypes"]
    assert response.json()["external_id"] == variant_persisted.json()["external_id"]
    assert response.json()["publications"] == variant_persisted.json()["publications"]
    assert response.json()["id"] == variant_persisted.json()["id"]


def test_get_all_variants():
    client = TestClient(app)

    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    variant = VariantCreate(
        chromosome="1",
        position=123456,
        reference="A",
        alternative="T",
        gene="BRCA1",
        classification="pathogenic",
        phenotypes=["breast cancer"],
        external_id="17661",
        publications=["https://pubmed.ncbi.nlm.nih.gov/21990134/"],
    )
    client.post("/variants/", json=variant.model_dump(), headers=headers)
    response = client.get("/variants/", headers=headers)

    assert response.status_code == 200
