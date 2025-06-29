import os
from flask import Blueprint, render_template, request, jsonify
from flask import session, redirect, url_for
from datetime import datetime
from app.models import Post, User
from app import db
from sqlalchemy import cast, String
from werkzeug.security import generate_password_hash

main = Blueprint(
    'main',
    __name__,
    template_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'templates'))
)

@main.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        # Validasi: pastikan tidak duplikat username/email
        if User.query.filter((User.username == username) | (User.email == email)).first():
            return render_template('register.html', error="Username atau email sudah digunakan")

        # Simpan user baru
        user = User(username=username, email=email)
        user.set_password(password)  # hash password menggunakan method di model
        db.session.add(user)
        db.session.commit()

        return redirect(url_for('auth.login'))  # arahkan ke login setelah sukses

    return render_template('register.html')

@main.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template('dashboard.html')

@main.route('/user')
def user():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template('user.html')

@main.route('/add_post', methods=['POST'])
def add_post():
    data = request.get_json()
    post = Post(
        title=data['title'],
        content=data['content'],
        status=data.get('status', 'pending')  # opsional bisa dikontrol dari frontend
    )
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post added successfully'})

@main.route('/get_posts')
def get_posts():
    posts = Post.query.all()
    return jsonify({
        'posts': [{
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'views': p.views,
            'status': p.status,
            'created_at': p.created_at.strftime('%Y-%m-%d %H:%M:%S')
        } for p in posts]
    })

@main.route('/get_users')
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
    
@main.route('/update_user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)

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

@main.route('/update_post/<int:id>', methods=['PUT'])
def update_post(id):
    data = request.get_json()
    post = Post.query.get_or_404(id)
    post.title = data['title']
    post.content = data['content']
    post.status = data.get('status', post.status)  # jika status dikirim, update
    db.session.commit()
    return jsonify({'message': 'Post updated successfully'})

@main.route('/delete_post/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'})

@main.route('/search_posts')
def search_posts():
    query = request.args.get('q', '', type=str)
    posts = Post.query.filter(
        (Post.title.ilike(f"%{query}%")) |
        (Post.content.ilike(f"%{query}%")) |
        (Post.status.ilike(f"%{query}%")) |
        (cast(Post.views, String).ilike(f"%{query}%")) |
        (cast(Post.created_at, String).ilike(f"%{query}%"))
    ).all()
    
    return jsonify({
        'posts': [{
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'views': p.views,
            'status': p.status,
            'created_at': p.created_at.strftime('%Y-%m-%d %H:%M:%S')
        } for p in posts]
    })

@main.route('/')
def home():
    posts = Post.query.filter_by(status='approved').all()  # hanya post yang approved tampil di home
    return render_template('home.html', posts=posts)

@main.route('/post/<int:id>')
def post_detail(id):
    post = Post.query.get_or_404(id)

    # Tambah view count saat dibuka
    post.views += 1
    db.session.commit()

    return render_template('post_detail.html', post=post)
