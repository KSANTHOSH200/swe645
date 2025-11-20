from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from sqlmodel import Session

from .database import init_db, get_session
from . import crud, schemas

app = FastAPI(title="Student Survey API")

# Allow React dev server or frontend service to call this API
origins = [
    "http://localhost:3000",
    "http://localhost",          # adjust if needed
    "*"                          # you can tighten this later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/surveys", response_model=List[schemas.SurveyRead])
def list_surveys(db: Session = Depends(get_session)):
    return crud.get_surveys(db)


@app.get("/surveys/{survey_id}", response_model=schemas.SurveyRead)
def get_survey(survey_id: int, db: Session = Depends(get_session)):
    survey = crud.get_survey(db, survey_id)
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    return survey


@app.post("/surveys", response_model=schemas.SurveyRead, status_code=201)
def create_survey(survey_in: schemas.SurveyCreate, db: Session = Depends(get_session)):
    return crud.create_survey(db, survey_in)


@app.put("/surveys/{survey_id}", response_model=schemas.SurveyRead)
def update_survey(
    survey_id: int,
    survey_in: schemas.SurveyUpdate,
    db: Session = Depends(get_session),
):
    survey = crud.update_survey(db, survey_id, survey_in)
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    return survey


@app.delete("/surveys/{survey_id}", status_code=204)
def delete_survey(survey_id: int, db: Session = Depends(get_session)):
    success = crud.delete_survey(db, survey_id)
    if not success:
        raise HTTPException(status_code=404, detail="Survey not found")
    return
