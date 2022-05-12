import email
from sched import scheduler
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
from ..models import EducationalAttainment, FacultyPersonalInformation, FacultySETRecords, LicensureExams, TrainingSeminar
from ...auth.models import UserCredentials

#External Functions
# from .functions.generate_educational_attaintment_id import generate_educational_attainment_id
from .functions.generate_ids import *

faculty_blueprint = Blueprint('faculty_blueprint', __name__)

@login_manager.user_loader
def load_user(user_id):
	return UserCredentials.query.get(user_id)

@faculty_blueprint.route('/faculty/add_educational_attainment', methods=['GET', 'POST'])
def add_educational_attainment():
    try:
        if request.method == 'GET':
            #pass
            return render_template('faculty/add_educational.html')
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
        return 'An error has occured.', 500

@faculty_blueprint.route('/faculty/add_licensure', methods=['GET', 'POST'])
def add_licensure():
    try:
        if request.method == 'GET':
            #pass
            return render_template('faculty/add_licensure.html')
        elif request.method == 'POST':
            licensure_form = request.form
            licensure_record = None
            while licensure_record is None:
                id = generate_licensure_exam_id()
                new_record = LicensureExams(
                    id                  = id,
                    user_id             = current_user.user_id,
                    name_exam           = licensure_form['name_exam'],
                    rank                = licensure_form['rank'],
                    license_number      = licensure_form['license_number'],
                    date                = licensure_form['date'],
                    licensure_file      = licensure_form['upload_file'].read(),
                    last_modified       = date.today()
                )
                db.session.add(new_record)
                db.session.commit()
                licensure_record = LicensureExams.query.filter_by(id=id).first()
            return 'Licensure Exam Successfully Added.', 200
    except Exception as e:
        print(e)
        return e, 500

@faculty_blueprint.route('/faculty/update_licensure_exam/<string:id>', methods=['GET', 'PUT'])
def update_licensure_exam(id):
    try:
        if request.method == 'GET':
            licensure_record = LicensureExams.query.filter_by(id=id).first()
            #return render_template(
            # '.html',
            # educational_attainment_record
            # )
        elif request.method == 'PUT':
            licensure_record = LicensureExams.query.filter_by(id=id).first()
            licensure_form = request.form

            licensure_record.name_exam = licensure_form['name_exam'],
            licensure_record.rank = licensure_form['rank'],
            licensure_record.license_numbeer = licensure_form['license_number'],
            licensure_record.date = licensure_form['date'],
            # licensure_record.file = licensure_form['upload_file'],
            licensure_record.last_modified = date.today()
            db.session.commit()

            return 'Licensure Exam Record Successfully Updated.', 200
    except Exception as e:
        print(e)
        return 'An error has occured.', 500

@faculty_blueprint.route('/faculty/add_training', methods=['GET', 'POST'])
def add_training():
    try:
        if request.method == 'GET':
            #pass
            return render_template('faculty/add_training.html')
        elif request.method == 'POST':
            training_form = request.form
            training_record = None
            while training_record is None:
                id = generate_training_id()
                new_record = TrainingSeminar(
                    id                  = id,
                    user_id             = current_user.user_id,
                    name_training       = training_form['name_training'],
                    role                = training_form['role'],
                    remarks             = training_form['remarks'],
                    start_date          = training_form['start_date'],
                    end_date            = training_form['end_date'],
                    # proof               = licensure_form['upload_file'],
                    last_modified       = date.today()
                )
                db.session.add(new_record)
                db.session.commit()
                licensure_record = TrainingSeminar.query.filter_by(id=id).first()
            return 'Training/Seminar Successfully Added.', 200
    except Exception as e:
        print(e)
        return e, 500

@faculty_blueprint.route('/faculty/update_training/<string:id>', methods=['GET', 'PUT'])
def update_training(id):
    try:
        if request.method == 'GET':
            training_record = TrainingSeminar.query.filter_by(id=id).first()
            #return render_template(
            # '.html',
            # educational_attainment_record
            # )
        elif request.method == 'PUT':
            training_record = TrainingSeminar.query.filter_by(id=id).first()
            training_form = request.form

            training_record.name_training = training_form['name_training'],
            training_record.role = training_form['role'],
            training_record.remarks = training_form['remarks'],
            training_record.start_date = training_form['start_date'],
            training_record.end_date = training_form['end_date'],
            # licensure_record.file = licensure_form['upload_file'],
            training_record.last_modified = date.today()
            db.session.commit()

            return 'Training/Seminar Record Successfully Updated.', 200
    except Exception as e:
        print(e)
        return 'An error has occured.', 500

@faculty_blueprint.route('/faculty/add_fsr_set', methods=['GET', 'POST'])
def add_fsr_set():
    try:
        if request.method == 'GET':
            #pass
            return render_template('faculty/add_fsr_set.html')
        elif request.method == 'POST':
            fsr_set_form = request.form
            fsr_set_record = None
            while fsr_set_record is None:
                id = generate_fsr_set_id()
                new_record = LicensureExams(
                    id                  = id,
                    user_id             = current_user.user_id,
                    course_code         = fsr_set_form['course_code'],
                    section             = fsr_set_form['section'],
                    semester            = fsr_set_form['semester'],
                    sy                  = fsr_set_form['sy'],
                    scheduler           = fsr_set_form['schedule'],
                    number_students     = fsr_set_form['number_students'],
                    # fsr_file           = fsr_set_form['upload_file'],
                    # set               = licensure_form['upload_file'],
                    last_modified       = date.today()
                )
                db.session.add(new_record)
                db.session.commit()
                fsr_set_record = FacultySETRecords.query.filter_by(id=id).first()
            return 'FSR and SET Successfully Added.', 200
    except Exception as e:
        print(e)
        return e, 500

@faculty_blueprint.route('/faculty/update_fsr_set/<string:id>', methods=['GET', 'PUT'])
def update_fsr_set(id):
    try:
        if request.method == 'GET':
            fsr_set_record = FacultySETRecords.query.filter_by(id=id).first()
            #return render_template(
            # '.html',
            # educational_attainment_record
            # )
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
    except Exception as e:
        print(e)
        return 'An error has occured.', 500
