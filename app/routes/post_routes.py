# app/routes/post_routes.py
from flask import Blueprint, request, jsonify
from app.models import Post
from app import db
from sqlalchemy import cast, String
from datetime import datetime

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/add_post', methods=['POST'])
def add_post():
    data = request.get_json()
    post = Post(
        title=data['title'],
        content=data['content'],
        status=data.get('status', 'pending')
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
            'views': p.views,
            'status': p.status,
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
