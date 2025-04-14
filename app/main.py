from fastapi import Depends, FastAPI

import app.dtos as dtos
import app.infra
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
app.include_router(route_variants.router)
