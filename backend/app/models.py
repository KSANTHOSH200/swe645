from datetime import date, datetime
from sqlmodel import SQLModel, Field


class Survey(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    first_name: str
    last_name: str
    street: str
    city: str
    state: str
    zip: str
    phone: str
    email: str
    survey_date: date

    liked_most: str            # e.g. "students"
    how_interested: str        # e.g. "friends,television"
    recommendation: str        # e.g. "Very Likely"

    created_at: datetime | None = Field(default_factory=datetime.utcnow)
    updated_at: datetime | None = Field(default_factory=datetime.utcnow)
