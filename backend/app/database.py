# app/database.py
import os
from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.pool import NullPool  # optional, see below

DB_USER = os.getenv("DB_USER", "admin")
DB_PASS = os.getenv("DB_PASS", "20392039")
DB_HOST = os.getenv(
    "DB_HOST",
    "database-1.cqh6ekok2i0x.us-east-1.rds.amazonaws.com",
)
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "surveys")

DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)


engine = create_engine(
    DATABASE_URL,
    echo=False,
    poolclass=NullPool,          # 🔑 no connection pool, no stale connections
    connect_args={"connect_timeout": 10},
)



def init_db() -> None:
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
