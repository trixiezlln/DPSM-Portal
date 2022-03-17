from src import db
from flask_login import UserMixin
from flask import current_app as app
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON, ARRAY
from sqlalchemy import *
from sqlalchemy.schema import FetchedValue

schema = 'public'

class FacultyPersonalInformation(UserMixin, db.Model):
    __table_args__ = {
        'schema' : schema, 
        'extend_existing': True
    }
    __tablename__ = 'faculty_personal_information'
    user_id 					= db.Column(db.String(180), primary_key=True, nullable=True)
    rank                        = db.Column(db.String(180), nullable=True)
    classification              = db.Column(db.String(180), nullable=True)
    status                      = db.Column(db.String(180), nullable=True)
    tenure                      = db.Column(db.String(180), nullable=True)
    first_name                  = db.Column(db.String(180), nullable=True)
    middle_name                 = db.Column(db.String(180), nullable=True)
    last_name                   = db.Column(db.String(180), nullable=True)
    suffix                      = db.Column(db.String(180), nullable=True)
    date_of_birth               = db.Column(DATE, nullable=True)
    place_of_birth              = db.Column(db.String(180), nullable=True)
    present_address             = db.Column(db.String(180), nullable=True)
    permanent_address           = db.Column(db.String(180), nullable=True)
    civil_status                = db.Column(db.String(180), nullable=True)
    religion                    = db.Column(db.String(180), nullable=True)
    landline                    = db.Column(db.String(180), nullable=True)
    mobile_number               = db.Column(db.String(180), nullable=True)
    primary_email               = db.Column(db.String(180), nullable=True)
    alternate_email             = db.Column(db.String(180), nullable=True)
    last_modified               = db.Column(TIMESTAMP, nullable=True)
    date_created                = db.Column(DATE, nullable=True)
    created_by                  = db.Column(db.String(180), nullable=True)

class EducationalAttainment(UserMixin, db.Model):
    __table_args__ = {
        'schema' : schema, 
        'extend_existing': True
    }
    __tablename__ = 'educational_attainment'
    user_id = db.Column(db.String(180), primary_key=True, nullable=True)
    school = db.Column(db.String(180), nullable=True)
    degree = db.Column(db.String(180), nullable=True)
    specialization = db.Column(db.String(180), nullable=True)
    degree_type = db.Column(db.String(180), nullable=True)
    start_date = db.Column(DATE, nullable=True)
    end_date = db.Column(DATE, nullable=True)
    last_modified = db.Column(TIMESTAMP, nullable=True)

