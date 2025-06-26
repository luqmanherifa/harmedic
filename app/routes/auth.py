# app/routes/auth.py
from flask import Blueprint, render_template, request, redirect, url_for, session, flash
import os

auth = Blueprint(
    'auth',
    __name__,
    template_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'templates')
)

# Hardcoded demo user
VALID_USER = {
    'username': 'admin',
    'password': 'admin123'
}

@auth.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == VALID_USER['username'] and password == VALID_USER['password']:
            session['user'] = username
            return redirect(url_for('main.index'))
        else:
            error = 'Invalid credentials'
    return render_template('login.html', error=error)

@auth.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('auth.login'))
