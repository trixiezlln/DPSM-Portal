from src import login_manager, db
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
import requests
import pip._vendor.cachecontrol as cacheControl
import json


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

#Models
from .models import UserCredentials

'''GOOGLE OAUTH SETUP'''
GOOGLE_CLIENT_ID = environ.get('GOOGLE_CLIENT_ID')
client_secrets_file = environ.get('CLIENTS_SECRETS_FILE')
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

flow = Flow.from_client_secrets_file(
	client_secrets_file = client_secrets_file,
	scopes = ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
	# Heroku
	#redirect_uri = "https://cmsc-128-2.herokuapp.com/google_sign_in_callback")
	#Localhost
	redirect_uri = "http://127.0.0.1:5000/google_sign_in_callback")
'''END'''


auth_blueprint = Blueprint('auth_blueprint', __name__)

login_manager.login_view = 'auth_blueprint.google_sign_in_callback'
@login_manager.user_loader
def load_user(user_id):
	return UserCredentials.query.get(int(user_id))

@auth_blueprint.route('/', methods=['GET'])
def index():
	return 'App Successfully Initialized. Pakyu.', 200

@auth_blueprint.route('/google_sign_in', methods=['GET'])
def google_sign_in():
	authorization_url, state = flow.authorization_url()
	
	session["state"] = state
	return redirect(authorization_url)

@auth_blueprint.route('/google_sign_in_callback')
def google_sign_in_callback():
    try:
        flow.fetch_token(authorization_response=request.url)

        #if not session["state"] == request.args["state"]:
            #abort(500)
            
        credentials = flow.credentials
        request_session = requests.Session()
        cached_session = cacheControl.CacheControl(request_session)
        token_request = google.auth.transport.requests.Request(session = cached_session)

        id_info = id_token.verify_oauth2_token(
            id_token = credentials._id_token,
            request = token_request,
            audience = GOOGLE_CLIENT_ID
        )
        #return id_info
        
        session["google_id"] = id_info.get("sub")
        session["name"] = id_info.get("name")
        session["email"] = id_info.get("email")
        session["picture"] = id_info.get("picture")
        
        user = UserCredentials.query.filter_by(email=session["email"]).first()

        if user is not None:
            login_user(user)
            # if user.is_admin == False:
            #     return redirect('/user-dashboard')
            # else:
            #     return redirect('/admin-dashboard')
        else:
            return "Faculty Account Does not Exist in Database. If you think this is a mistake, please contact the administrator"
        
        if 'Calangian' in session["name"]:
            session["name"] = session["name"] + ' De Guzman'
        return json.dumps({ 
            'status' : 'Google Sign In Successful',
            'name' : session["name"],
            'email' : session["email"],
            'user_id' : current_user.user_id
        }), 200
    except Exception as e:
        print(e)
        return e, 500