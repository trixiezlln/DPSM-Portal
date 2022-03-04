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

auth_blueprint = Blueprint('auth_blueprint', __name__)

@auth_blueprint.route('/', methods=['GET'])
def index():
	return 'App Successfully Initialized. Pakyu.', 400