from flask import Flask
from flask import session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_bootstrap import Bootstrap
from flask_migrate import Migrate
#import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from os import environ
from dotenv import load_dotenv

db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()

#Blueprint Imports
from src.user.auth.routes import auth_blueprint
from src.user.staff.clerk.routes import clerk_blueprint
from src.user.staff.faculty.routes import faculty_blueprint

load_dotenv(override=True)



def create_app(config_filename=None):

	#Database credentials
	app = Flask(__name__,template_folder='templates')
	app.config['SECRET_KEY'] = environ.get('SECRET_KEY')
	app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
	app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1

	#Session timeout
	# app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=2)
	app.config['SESSION_REFRESH_EACH_REQUEST'] = True

	 # Login Manager
	login_manager.init_app(app)

	# Bcrypt init
	bcrypt.init_app(app)

	# Initialize app 
	db.init_app(app)

    # Blueprints 
	app.register_blueprint(auth_blueprint)
	app.register_blueprint(clerk_blueprint)
	app.register_blueprint(faculty_blueprint)
	

	return app