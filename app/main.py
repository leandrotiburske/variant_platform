from fastapi import Depends, FastAPI

import app.infra
import app.dtos as dtos
from app.crud.user import create_user
from app.db import session
from app.db.session import Base, current_session, engine
from app.routes import route_users, route_variants
from app.settings import logger

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/health")
async def health_check():
    return {"message": "OK"}


app.include_router(route_users.router)
