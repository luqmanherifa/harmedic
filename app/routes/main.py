import os
from flask import Blueprint, render_template, request, jsonify
from flask import session, redirect, url_for
from app.models import User
from app import db

# Blueprint dengan template_folder eksplisit
main = Blueprint(
    'main',
    __name__,
    template_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'templates'))
)


@main.route('/')
def index():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
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

@main.route('/update_user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.name = data['name']
    user.email = data['email']
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@main.route('/delete_user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

@main.route('/search_users')
def search_users():
    query = request.args.get('q', '', type=str)
    users = User.query.filter(
        (User.name.ilike(f"%{query}%")) | (User.email.ilike(f"%{query}%"))
    ).all()
    return jsonify({
        'users': [{'id': u.id, 'name': u.name, 'email': u.email} for u in users]
    })
