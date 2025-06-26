from flask import Blueprint, render_template
import os

# Cari folder templates dari root project
main = Blueprint(
    'main',
    __name__,
    template_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'templates')
)

@main.route('/')
def index():
    return render_template('index.html')
