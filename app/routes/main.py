import os
from flask import Blueprint, render_template, request, jsonify
from flask import session, redirect, url_for
from datetime import datetime
from app.models import Post
from app import db
from sqlalchemy import cast, String

main = Blueprint(
    'main',
    __name__,
    template_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'templates'))
)

@main.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template('dashboard.html')

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
