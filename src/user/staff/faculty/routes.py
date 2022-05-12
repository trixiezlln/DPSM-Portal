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
from ..models import WorkExperience, EducationalAttainment, FacultyPersonalInformation
from ...auth.models import UserCredentials

#External Functions
from .functions.generate_educational_attaintment_id import generate_educational_attainment_id
from .functions.generate_work_experience_id import generate_work_experience_id

faculty_blueprint = Blueprint('faculty_blueprint', __name__)

@login_manager.user_loader
def load_user(user_id):
	return UserCredentials.query.get(user_id)

@faculty_blueprint.route('/faculty/add_educational_attainment', methods=['GET', 'POST'])
def add_educational_attainment():
    try:
        if request.method == 'GET':
            #pass
            return render_template('faculty/add_info.html')
        elif request.method == 'POST':
            educational_attainment_form = request.form
            educational_attainment_record = None
            while educational_attainment_record is None:
                id = generate_educational_attainment_id()
                new_record = EducationalAttainment(
                    id                  = id,
                    user_id             = current_user.user_id,
                    # user_id             = educational_attainment_form['user_id'],
                    school              = educational_attainment_form['school'],
                    degree              = educational_attainment_form['degree'],
                    specialization      = educational_attainment_form['specialization'],
                    degree_type         = educational_attainment_form['degree_type'],
                    start_date          = educational_attainment_form['start_date'],
                    end_date            = educational_attainment_form['end_date'],
                    last_modified       = date.today()
                )
                db.session.add(new_record)
                db.session.commit()
                educational_attainment_record = EducationalAttainment.query.filter_by(id=id).first()
            return 'Educational Attainment Record Successfully Added.', 200
    except Exception as e:
        print(e)
        return e, 500

@faculty_blueprint.route('/faculty/update_educational_attainment/<string:id>', methods=['GET', 'PUT'])
def update_educational_attainment(id):
    try:
        if request.method == 'GET':
            educational_attainment_record = EducationalAttainment.query.filter_by(id=id).first()
            #return render_template(
            # '.html',
            # educational_attainment_record
            # )
        elif request.method == 'PUT':
            educational_attainment_record = EducationalAttainment.query.filter_by(id=id).first()
            educational_attainment_form = request.form

            educational_attainment_record.school = educational_attainment_form['school'],
            educational_attainment_record.degree = educational_attainment_form['degree'],
            educational_attainment_record.specialization = educational_attainment_form['specialization'],
            educational_attainment_record.degree_type = educational_attainment_form['degree_type'],
            educational_attainment_record.start_date = educational_attainment_form['start_date'],
            educational_attainment_record.end_date = educational_attainment_form['end_date'],
            educational_attainment_record.last_modified = date.today()
            db.session.commit()

            return 'Educational Attainment Record Successfully Updated.', 200
    except Exception as e:
        print(e)
        return 'An error has occured.', 

@faculty_blueprint.route('/faculty/add_work_experience', methods=['GET', 'POST'])
def add_work_experience():
    try:
        if request.method == 'GET':
            #pass
            return render_template('faculty/add_info.html')
        elif request.method == 'POST':
            work_experience_form = request.form
            work_experience_record = None
            while work_experience_record is None:
                id = generate_work_experience_id()
                new_record = WorkExperience(
                    id                  = id,
                    user_id             = current_user.user_id,
                    location            = work_experience_form['location'],
                    name_employer       = work_experience_form['name_employer'],
                    title               = work_experience_form['title'],
                    description         = work_experience_form['description'],
                    start_date          = work_experience_form['start_date'],
                    end_date            = work_experience_form['end_date'],
                    last_modified       = date.today()
                )
                db.session.add(new_record)
                db.session.commit()
                work_experience_record = WorkExperience.query.filter_by(id=id).first()
            return 'Work Experience Record Successfully Added.', 200
    except Exception as e:
        print(e)
        return e, 500
