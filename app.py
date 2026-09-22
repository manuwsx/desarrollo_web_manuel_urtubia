from flask import Flask, request, render_template, redirect, url_for, session
#from utils.validations import validate_login_user, validate_register_user, validate_confession
from database import db
#from werkzeug.utils import secure_filename
#import hashlib
#import filetype
import os
from database.db import get_avistamientos

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    ultimos_avistamientos = get_avistamientos(limit=2)
    return render_template('index.html', avistamientos=ultimos_avistamientos)

if __name__ == '__main__':
    app.run(debug=True)