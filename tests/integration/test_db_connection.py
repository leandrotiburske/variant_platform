from sqlalchemy import text

from app.db.session import session


def test_db_connection():
    with session() as db:
        try:
            result = db.execute(text("SELECT 1 + 1")).scalar()
            assert result == 2
        finally:
            db.close()
