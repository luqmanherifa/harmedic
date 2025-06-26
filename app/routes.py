from flask import Blueprint, render_template
import os
from flask import request, jsonify
from app.models import User
from app import db

# Cari folder templates dari root project
main = Blueprint(
    'main',
    __name__,
    template_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'templates')
)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    user = User(name=data['name'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'})

@main.route('/get_users')
def get_users():
    users = User.query.all()
    return jsonify({'users': [
        {'id': u.id, 'name': u.name, 'email': u.email} for u in users
    ]})