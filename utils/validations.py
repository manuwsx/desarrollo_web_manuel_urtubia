import re
from database.db import get_comuna_id
from datetime import datetime, timedelta

# Nombres de regiones en geo_data.js -> id de la region en la tabla 'region'
# Se creó este diccionario ya que los nombres de regiones en la db y en el json de geo_form.js no coincidian
regiones_ids = {
    "Arica y Parinacota": 15,
    "Tarapacá": 1,
    "Antofagasta": 2,
    "Atacama": 3,
    "Coquimbo": 4,
    "Valparaíso": 5,
    "Región del Libertador Gral. Bernardo O’Higgins": 6,
    "Región del Maule": 7,
    "Región de Ñuble": 16,
    "Región del Biobío": 8,
    "Región de la Araucanía": 9,
    "Región de Los Ríos": 14,
    "Región de Los Lagos": 10,
    "Región Aisén del Gral. Carlos Ibáñez del Campo": 11,
    "Región de Magallanes y de la Antártica Chilena": 12,
    "Región Metropolitana de Santiago": 13,
}

# Mismas validaciones que en los javascripts excepto que para inputs de texto hay limites de largo maximo (que coinciden con los de la db)

#validaciones voluntario
def validar_email(email):
    return email and len(email) <= 80 and re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email)

def validar_username(username):
    return username and 3 < len(username.strip()) <= 255

def validar_nombre_completo(nombre_completo):
    regex_nombre = r"^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$"
    return nombre_completo and 5 < len(nombre_completo) <= 255 and re.match(regex_nombre, nombre_completo)

def validar_telefono(telefono):
    return telefono and len(telefono) <= 15 and re.match(r"^(\+?56)?9\d{8}$", telefono)

def validar_password(password):
    # Al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial
    regex_password = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    return password and len(password) <= 255 and re.match(regex_password, password)

def validar_region(region):
    return region and region in regiones_ids

def validar_comuna(comuna, region):
    # la comuna debe existir y pertenecer a la region seleccionada
    if not comuna or not validar_region(region):
        return False
    comuna_id = get_comuna_id(comuna, regiones_ids[region])

    if not comuna_id:
        return False
    return True

def validar_registro_voluntario(nombre_usuario, nombre_completo, email, telefono, password, region_nombre, comuna_nombre):
    return validar_username(nombre_usuario) and validar_nombre_completo(nombre_completo) and validar_email(email) and validar_telefono(telefono) and validar_password(password) and validar_comuna(comuna_nombre, region_nombre)

#validaciones avistamiento
def validar_tipo(tipo):
    tipos_validos = ["Rapaces", "Cantoras", "Acuáticas y Marinas", "Corredoras", "Trepadoras", "Galliformes"]
    return tipo and tipo in tipos_validos

def validar_ave_id(ave_id):
    return ave_id is not None and str(ave_id).isdigit()

def validar_lugar(lugar):
    return lugar and 2 < len(lugar.strip()) <= 200

def validar_fecha(fecha):
    if not fecha:
        return False
    try:
        fecha_post = datetime.strptime(fecha, "%Y-%m-%dT%H:%M")
    except ValueError:
        return False

    fecha_ahora = datetime.now()
    limitePasado = fecha_ahora - timedelta(weeks=2)

    if fecha_post > fecha_ahora:
        return False

    if fecha_post < limitePasado:
        return False

    return True

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


def validar_registro_avistamiento(username, password, ave_id, tipo_ave, region_nombre, comuna_nombre, fecha_hora, lugar, media):
    if not (validar_username(username) and
            validar_password(password) and
            validar_ave_id(ave_id) and
            validar_tipo(tipo_ave) and
            validar_comuna(comuna_nombre, region_nombre) and
            validar_lugar(lugar) and
            validar_fecha(fecha_hora) and
            validar_media(media)):
        return False, "Datos inválidos en el formulario."
    
    return True, None

#validacion comentario
def validar_comentario(nombre, texto):
    errores = []
    if not nombre or len(nombre.strip()) < 3 or len(nombre.strip()) > 50:
        errores.append("El nombre debe tener entre 3 y 50 caracteres")
    if not texto or len(texto.strip()) < 5 or len(texto.strip()) > 300:
        errores.append("El comentario debe tener entre 5 y 300 caracteres")
    if errores:
        return False, " ".join(errores)
    return True, None
