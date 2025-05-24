from fastapi import Depends, FastAPI

import app.dtos as dtos
import app.infra
from app.crud.subject import create_subject
from app.db import session
from app.db.session import Base, current_session, engine
from app.routes import route_auth, route_subjects, route_variants
from app.settings import logger
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"message": "OK"}


app.include_router(route_subjects.router)
app.include_router(route_variants.router)
app.include_router(route_auth.router)
