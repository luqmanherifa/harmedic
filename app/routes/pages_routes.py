# app/routes/pages_routes.py
import os
from flask import Blueprint, render_template, redirect, url_for, session, request, jsonify
from app.models import Post
from app import db

pages = Blueprint(
    'pages',
    __name__,
    template_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'templates'))
)

@pages.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template('dashboard.html')

@pages.route('/user')
def user():
    if 'user' not in session or session.get('role') != 'admin':
        return redirect(url_for('auth.login'))
    return render_template('user.html')

@pages.route('/')
def home():
    posts = Post.query.filter_by(status='approved').all()
    return render_template('home.html', posts=posts)

@pages.route('/post/<int:id>')
def post_detail(id):
    post = Post.query.get_or_404(id)
    if 'user' in session:
        post.views += 1
        db.session.commit()
    return render_template('post_detail.html', post=post)

@pages.route('/search_home_posts')
def search_home_posts():
    query = request.args.get('q', '', type=str)
    posts = Post.query.filter(
        Post.status == 'approved',
        (Post.title.ilike(f'%{query}%')) | (Post.content.ilike(f'%{query}%'))
    ).order_by(Post.created_at.desc()).all()

    return jsonify({
        "posts": [
            {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "created_at": post.created_at.strftime('%B %d, %Y'),
                "views": post.views,
                "image": post.image,
                "author": post.author.username if post.author else "Unknown",
            }
            for post in posts
        ]
    })