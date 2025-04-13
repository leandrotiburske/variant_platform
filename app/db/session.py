import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

DATABASE_URL = (
    f"postgresql://{os.getenv('POSTGRES_USER')}"
    f":{os.getenv('POSTGRES_PASSWORD')}"
    f"@{os.getenv('POSTGRES_HOST')}:5432/{os.getenv('POSTGRES_DB')}"
)

engine = create_engine(DATABASE_URL)
session = sessionmaker(engine)

Base = declarative_base()


def current_session():
    try:
        db = session()
        return db
    finally:
        db.close()
