# app/routes/post_routes.py
from flask import Blueprint, request, jsonify
from app.models import Post
from app import db
from sqlalchemy import cast, String
from datetime import datetime
import os
from werkzeug.utils import secure_filename
from flask import current_app
from flask import Blueprint, request, jsonify, session
from sqlalchemy.orm import joinedload
from app.models import Post, User

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/add_post', methods=['POST'])
def add_post():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401

    user_id = session['user_id']  # ← ambil id user dari session

    title = request.form.get('title')
    content = request.form.get('content')
    status = request.form.get('status', 'pending')
    image_file = request.files.get('image')
    image_filename = None

    if image_file and image_file.filename != '':
        image_filename = secure_filename(image_file.filename)
        upload_path = os.path.join('app', 'static', 'uploads', image_filename)
        image_file.save(upload_path)

    post = Post(
        title=title,
        content=content,
        image=image_filename,
        status=status,
        views=0,
        author_id=user_id  # ← inilah yang wajib
    )

    db.session.add(post)
    db.session.commit()

    return jsonify({'message': 'Post added successfully'})

@posts_bp.route('/get_posts')
def get_posts():
    posts = Post.query.all()
    return jsonify({
        'posts': [{
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'image': f"/static/uploads/{p.image}" if p.image else None,
            'views': p.views,
            'status': p.status,
            'author': p.author.username,
            'created_at': p.created_at.strftime('%Y-%m-%d %H:%M:%S')
        } for p in posts]
    })

@posts_bp.route('/update_post/<int:id>', methods=['PUT'])
def update_post(id):
    data = request.get_json()
    post = Post.query.get_or_404(id)
    post.title = data['title']
    post.content = data['content']
    post.status = data.get('status', post.status)
    db.session.commit()
    return jsonify({'message': 'Post updated successfully'})

@posts_bp.route('/delete_post/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'})

@posts_bp.route('/search_posts')
def search_posts():
    query = request.args.get('q', '', type=str)

    posts = (
        db.session.query(Post)
        .join(User)
        .filter(
            (Post.title.ilike(f"%{query}%")) |
            (Post.content.ilike(f"%{query}%")) |
            (Post.status.ilike(f"%{query}%")) |
            (cast(Post.views, String).ilike(f"%{query}%")) |
            (cast(Post.created_at, String).ilike(f"%{query}%")) |
            (User.username.ilike(f"%{query}%"))  # ← Tambahkan filter author
        )
        .options(joinedload(Post.author))  # untuk menghindari N+1
        .all()
    )

    return jsonify({
        'posts': [{
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'views': p.views,
            'status': p.status,
            'created_at': p.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'author': p.author.username,
            'image': f'/static/uploads/{p.image}' if p.image else None
        } for p in posts]
    })