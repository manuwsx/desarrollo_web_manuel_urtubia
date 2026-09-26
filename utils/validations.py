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