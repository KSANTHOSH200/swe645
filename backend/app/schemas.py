from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class SurveyBase(BaseModel):
    first_name: str
    last_name: str
    street: str
    city: str
    state: str
    zip: str
    phone: str
    email: EmailStr
    survey_date: date
    liked_most: str
    how_interested: str
    recommendation: str


class SurveyCreate(SurveyBase):
    pass


class SurveyUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    survey_date: Optional[date] = None
    liked_most: Optional[str] = None
    how_interested: Optional[str] = None
    recommendation: Optional[str] = None


class SurveyRead(SurveyBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
