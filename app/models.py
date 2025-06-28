from datetime import datetime
from app import db

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    views = db.Column(db.Integer, default=0)
    status = db.Column(db.Enum('pending', 'approved', 'rejected', name='post_status'), default='pending', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Post {self.title}>'
