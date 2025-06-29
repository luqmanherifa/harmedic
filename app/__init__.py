from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)

    # Register semua blueprint
    from .routes.pages_routes import pages
    from .routes.post_routes import posts_bp
    from .routes.user_routes import users_bp
    from .routes.auth import auth  # auth tetap seperti semula

    app.register_blueprint(pages)
    app.register_blueprint(posts_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(auth)

    return app
