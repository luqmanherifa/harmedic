from datetime import datetime
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from sqlalchemy import Enum

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255))
    views = db.Column(db.Integer, default=0)
    status = db.Column(db.Enum('pending', 'approved', 'rejected', name='post_status'), default='pending', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    author = relationship('User', backref='posts')

    def __repr__(self):
        return f'<Post {self.title}>'

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(
        Enum('admin', 'author', 'visitor', name='user_roles'),
        default='visitor',
        nullable=False
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        """Hash dan simpan password"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Cek apakah password cocok dengan hash"""
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'
