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
from ..models import FacultySETRecords
from ...auth.models import UserCredentials

clerk_blueprint = Blueprint('clerk_blueprint', __name__)

@login_manager.user_loader
def load_user(user_id):
    print('tangina')
    return UserCredentials.query.get(user_id)

import time
@clerk_blueprint.route('/clerk/create_faculty_account', methods=['GET', 'POST'])
def create_faculty_account():
    try:
        if request.method == 'GET':
            """    
            new_account_form = request.form
            
            new_faculty_account = FacultyPersonalInformation(
                user_id = '2018-00002',
            )
            db.session.add(new_faculty_account)
            db.session.commit() 
            """   
            return render_template('clerk/create_faculty_account.html')
        elif request.method == 'POST':
            new_account_form = request.form

            if UserCredentials.query.filter_by(user_id=new_account_form['faculty_id']).first() is not None:
                return 'User with entered Faculty ID already exists. Please check and try again.', 400        
    
            new_faculty_account = FacultyPersonalInformation(
                user_id             = new_account_form['faculty_id'],
                rank                = new_account_form['faculty_rank'],
                classification      = new_account_form['faculty_classification'],
                status              = new_account_form['faculty_status'],
                tenure              = new_account_form['faculty_tenure'],
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
                # created_by          = current_user.email
            )
            db.session.add(new_faculty_account)
            
            new_user_credentials = UserCredentials(
                user_id         = new_account_form['faculty_id'],
                email           = new_account_form['primary_email'],
                role            = 'faculty',
                date_created    = date.today()
            )
            db.session.add(new_user_credentials)
            db.session.commit()
            return 'Faculty Account Successfully Created.', 200
    except Exception as e:
        print(e)
        return 'Error creating faculty record. Please try again.', 400

@clerk_blueprint.route('/clerk/faculty_list', methods=['GET'])
def clerk_faculty_list():
    try:
        faculty_list = []
        faculty_records = FacultyPersonalInformation.query.all()

        for record in faculty_records:
            if record.middle_name is None:
                faculty_name = "{} {}".format(record.first_name, record.last_name)
            else:
                faculty_name = "{} {} {}".format(record.first_name, record.middle_name, record.last_name)
            info_dict = record.__dict__
            info_dict['faculty_name'] = faculty_name
            faculty_list.append(info_dict)
        
        #return faculty_list, 200
        return render_template(
            'clerk/faculty_list.html',
            faculty_list = faculty_list
        )
    except Exception as e:
        print(e)
        return 'An error has occured.', 500
    # return render_template('clerk/faculty_list.html')

@clerk_blueprint.route('/clerk/edit_information', methods=['POST'])
def clerk_edit_information():
    try:
        edit_form = request.form 

        faculty_information = FacultyPersonalInformation.query.filter_by(user_id=edit_form['user_id']).first()
        print(faculty_information.__dict__)
        faculty_information.rank = edit_form['faculty_rank']
        faculty_information.classification = edit_form['faculty_classification']
        faculty_information.tenure = edit_form['faculty_tenure']
        faculty_information.status = edit_form['faculty_status']
        print(faculty_information.__dict__)
        db.session.commit()

        return 'Faculty record successfully edited.'
    except Exception as e:
        print(e)
        return 'An error has occured.', 500
    # return render_template('clerk/faculty_list.html')

from pprint import pprint
@clerk_blueprint.route('/clerk/faculty_service_record/<user_id>', methods=['GET', 'PUT'])
def clerk_faculty_service_record(user_id):
    if request.method == 'GET':
        fsr_set_record = FacultySETRecords.query.filter_by(id=user_id).all()
        faculty_info = FacultyPersonalInformation.query.filter_by(user_id=user_id).first()

        if faculty_info.middle_name is None:
            faculty_name = "{} {}".format(faculty_info.first_name, faculty_info.last_name)
        else:
            faculty_name = "{} {} {}".format(faculty_info.first_name, faculty_info.middle_name, faculty_info.last_name)


        fsr_dict = {} # Keys = initial school year, Value = list of records within that year

        for record in fsr_set_record:
            if record.sy in fsr_dict:
                fsr_dict[record.sy].append(record.__dict__)
            else:
                fsr_dict[record.sy] = [record.__dict__]

        pprint(fsr_dict)

        return render_template(
            'clerk/faculty_service_record.html', 
            fsr_set_record = fsr_set_record,
            fsr_dict = fsr_dict,
            faculty_name = faculty_name
        )
    elif request.method == 'PUT':
        fsr_set_record = FacultySETRecords.query.filter_by(id=id).first()
        fsr_set_form = request.form

        fsr_set_record.course_code = fsr_set_form['name_exam'],
        fsr_set_record.section = fsr_set_form['section'],
        fsr_set_record.semester = fsr_set_form['semester'],
        fsr_set_record.sy = fsr_set_form['sy'],
        fsr_set_record.numbeer_students = fsr_set_form['number_students'],
        # fsr_set_record.course_code = fsr_set_form['name_exam'],
        # licensure_record.file = licensure_form['upload_file'],
        fsr_set_record.last_modified = date.today()
        db.session.commit()

        return 'FSR and SET Record Successfully Updated.', 200


# @clerk_blueprint.app_context_processor
# def inject():
#     print(current_user.__dict__)
#     return current_user.__dict__