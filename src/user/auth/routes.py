from flask import Blueprint, render_template, redirect, url_for, flash, g
import flask
from flask import session
from flask import current_app as app
import flask_login
from flask_login import login_user, login_required, logout_user, current_user
from flask import render_template, request
import os
from datetime import datetime as dt, date
from datetime import timedelta, date


#Google OAuth
from google import auth
import google
from google.auth import credentials
from google_auth_oauthlib.flow import Flow
import google.oauth2.id_token as id_token

#Env Vars
from os import environ
from dotenv import load_dotenv
load_dotenv(override=True)

GOOGLE_CLIENT_ID = environ.get('GOOGLE_CLIENT_ID')
client_secrets_file = environ.get('CLIENTS_SECRETS_FILE')


auth_blueprint = Blueprint('auth_blueprint', __name__)

@auth_blueprint.route('/', methods=['GET'])
def index():
	return 'App Successfully Initialized. Pakyu.', 200

@auth_blueprint.route('/google_sign_in', methods=['GET'])
def google_sign_in():
	return 'App Successfully Initialized. Pakyu.', 200