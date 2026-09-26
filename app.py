from utils.validations import validar_registro_voluntario
from flask import Flask, request, render_template, redirect, url_for, session
from utils.validations import *
from database import db
#from werkzeug.utils import secure_filename
#import hashlib
#import filetype
import os
from database.db import get_avistamientos, get_comuna_id, register_voluntario

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    ultimos_avistamientos = get_avistamientos(limit=2) 
    return render_template('index.html', avistamientos=ultimos_avistamientos) #renderizar index con los 2 ultimos avistamientos

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST": #para registrar un usuario
        email = request.form.get("email")
        nombre_usuario = request.form.get("nombre_usuario")
        nombre_completo = request.form.get("nombre_completo")
        telefono = request.form.get("telefono")
        comuna = request.form.get("comuna")
        password = request.form.get("password")

        if validar_registro_voluntario(nombre_usuario, nombre_completo, email, telefono, password, comuna):
            comuna_id = get_comuna_id(comuna)
            status, msg = register_voluntario(nombre_usuario, nombre_completo, email, telefono, password, comuna_id)
            if status:
                return redirect(url_for('index', registro='exitoso'))
            else:
                return render_template('register.html', error=msg)
        else:
            return render_template('register.html', error="Datos inválidos.")
    return render_template('register.html') 

if __name__ == '__main__':
    app.run(debug=True)