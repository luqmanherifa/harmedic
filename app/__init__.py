from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)

    # Register semua blueprint dari app.routes
    from .routes import main, auth
    app.register_blueprint(main)
    app.register_blueprint(auth)

    return app
