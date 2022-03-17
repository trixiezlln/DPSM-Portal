from src import db
from flask_login import UserMixin
from flask import current_app as app
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON, ARRAY
from sqlalchemy import *
from sqlalchemy.schema import FetchedValue

schema = 'public'

class UserCredentials(UserMixin, db.Model):
    __table_args__ = {'schema' : schema, 'extend_existing': True}
    __tablename__ = 'user_credentials'
    user_id 					= db.Column(db.String(180), primary_key=True, nullable=True)
    email 					    = db.Column(db.String(180), nullable=True)
    role 					    = db.Column(db.String(180), nullable=True)
    date_created				= db.Column(TIMESTAMP, nullable=True)