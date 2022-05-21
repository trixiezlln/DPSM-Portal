from flask import url_for, flash, redirect, abort
from flask_login import current_user
from functools import wraps

def role_authenticator_decorator(allowed_roles, special_role):
    def role_authenticator(func):
        @wraps(func)
        def authentication_logic(*args, **kwargs):
            print(current_user)
            if current_user.role in allowed_roles:
                if current_user.role == 'faculty':
                    if current_user.is_unit_head is True and special_role == 'unit_head':
                        return func(*args, **kwargs)
                    elif current_user.is_dept_head is True and special_role == 'dept_head':
                        return func(*args, **kwargs)
                    else:
                        if special_role is None:
                            return func(*args, **kwargs)
                else:
                    return func(*args, **kwargs)
            else:
                # flash("You do not have the necessary permissions to access this page.")
                # return redirect(url_for('auth_blueprint.login'))
                abort(403)

        return authentication_logic
    return role_authenticator