import re
from database.db import get_comuna_id
from datetime import datetime, timedelta

# Mismas validaciones que en los javascripts excepto que para inputs de texto hay limites de largo maximo (que coinciden con los de la db)
# y que se pide que no se acepten los simbolos < y > usados para xss

#validaciones voluntario
def validar_email(email):
    return email and len(email) <= 80 and "<" not in email and ">" not in email and re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email)

def validar_username(username):
    return username and 3 < len(username.strip()) <= 255 and "<" not in username and ">" not in username

def validar_nombre_completo(nombre_completo):
    regex_nombre = r"^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$"
    return nombre_completo and 5 < len(nombre_completo) <= 255 and "<" not in nombre_completo and ">" not in nombre_completo and re.match(regex_nombre, nombre_completo)

def validar_telefono(telefono):
    return telefono and len(telefono) <= 15 and "<" not in telefono and ">" not in telefono and re.match(r"^(\+?56)?9\d{8}$", telefono)

def validar_password(password):
    # Al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial
    regex_password = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    return password and len(password) <= 255 and "<" not in password and ">" not in password and re.match(regex_password, password)

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
    return lugar and 2 < len(lugar.strip()) <= 200 and "<" not in lugar and ">" not in lugar

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

def validar_media(archivos):
    if not archivos:
        return False
    extensiones_validas = ['png', 'jpg', 'jpeg', 'mp4', 'webm']
    for media in archivos:
        if not media or not media.filename:
            return False
        extension_media = media.filename.split('.')[-1].lower()
        if extension_media not in extensiones_validas:
            return False
    return True


def validar_registro_avistamiento(username, password, ave_id, tipo_ave, comuna_nombre, fecha_hora, lugar, media):
    if not (validar_username(username) and
            validar_password(password) and
            validar_ave_id(ave_id) and
            validar_tipo(tipo_ave) and
            validar_comuna(comuna_nombre) and
            validar_lugar(lugar) and
            validar_fecha(fecha_hora) and
            validar_media(media)):
        return False, "Datos inválidos en el formulario."
    
    return True, None

