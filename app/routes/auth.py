# app/routes/auth.py
import os
from flask import Blueprint, render_template, request, redirect, url_for, session
from app.models import User
from werkzeug.security import check_password_hash

auth = Blueprint(
    'auth',
    __name__,
    template_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'templates')
)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if 'user' in session:
        return redirect(url_for('main.dashboard'))

    error = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            session['user'] = user.username
            return redirect(url_for('main.dashboard'))
        else:
            error = 'Username atau password salah'

    return render_template('login.html', error=error)

@auth.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('auth.login'))
