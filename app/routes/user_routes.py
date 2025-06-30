from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify

from app import db
from app.models import User

users_bp = Blueprint('users', __name__)

# Route Register
@users_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        # Check username/email duplicate
        if User.query.filter((User.username == username) | (User.email == email)).first():
            return render_template('register.html', error="Username atau email sudah digunakan")

        # Create new user
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return redirect(url_for('auth.login'))

    return render_template('register.html')

# Route Read
@users_bp.route('/get_users')
def get_users():
    # Fetch all users
    users = User.query.all()
    return jsonify({
        'users': [
            {
                'id': u.id,
                'username': u.username,
                'email': u.email,
                'role': u.role,
                'created_at': u.created_at.strftime('%Y-%m-%d %H:%M:%S')
            } for u in users
        ]
    })

# Route Search
@users_bp.route('/search_users')
def search_users():
    query = request.args.get('q', '', type=str)
    
    # Search by username/email
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
                'role': u.role, 
                'created_at': u.created_at.strftime('%Y-%m-%d %H:%M:%S')
            } for u in users
        ]
    })

# Route Update
@users_bp.route('/update_user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    
    # Update user fields
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    
    # Update user role
    if 'role' in data:
        user.role = data['role']
        
        # Sync session role
        if session.get('user_id') == user.id:
            session['role'] = user.role

    db.session.commit()
    return jsonify({'message': 'User updated successfully.'})

# Route Delete
@users_bp.route('/delete_user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    
    # Delete user permanently
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'message': 'User deleted successfully.'})