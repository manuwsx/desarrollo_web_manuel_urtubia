from sqlalchemy import false
import re
from database.db import get_comuna_id
from datetime import datetime, timedelta

#mismas validaciones que en los javascript
#validaciones voluntario
def validar_email(email):
    return email and re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email)

def validar_username(username):
    return username and len(username.strip()) > 3

def validar_nombre_completo(nombre_completo):
    regex_nombre = r"^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$"
    return nombre_completo and len(nombre_completo) > 5 and re.match(regex_nombre, nombre_completo)

def validar_telefono(telefono):
    return telefono and re.match(r"^(\+?56)?9\d{8}$", telefono)

def validar_password(password):
    # Al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial
    regex_password = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    return password and re.match(regex_password, password)

def validar_comuna(comuna):
    if not comuna:
        return False
    comuna_id = get_comuna_id(comuna)

    if not comuna_id:
        return False
    return True

def validar_registro_voluntario(nombre_usuario, nombre_completo, email, telefono, password, comuna_nombre):
    return validar_username(nombre_usuario) and validar_nombre_completo(nombre_completo) and validar_email(email) and validar_telefono(telefono) and validar_password(password) and validar_comuna(comuna_nombre)

#validaciones avistamiento
def validar_tipo(tipo):
    tipos_validos = ["Rapaces", "Cantoras", "Acuáticas y Marinas", "Corredoras", "Trepadoras", "Galliformes"]
    return tipo and tipo in tipos_validos

def validar_ave_id(ave_id):
    return ave_id is not None and str(ave_id).isdigit()

def validar_lugar(lugar):
    return lugar and len(lugar.strip()) > 2

def validar_fecha(fecha):
    if not fecha:
        return False
    try:
        fecha_post = datetime.fromisoformat(fecha)
        fecha_ahora = datetime.now()
        limitePasado = fecha_ahora - timedelta(weeks=2)

        if fecha_post > fecha_ahora:
            return False
        
        if fecha_post < limitePasado:
            return False

        return True

    except ValueError:
        return False

def validar_media(media):
    if not media:
        return False
    extensiones_validas = ['png', 'jpg', 'jpeg', 'mp4', 'avi', 'mkv']
    extension_media = media.filename.split('.')[-1].lower()
    return extension_media in extensiones_validas


def validar_registro_avistamiento(username, password, ave_id, tipo_ave, comuna_nombre, fecha_hora, lugar, media):
    if not (validar_username(username) and
            validar_password(password) and
            validar_ave_id(ave_id) and
            validar_tipo(tipo_ave) and
            validar_comuna(comuna_nombre) and
            validar_lugar(lugar) and
            validar_fecha(fecha_hora) and
            validar_media(media[0] if media else None)):
        return False, "Datos inválidos en el formulario."
    
    return True, None

