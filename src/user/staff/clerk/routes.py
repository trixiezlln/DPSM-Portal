import email
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

#Models
from ..models import FacultyPersonalInformation
from ...auth.models import UserCredentials

clerk_blueprint = Blueprint('clerk_blueprint', __name__)

@login_manager.user_loader
def load_user(user_id):
	return UserCredentials.query.get(int(user_id))

@clerk_blueprint.route('/clerk/create_faculty_account', methods=['GET', 'POST'])
def create_faculty_account():
    try:
        if request.method == 'GET':
            new_account_form = request.form
            
            new_faculty_account = FacultyPersonalInformation(
                user_id = '2018-00002',
            )
            db.session.add(new_faculty_account)
            db.session.commit()
            return 'Faculty Account Successfully Created.', 200
        elif request.method == 'POST':
            new_account_form = request.form
            
            new_faculty_account = FacultyPersonalInformation(
                user_id             = new_account_form['user_id'],
                rank                = new_account_form['rank'],
                classification      = new_account_form['classification'],
                status              = new_account_form['status'],
                tenure              = new_account_form['tenure'],
                first_name          = new_account_form['first_name'],
                middle_name         = new_account_form['middle_name'],
                last_name           = new_account_form['last_name'],
                suffix              = new_account_form['suffix'],
                date_of_birth       = new_account_form['date_of_birth'],
                place_of_birth      = new_account_form['place_of_birth'],
                present_address     = new_account_form['present_address'],
                permanent_address   = new_account_form['permanent_address'],
                civil_status        = new_account_form['civil_status'],
                religion            = new_account_form['religion'],
                landline            = new_account_form['landline'],
                mobile_number       = new_account_form['mobile_number'],
                primary_email       = new_account_form['primary_email'],
                alternate_email     = new_account_form['alternate_email'],
                date_created        = date.today(),
                created_by          = current_user.email
            )
            db.session.add(new_faculty_account)

            new_user_credentials = UserCredentials(
                user_id         = new_account_form['user_id'],
                email           = new_account_form['primary_email'],
                role            = 'faculty',
                date_created    = date.today()
            )
            db.session.add(new_user_credentials)

            db.session.commit()
            return 'Faculty Account Successfully Created.', 200
            #return render_template('.html')
    except Exception as e:
        print(e)
        return 'An error has occured.', 400

@clerk_blueprint.route('/clerk/faculty_list', methods=['GET'])
def clerk_faculty_list():
    try:
        faculty_list = []
        faculty_records = FacultyPersonalInformation.query.all()

        for record in faculty_records:
            if record.middle_name is None:
                faculty_name = '%s %s'.format(record.first_name, record.last_name)
            else:
                faculty_name = '%s %s %s'.format(record.first_name, record.middle_name, record.last_name)
            info_dict = {
                'faculty_name' : faculty_name,
                'rank' : record.rank,
                'classification' : record.classification,
                'tenure' : record.tenure,
                'status': record.status
            }
            faculty_list.append(info_dict)
        
        return faculty_list, 200
        #return render_template(
        # '.html',
        # faculty_list
        # )
    except Exception as e:
        print(e)
        return 'An error has occured.', 500