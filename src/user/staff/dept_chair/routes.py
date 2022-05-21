import email

from sqlalchemy import null
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
from ..models import EducationalAttainment, FacultyPersonalInformation, ClerkPeronsalInformation
from ...auth.models import UserCredentials
from ..models import UnitHeadNominations

#External Functions
# from .functions.generate_educational_attaintment_id import generate_educational_attainment_id

dept_chair_blueprint = Blueprint('dept_chair_blueprint', __name__)

@login_manager.user_loader
def load_user(user_id):
	return UserCredentials.query.get(int(user_id))

@dept_chair_blueprint.route('/department_chair/dashboard', methods=['GET', 'POST'])
def load_dept_head_dashboard():
    return render_template('department_chair/department_chair_dashboard.html')

@dept_chair_blueprint.route('/department_chair/pending_approvals', methods=['GET', 'POST'])
def department_chair_pending_approvals():
    return render_template('department_chair/department_chair_pending_approvals.html')

@dept_chair_blueprint.route('/department_chair/role_assignment', methods=['GET', 'POST', 'DELETE', 'PUT'])
def department_chair_role_assignment():
    if request.method == 'GET':
        try:
            ### UNIT HEAD APPROVALS ###
            chem_nominee = None
            mcsu_nominee = None
            pgu_nominee = None

            unit_head_nominations = UnitHeadNominations.query.filter_by(status=True).all()

            for nominee in unit_head_nominations:
                curr_faculty = FacultyPersonalInformation.query.filter_by(user_id=nominee.nominated_unit_head).first()
                unit_head_info = FacultyPersonalInformation.query.filter_by(user_id=nominee.curr_unit_head).first()
                nominee.nominee_info = curr_faculty.__dict__
                nominee.unit_head_info = unit_head_info.__dict__
                
                if nominee.unit == 'cu':
                    chem_nominee = nominee
                if nominee.unit == 'mcsu':
                    mcsu_nominee = nominee
                if nominee.unit == 'pgu':
                    pgu_nominee = nominee
            ### END ###

            ### DEPT HEAD ASSIGNMENT ###
            department_faculty_list = (FacultyPersonalInformation
                .query
                .order_by(
                    FacultyPersonalInformation
                    .last_name
                    .asc()
                )
                .all()
            )
            ### END ###

            ### CLERK LIST ###
            clerk_list = (ClerkPeronsalInformation
                .query
                .order_by(
                    ClerkPeronsalInformation
                    .name
                    .asc()
                )
                .all()
            )
            ### END ###

            return render_template(
                'department_chair/department_chair_role_assignment.html',
                chem_nominee = chem_nominee,
                mcsu_nominee = mcsu_nominee,
                pgu_nominee = pgu_nominee,
                department_faculty_list = department_faculty_list,
                clerk_list = clerk_list
            ) 
        except Exception as e:
            print(e)
            return 'Error accessing role assignment page. Please try again.', 400
    elif request.method == 'POST':
        try:
            
            new_unit_head_form = request.form
            print(new_unit_head_form['nominated_unit_head'])
            print(new_unit_head_form['curr_unit_head'])
            unit_head_nominee = (UnitHeadNominations
                .query
                .filter_by(
                    nominated_unit_head=new_unit_head_form['nominated_unit_head'],
                    curr_unit_head=new_unit_head_form['curr_unit_head'],
                    status=True
                )
                .first()
            )
            print(unit_head_nominee)
            unit_head_nominee.status = False
            unit_head_nominee.approval_status = 'Approved'

            curr_unit_head = UserCredentials.query.filter_by(user_id=new_unit_head_form['curr_unit_head']).first()
            curr_unit_head.is_unit_head = False

            new_unit_head = UserCredentials.query.filter_by(user_id=new_unit_head_form['nominated_unit_head']).first()
            new_unit_head.is_unit_head = True

            db.session.commit()

            return 'Unit Head nominee successfully approved.', 200
        except Exception as e:
            print(e)
            return 'Error approving Unit Head nominee. Please try again.', 400
    elif request.method == 'DELETE':
        try:
            new_unit_head_form = request.form

            unit_head_nominee = (UnitHeadNominations
                .query
                .filter_by(
                    nominated_unit_head=new_unit_head_form['nominated_unit_head'],
                    curr_unit_head=new_unit_head_form['curr_unit_head'],
                    status=True
                )
                .first()
            )

            unit_head_nominee.status = False
            unit_head_nominee.approval_status = 'Rejected'
            unit_head_nominee.approver_remarks = new_unit_head_form['approver_remarks']

            db.session.commit()

            return 'Unit Head nominee successfully rejected.', 200
        except Exception as e:
            print(e)
            return 'Error rejecting Unit Head nominee. Please try again.', 400
    

@dept_chair_blueprint.route('/department_chair/role_assignment/dept_head', methods=['POST'])
def department_chair_role_assignment_dept_head():
    try:
        new_dept_head_form = request.form 

        curr_dept_head = UserCredentials.query.filter_by(user_id=current_user.user_id).first()
        curr_dept_head.is_dept_head = False

        new_dept_head = UserCredentials.query.filter_by(user_id=new_dept_head_form['new_dept_head']).first()

        if new_dept_head.is_unit_head is True:
            print('Error assigning new Department Head. Faculty is currently a Unit Head.')
            return 'Error assigning new Department Head. Faculty is currently a Unit Head.', 400
        else:
            new_dept_head.is_dept_head = True
            db.session.commit()
            logout_user()
            return redirect(url_for('auth_blueprint.logout'))
    except Exception as e:
        print(e)
        return 'Error assigning new Department Head. Please try again.', 400

@dept_chair_blueprint.route('/department_chair/role_assignment/clerk', methods=['GET', 'POST', 'DELETE', 'PUT'])
def department_chair_role_assignment_clerk():
    if request.method == 'POST':
        try:
            new_clerk_form = request.form
            print(new_clerk_form)
            new_clerk_record = UserCredentials(
                user_id = new_clerk_form['employee_id'],
                email = new_clerk_form['email_address'],
                role = 'clerk',
                date_created = date.today()
            )

            new_clerk_info = ClerkPeronsalInformation(
                user_id = new_clerk_form['employee_id'],
                name = new_clerk_form['name']
            )

            db.session.add(new_clerk_info)
            db.session.add(new_clerk_record)
            db.session.commit()

            return 'New clerk account successfully added.', 200
        except Exception as e:
            print(e)
            return 'Error adding new clerk account. Please try again.', 400
    if request.method == 'DELETE':
        try:
            clerk_data = request.form

            clerk_info = ClerkPeronsalInformation.query.filter_by(user_id=clerk_data['clerk_id']).first()
            clerk_record = UserCredentials.query.filter_by(user_id=clerk_data['clerk_id']).first()

            db.session.delete(clerk_info)
            db.session.delete(clerk_record)
            db.session.commit()
            return 'Clerk account successfully deleted.', 200
        except Exception as e:
            print(e)
            return 'Error deleting clerk account. Please try again.', 400

@dept_chair_blueprint.route('/department_chair/faculty_list', methods=['GET', 'POST'])
def department_chair_faculty_list():
    try:
        department_faculty_list = (FacultyPersonalInformation
            .query
            .order_by(
                FacultyPersonalInformation
                .last_name
                .asc()
            )
            .all()
        )

        cu_list = []
        pgu_list = []
        mcsu_list = []

        for faculty in department_faculty_list:
            if faculty.unit == 'cu':
                cu_list.append(faculty)
            elif faculty.unit == 'pgu':
                pgu_list.append(faculty)
            elif faculty.unit == 'mcsu':
                mcsu_list.append(faculty)

        return render_template(
            'department_chair/department_chair_faculty_list.html',
            cu_list = cu_list,
            pgu_list = pgu_list,
            mcsu_list = mcsu_list
        )
    except Exception as e:
        print(e)
        return 'Error accessing faculty list. Please try again', 400