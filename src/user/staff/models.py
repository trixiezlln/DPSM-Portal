from src import db
from flask_login import UserMixin
from flask import current_app as app
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON, ARRAY
from sqlalchemy import *
from sqlalchemy.schema import FetchedValue

