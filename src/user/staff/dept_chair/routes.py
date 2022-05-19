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

dept_chair_blueprint = Blueprint('dept_chair_blueprint', __name__)

@login_manager.user_loader
def load_user(user_id):
	return UserCredentials.query.get(int(user_id))

@dept_chair_blueprint.route('/department_chair/pending_approvals', methods=['GET', 'POST'])
def department_chair_pending_approvals():
    return render_template('department_chair/department_chair_pending_approvals.html')

@dept_chair_blueprint.route('/department_chair/role_assignment', methods=['GET', 'POST'])
def department_chair_role_assignment():
    return render_template('department_chair/department_chair_role_assignment.html')

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