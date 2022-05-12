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

    # Many licensure exams, trainings/seminars, FSR 
    licensure                   = db.relationship('LicensureExams', backref='licensure')

class EducationalAttainment(UserMixin, db.Model):
    __table_args__ = {
        'schema' : schema, 
        'extend_existing': True
    }
    __tablename__ = 'educational_attainment'
    user_id = db.Column(db.String(180), nullable=True)
    school = db.Column(db.String(180), nullable=True)
    degree = db.Column(db.String(180), nullable=True)
    specialization = db.Column(db.String(180), nullable=True)
    degree_type = db.Column(db.String(180), nullable=True)
    start_date = db.Column(DATE, nullable=True)
    end_date = db.Column(DATE, nullable=True)
    last_modified = db.Column(TIMESTAMP, nullable=True)
    id = db.Column(db.String(180), primary_key=True, nullable=True) 

class LicensureExams(UserMixin, db.Model):
    __table_args__ = {
        'schema':schema,
        'extend_existing': True
    }
    __tablename__ = 'licensure_exams'
    id                          = db.Column(db.String(180), primary_key=True, nullable=True)
    name_exam                   = db.Column(db.String(180), nullable=True)
    rank                        = db.Column(db.String(180), nullable=True)
    license_number              = db.Column(db.String(180), nullable=True)
    date                        = db.Column(DATE, nullable=True)
    licensure_file              = db.Column(db.LargeBinary)
    last_modified               = db.Column(TIMESTAMP, nullable=True)
    licensure_exam_id           = db.Column(db.String(180), db.ForeignKey('facultypersonalinformation.user_id'))

    def __repr__(self):
        return f'<Licensure Exam Name {self.name_exam}>'


class TrainingSeminar(UserMixin, db.Model):
    __table_args__ = {
        'schema':schema,
        'extend_existing': True
    }
    __tablename__ = 'training_seminar'
    id                          = db.Column(db.String(180), primary_key=True, nullable=True)
    name_training               = db.Column(db.String(180), nullable=True)
    role                        = db.Column(db.String(180), nullable=True)
    remarks                     = db.Column(db.String(180), nullable=True)
    start_date                  = db.Column(DATE, nullable=True)
    end_date                    = db.Column(DATE, nullable=True)
    # training_file               = db.Column()# file format)
    last_modified               = db.Column(TIMESTAMP, nullable=True)

    training_seminar_id           = db.Column(db.String(180), db.ForeignKey('facultypersonalinformation.user_id'))

    def __repr__(self):
        return f'<Training/Seminar Exam Name {self.name_training}>'

class FacultySETRecords(UserMixin, db.Model):
    __table_args__ = {
        'schema':schema,
        'extend_existing': True
    }
    __tablename__ = 'faculty_set_records'
    id                          = db.Column(db.String(180), primary_key=True, nullable=True)
    course_code                 = db.Column(db.String(180), nullable=True)
    section                     = db.Column(db.String(180), nullable=True)
    semester                    = db.Column(db.String(180), nullable=True)
    sy                          = db.Column(DATE, nullable=True)
    schedule                    = db.Column(DATE, nullable=True)
    number_students             = db.Column(db.String(180), nullable=True)
    fsr_score                   = db.Column(db.String(180), nullable=True) 
    set_score                   = db.Column(db.String(180), nullable=True)
    last_modified               = db.Column(TIMESTAMP, nullable=True)


    def __repr__(self):
        return f'<FSR ID {self.id}>'




