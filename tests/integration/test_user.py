from app.crud.user import create_user
from app.dtos.user import UserCreate
from app.dtos.variant import VariantCreate
from fastapi.testclient import TestClient
from app.main import app


def test_create_user(db_session):
    client = TestClient(app)
    user = UserCreate(name="Leandro", email="leandro@email.com")
    response = client.post("/users/", json=user.model_dump())
    assert response.status_code == 201
    assert response.json()["name"] == "Leandro"
    assert response.json()["email"] == "leandro@email.com"
