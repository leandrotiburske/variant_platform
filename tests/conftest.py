import os
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.session import Base, current_session
from app.main import app

DATABASE_URL = (
    f"postgresql://{os.getenv('TEST_POSTGRES_USER')}:"
    f"{os.getenv('TEST_POSTGRES_PASSWORD')}@"
    f"{os.getenv('TEST_POSTGRES_HOST')}:5432/"
    f"{os.getenv('TEST_POSTGRES_DB')}"
)

engine = create_engine(DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="function")
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session  

    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture(autouse=True)
def override_get_db(db_session):
    def _override():
        yield db_session
    app.dependency_overrides[current_session] = _override
