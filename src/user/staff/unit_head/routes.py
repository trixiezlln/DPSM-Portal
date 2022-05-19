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
from ..models import EducationalAttainment, FacultyPersonalInformation
from ...auth.models import UserCredentials
from ..models import UnitHeadNominations

#External Functions
# from .functions.generate_educational_attaintment_id import generate_educational_attainment_id

unit_head_blueprint = Blueprint('unit_head_blueprint', __name__)

@login_manager.user_loader
def load_user(user_id):
	return UserCredentials.query.get(int(user_id))

@unit_head_blueprint.route('/unit_head/faculty_list', methods=['GET', 'POST'])
def load_unit_head_faculty_list():
    unit_faculty_list = (FacultyPersonalInformation
        .query
        .filter_by(
            unit=current_user.unit
        )
        .order_by(
            FacultyPersonalInformation
            .last_name
            .asc()
        )
        .all()
    )

    return render_template(
        'unit_head/unit_head_faculty_list.html',
        unit_faculty_list = unit_faculty_list
    )

@unit_head_blueprint.route('/unit_head/role_assignment', methods=['GET', 'POST', 'DELETE'])
def load_unit_head_role_assignment():
    if request.method == 'GET':
        try:
            unit_faculty_list = FacultyPersonalInformation.query.filter_by(unit=current_user.unit).all()
            unit_head_nominations = (UnitHeadNominations.query
                .filter_by(curr_unit_head=current_user.user_id)
                .order_by(UnitHeadNominations.id.desc())
                .all()
            )

            for nominee in unit_head_nominations:
                curr_faculty = FacultyPersonalInformation.query.filter_by(user_id=nominee.nominated_unit_head).first()
                nominee.nominee_info = curr_faculty.__dict__

            return render_template(
                'unit_head/unit_head_role_assignment.html',
                unit_faculty_list = unit_faculty_list,
                unit_head_nominations = unit_head_nominations
            )
        except Exception as e:
            print(e)
            return 'Error loading Unit Head Role Assignment Page. Please try again.', 400
    elif request.method == 'POST':
        try:

            unit_head_nominations = UnitHeadNominations.query.filter_by(curr_unit_head=current_user.user_id).all()
            for nomination in unit_head_nominations:
                if nomination.status is True:
                    return "Failed to nominate new Unit Head. Existing pending approval was found. \
                    Please wait for the Department Chair's feedback.", 400

            new_unit_head_form = request.form
            
            new_unit_head = UnitHeadNominations(
                curr_unit_head              = current_user.user_id,
                nominated_unit_head         = new_unit_head_form['new_unit_head'],
                approval_status             = 'Pending',
            )

            db.session.add(new_unit_head)
            db.session.commit()

            return 'New Unit Head successfully nominated.', 200
        except Exception as e:
            print(e)
            return 'Error nominating new Unit Head. Please try again.', 400
    elif request.method == 'DELETE':
        try:
            new_unit_head_form = request.form
            
            unit_head_nomination = UnitHeadNominations.query.filter_by(
                curr_unit_head=current_user.user_id, 
                nominated_unit_head=new_unit_head_form['nominated_unit_head'],
                status = True
            ).first()

            db.session.delete(unit_head_nomination)
            db.session.commit()

            return 'Unit Head nominee successfully deleted.', 200
        except Exception as e:
            print(e)
            return 'Error deleting Unit Head nominee. Please try again.', 400

@unit_head_blueprint.route('/unit_head/pending_approvals', methods=['GET', 'POST'])
def load_unit_head_pending_approvals():
    return render_template('unit_head/unit_head_updated_information.html')

@unit_head_blueprint.route('/unit_head/dashboard', methods=['GET', 'POST'])
def load_unit_head_dashboard():
    return render_template('unit_head/unit_head_dashboard.html')

@unit_head_blueprint.route('/unit_head/department_chair_role_assignment', methods=['GET', 'POST'])
def load_department_chair_role_assignment():
    return render_template('unit_head/department_chair_role_assignment.html')

# def add_educational_attainment():
#     try:
#         if request.method == 'GET':
#             #pass
#             return render_template('unit_head/unit_head_faculty_list.html')
#         elif request.method == 'POST':
#             educational_attainment_form = request.form
#             educational_attainment_record = None
#             while educational_attainment_record is None:
#                 id = generate_educational_attainment_id()
#                 educational_attainment_record = EducationalAttainment.query.filter_by(id=id).first()

#             new_record = EducationalAttainment(
#                 id                  = id,
#                 user_id             = current_user.user_id,
#                 school              = educational_attainment_form['school'],
#                 degree              = educational_attainment_form['degree'],
#                 specialization      = educational_attainment_form['specialization'],
#                 degree_type         = educational_attainment_form['degree_type'],
#                 start_date          = educational_attainment_form['start_date'],
#                 end_date            = educational_attainment_form['end_date'],
#                 last_modified       = date.today()
#             )
#             db.session.add(new_record)
#             db.session.commit()

#             return 'Educational Attainment Record Successfully Added.', 200
#     except Exception as e:
#         print(e)
#         return 'An error has occured.', 500

# @faculty_blueprint.route('/faculty/update_educational_attainment/<string:id>', methods=['GET', 'PUT'])
# def update_educational_attainment(id):
#     try:
#         if request.method == 'GET':
#             educational_attainment_record = EducationalAttainment.query.filter_by(id=id).first()
#             #return render_template(
#             # '.html',
#             # educational_attainment_record
#             # )
#         elif request.method == 'PUT':
#             educational_attainment_record = EducationalAttainment.query.filter_by(id=id).first()
#             educational_attainment_form = request.form

#             educational_attainment_record.school = educational_attainment_form['school'],
#             educational_attainment_record.degree = educational_attainment_form['degree'],
#             educational_attainment_record.specialization = educational_attainment_form['specialization'],
#             educational_attainment_record.degree_type = educational_attainment_form['degree_type'],
#             educational_attainment_record.start_date = educational_attainment_form['start_date'],
#             educational_attainment_record.end_date = educational_attainment_form['end_date'],
#             educational_attainment_record.last_modified = date.today()
#             db.session.commit()

#             return 'Educational Attainment Record Successfully Updated.', 200
#     except Exception as e:
#         print(e)
#         return 'An error has occured.', 500