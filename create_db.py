from app import create_app, db
from app.models import Post

app = create_app()

with app.app_context():
    db.create_all()
    print("Table has been successfully created in the database.")

