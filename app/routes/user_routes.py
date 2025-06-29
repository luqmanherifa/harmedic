# app/routes/user_routes.py
from flask import Blueprint, request, jsonify, render_template, redirect, url_for, session
from app.models import User
from app import db

users_bp = Blueprint('users', __name__)

@users_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if User.query.filter((User.username == username) | (User.email == email)).first():
            return render_template('register.html', error="Username atau email sudah digunakan")

        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return redirect(url_for('auth.login'))

    return render_template('register.html')

@users_bp.route('/get_users')
def get_users():
    users = User.query.all()
    return jsonify({
        'users': [
            {
                'id': u.id,
                'username': u.username,
                'email': u.email,
                'created_at': u.created_at.strftime('%Y-%m-%d %H:%M:%S')
            } for u in users
        ]
    })

@users_bp.route('/update_user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@users_bp.route('/delete_user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

@users_bp.route('/search_users')
def search_users():
    query = request.args.get('q', '', type=str)
    users = User.query.filter(
        (User.username.like(f"%{query}%")) |
        (User.email.like(f"%{query}%"))
    ).all()
    return jsonify({
        'users': [
            {
                'id': u.id,
                'username': u.username,
                'email': u.email,
                'created_at': u.created_at.strftime('%Y-%m-%d %H:%M:%S')
            } for u in users
        ]
    })
