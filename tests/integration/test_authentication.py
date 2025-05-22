from fastapi.security import OAuth2PasswordRequestForm
from fastapi.testclient import TestClient

from app.dtos.account import AccountCreate
from app.main import app


def test_register():
    """
    Test the account registration endpoint.
    """
    client = TestClient(app)

    account = AccountCreate(
        username="Leandro Tiburske", email="leandro@email.com", password="password"
    )

    response = client.post("/auth/register/", json=account.model_dump())
    assert response.status_code == 201
    assert response.json()["username"] == account.username
    assert response.json()["email"] == account.email
    assert response.json()["id"] == 1


def test_login():
    """
    Test the account login endpoint.
    """
    client = TestClient(app)

    account = AccountCreate(
        username="Leandro Tiburske", email="leandro@email.com", password="password"
    )
    client.post("/auth/register/", json=account.model_dump())

    response = client.post(
        "/auth/login/",
        data={"username": account.email, "password": account.password},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"
