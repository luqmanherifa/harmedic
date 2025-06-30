import os
from datetime import datetime

from flask import Blueprint, request, jsonify, session, current_app
from werkzeug.utils import secure_filename
from sqlalchemy import cast, String
from sqlalchemy.orm import joinedload

from app import db
from app.models import Post, User

posts_bp = Blueprint('posts', __name__)

# Route Create
@posts_bp.route('/add_post', methods=['POST'])
def add_post():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401

    user_id = session['user_id']

    title = request.form.get('title')
    content = request.form.get('content')
    status = request.form.get('status', 'pending')
    image_file = request.files.get('image')
    image_filename = None

    # Save uploaded image file
    if image_file and image_file.filename != '':
        image_filename = secure_filename(image_file.filename)
        upload_path = os.path.join('app', 'static', 'uploads', image_filename)
        image_file.save(upload_path)

    # Create new post instance
    post = Post(
        title=title,
        content=content,
        image=image_filename,
        status=status,
        views=0,
        author_id=user_id
    )

    db.session.add(post)
    db.session.commit()

    return jsonify({'message': 'Post added successfully'})

# Route Read
@posts_bp.route('/get_posts')
def get_posts():
    role = session.get('role')
    user_id = session.get('user_id')

    # Filter by author role
    if role == 'author':
        posts = Post.query.filter_by(author_id=user_id).all()
    else:
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

# Route Search
@posts_bp.route('/search_posts')
def search_posts():
    query = request.args.get('q', '', type=str)
    role = session.get('role')
    user_id = session.get('user_id')

    posts_query = db.session.query(Post)

    # Restrict author search scope
    if role == 'author':
        posts_query = posts_query.filter(Post.author_id == user_id)

    # Search multiple post fields
    posts = (
        posts_query
        .filter(
            (Post.title.ilike(f"%{query}%")) |
            (Post.content.ilike(f"%{query}%")) |
            (Post.status.ilike(f"%{query}%")) |
            (cast(Post.views, String).ilike(f"%{query}%")) |
            (cast(Post.created_at, String).ilike(f"%{query}%"))
        )
        .options(joinedload(Post.author))
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

# Route Update
@posts_bp.route('/update_post/<int:id>', methods=['PUT'])
def update_post(id):
    data = request.get_json()
    post = Post.query.get_or_404(id)
    
    # Update editable fields
    post.title = data['title']
    post.content = data['content']
    post.status = data.get('status', post.status)
    
    db.session.commit()
    return jsonify({'message': 'Post updated successfully'})

# Route Delete
@posts_bp.route('/delete_post/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get_or_404(id)
    
    # Delete post permanently
    db.session.delete(post)
    db.session.commit()
    
    return jsonify({'message': 'Post deleted successfully'})
