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
import time


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
GOOGLE_ALLOWED_EMAILS = ['*@up.edu.ph']
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

flow = Flow.from_client_secrets_file(
	client_secrets_file = client_secrets_file,
	scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'openid'],
	# Heroku
	#redirect_uri = 'https://cmsc-128-2.herokuapp.com/google_sign_in_callback')
	#Localhost
	#redirect_uri = 'https://cmsc-128-2.herokuapp.com/google_sign_in_callback')
    redirect_uri = 'http://dpsm-portal.up.railway.app/google_sign_in_callback') #added by pa
'''END'''


auth_blueprint = Blueprint('auth_blueprint', __name__)

@login_manager.user_loader
def load_user(user_id):
	return UserCredentials.query.get(user_id)

@auth_blueprint.route('/', methods=['GET'])
def index():
    return render_template('auth/login.html')
	#return 'App Successfully Initialized.', 200

@auth_blueprint.route('/google_sign_in', methods=['GET'])
def google_sign_in():
	authorization_url, state = flow.authorization_url()
	session['state'] = state
	return redirect(authorization_url)

@auth_blueprint.route('/google_sign_in_callback')
def google_sign_in_callback():
    try:
        flow.fetch_token(authorization_response=request.url)

        #if not session['state'] == request.args['state']:
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

        email = id_info.get('email')
        allowed_domain = 'up.edu.ph'
        
        if not email.endswith('@' + allowed_domain):
             flash('You are not authorized to access this application.', 'error')
             time.sleep(5)
             return redirect(url_for('auth_blueprint.index'))

        #return id_info
        
        session['google_id'] = id_info.get('sub')
        session['name'] = id_info.get('name')
        session['email'] = id_info.get('email')
        session['picture'] = id_info.get('picture')
        
        user = UserCredentials.query.filter_by(email=session['email']).first()

        if user is not None:
            login_user(user)
            if user.role == 'clerk':
                print(current_user.user_id)
                return redirect(url_for('clerk_blueprint.clerk_faculty_list'))
            elif user.role == 'faculty':
                if user.is_unit_head is True:
                    return redirect(url_for('unit_head_blueprint.load_unit_head_dashboard'))
                elif user.is_dept_head is True:
                    return redirect(url_for('dept_chair_blueprint.load_dept_head_dashboard'))
                else:
                    return redirect(url_for('faculty_blueprint.view_info'))
        else:
            return 'Faculty Account Does not Exist in Database. If you think this is a mistake, please contact the administrator.'
        
        return json.dumps({ 
            'status' : 'Google Sign In Successful',
            'name' : session['name'],
            'email' : session['email'],
            'user_id' : current_user.user_id
        }), 200
    except Exception as e:
        print(e)
        return e, 500

@auth_blueprint.route('/logout')
def logout():
	logout_user()
	return redirect(url_for('auth_blueprint.index'))
