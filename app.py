from flask import Flask, request, render_template, redirect, url_for, session
from utils.validations import *
from database import db
#from werkzeug.utils import secure_filename
#import hashlib
#import filetype
import os
from database.db import get_avistamientos, get_comuna_id, register_voluntario, register_avistamiento, get_aves, get_avistamientos_filtrados, get_avistamiento_by_id
import math

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024 #tamaño maximo de archivos subidos 10MB

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    ultimos_avistamientos = get_avistamientos(limit=2) 
    return render_template('index.html', avistamientos=ultimos_avistamientos) #renderizar index con los 2 ultimos avistamientos

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST": # para registrar un usuario
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
                return render_template('register.html', exito=True, username=nombre_usuario)
            else:
                return render_template('register.html', error=msg)
        else:
            return render_template('register.html', error="Datos inválidos.")
    return render_template('register.html') 

@app.route("/inform", methods=["GET", "POST"])
def inform():
    aves = get_aves()
    if request.method == "POST": # para registrar un avistamiento
        username = request.form.get("username")
        password = request.form.get("password")
        ave_id = request.form.get("ave_id")
        tipo_ave = request.form.get("tipo_ave")
        comuna = request.form.get("comuna")
        fecha_hora = request.form.get("fecha")
        lugar = request.form.get("lugar")
        media = request.files.getlist("media")
        
        valido, msg_validacion = validar_registro_avistamiento(username, password, ave_id, tipo_ave, comuna, fecha_hora, lugar, media)
        if valido:
            comuna_id = get_comuna_id(comuna)
            status, msg = register_avistamiento(username, password, ave_id, tipo_ave, comuna_id, fecha_hora, lugar, media)
            if status:
                return redirect(url_for('index', exito='avistamiento'))
            else:
                return render_template('inform.html', error=msg, aves=aves)
        else:
            return render_template('inform.html', error=msg_validacion, aves=aves)
    
    return render_template('inform.html', aves=aves)

@app.route('/list')
def list():
    # para la url http://localhost:5000/list?page=____ checkeamos que es un numero.
    # si se enviara un script malicioso en el argumento page, se manda a la pagina 1
    page_str = request.args.get('page', '1')
    if page_str.isdigit():
        page = int(page_str)
    else:
        page = 1
    tipo = request.args.get('tipo', 'todos')
    orden = request.args.get('orden', 'fecha-desc')

    avistamientos_pagina, total_items = get_avistamientos_filtrados(tipo, orden, page, page_size=5)
    total_pages = math.ceil(total_items / 5) if total_items > 0 else 1

    return render_template('list.html', 
                           avistamientos=avistamientos_pagina, 
                           page=page, 
                           total_pages=total_pages,
                           tipo_actual=tipo,
                           orden_actual=orden)

@app.route('/list/<int:id>')
def detalle_avistamiento(id):
    avistamiento = get_avistamiento_by_id(id)
    if avistamiento is None:
        return "Avistamiento no encontrado", 404
    return render_template('detalle_avistamiento.html', avistamiento=avistamiento)

@app.route('/stats')
def stats():
    return render_template('stats.html')

if __name__ == '__main__':
    app.run(debug=True)