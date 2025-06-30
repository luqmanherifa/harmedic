import os

from flask import Blueprint, render_template, request, redirect, url_for, session
from werkzeug.security import check_password_hash

from app.models import User

auth_bp = Blueprint(
    'auth',
    __name__,
    template_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'templates')
)

# Route Login
@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if 'user' in session:
        return redirect(url_for('pages.dashboard'))

    error = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            session['user'] = user.username
            session['user_id'] = user.id
            session['role'] = user.role
            return redirect(url_for('pages.dashboard'))
        else:
            error = 'Username atau password salah'

    return render_template('login.html', error=error)

# Route Logout
@auth_bp.route('/logout')
def logout():
    session.pop('user', None)
    session.pop('user_id', None)
    session.pop('role', None)
    return redirect(url_for('auth.login'))
