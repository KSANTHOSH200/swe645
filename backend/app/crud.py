from datetime import datetime
from typing import List, Optional

from sqlmodel import Session, select
from .models import Survey
from . import schemas


def create_survey(db: Session, survey_in: schemas.SurveyCreate) -> Survey:
    survey = Survey(**survey_in.dict())
    db.add(survey)
    db.commit()
    db.refresh(survey)
    return survey


def get_surveys(db: Session) -> List[Survey]:
    statement = select(Survey)
    return db.exec(statement).all()


def get_survey(db: Session, survey_id: int) -> Optional[Survey]:
    return db.get(Survey, survey_id)


def update_survey(
    db: Session, survey_id: int, survey_in: schemas.SurveyUpdate
) -> Optional[Survey]:
    survey = db.get(Survey, survey_id)
    if not survey:
        return None

    update_data = survey_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(survey, field, value)

    survey.updated_at = datetime.utcnow()
    db.add(survey)
    db.commit()
    db.refresh(survey)
    return survey


def delete_survey(db: Session, survey_id: int) -> bool:
    survey = db.get(Survey, survey_id)
    if not survey:
        return False
    db.delete(survey)
    db.commit()
    return True
