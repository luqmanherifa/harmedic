import os
from flask import Blueprint, render_template, request, jsonify
from flask import session, redirect, url_for
from app.models import Post
from app import db

# Blueprint dengan template_folder eksplisit
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
    post = Post(title=data['title'], content=data['content'])
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post added successfully'})

@main.route('/get_posts')
def get_posts():
    posts = Post.query.all()
    return jsonify({'posts': [
        {'id': u.id, 'title': u.title, 'content': u.content} for u in posts
    ]})

@main.route('/update_post/<int:id>', methods=['PUT'])
def update_post(id):
    data = request.get_json()
    post = Post.query.get_or_404(id)
    post.title = data['title']
    post.content = data['content']
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
        (Post.title.ilike(f"%{query}%")) | (Post.content.ilike(f"%{query}%"))
    ).all()
    return jsonify({
        'posts': [{'id': u.id, 'title': u.title, 'content': u.content} for u in posts]
    })

@main.route('/')
def home():
    posts = Post.query.all()
    return render_template('home.html', posts=posts)


@main.route('/post/<int:id>')
def post_detail(id):
    post = Post.query.get_or_404(id)
    return render_template('post_detail.html', post=post)
