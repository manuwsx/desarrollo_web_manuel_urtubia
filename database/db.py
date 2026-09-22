from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# --- Models ---

class Region(Base):
    __tablename__ = 'region'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)

class Comuna(Base):
    __tablename__ = 'comuna'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer, ForeignKey('region.id'), nullable=False)

class Voluntario(Base):
    __tablename__ = 'voluntario'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre_usuario = Column(String(255), nullable=False)
    nombre_completo = Column(String(255), nullable=False)
    email = Column(String(80), nullable=False)
    telefono = Column(String(15), nullable=False)
    contrasena = Column(String(255), nullable=False)
    fecha_registro = Column(DateTime, default=datetime.now, nullable=False)
    comuna_id = Column(Integer, ForeignKey('comuna.id'), nullable=False)

class Ave(Base):
    __tablename__ = 'ave'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)

class Avistamiento(Base):
    __tablename__ = 'avistamiento'
    id = Column(Integer, primary_key=True, autoincrement=True)
    voluntario_id = Column(Integer, ForeignKey('voluntario.id'), nullable=False)
    ave_id = Column(Integer, ForeignKey('ave.id'), nullable=False)
    tipo_ave = Column(String(100), nullable=False)
    comuna_id = Column(Integer, ForeignKey('comuna.id'), nullable=False)
    fecha_hora = Column(DateTime, nullable=False)
    lugar = Column(String(200), nullable=False)

class Registro(Base):
    __tablename__ = 'registro'
    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    avistamiento_id = Column(Integer, ForeignKey('avistamiento.id'), nullable=False)

    # --- Database Functions ---

def get_voluntario_by_id(id):
    session = SessionLocal()
    voluntario = session.query(Voluntario).filter_by(id=id).first()
    session.close()
    return voluntario

def get_voluntario_by_email(email):
    session = SessionLocal()
    voluntario = session.query(Voluntario).filter_by(email=email).first()
    session.close()
    return voluntario

def get_voluntario_by_username(username):
    session = SessionLocal()
    voluntario = session.query(Voluntario).filter_by(nombre_usuario=username).first()
    session.close()
    return voluntario

def get_voluntario_by_telefono(telefono):
    session = SessionLocal()
    voluntario = session.query(Voluntario).filter_by(telefono=telefono).first()
    session.close()
    return voluntario

def create_voluntario(username, nombre_completo, email, telefono, password, comuna_id):
    session= SessionLocal()
    new_voluntario = Voluntario(
        nombre_usuario = username,
        nombre_completo = nombre_completo,
        email = email,
        telefono = telefono,
        password = password,
        comuna_id = comuna_id
    )
    session.add(new_voluntario)
    session.commit()
    session.close()

def register_voluntario(username, nombre_completo, email, telefono, password, comuna_id):
    if get_voluntario_by_email(email) is not None:
        return False, "El correo ya está en uso."
    if get_voluntario_by_username(username) is not None:
        return False, "El nombre de usuario ya está en uso."
    if get_voluntario_by_telefono(telefono) is not None:
        return False, "El número de teléfono ya está registrado."
    
    create_voluntario(username, nombre_completo, email, telefono, password, comuna_id)
    return True, None

def get_avistamientos(limit=None):
    session = SessionLocal()
    query = session.query(Avistamiento).order_by(Avistamiento.fecha_hora.desc())
    if limit:
        query = query.limit(limit)
    avistamientos = query.all()
    session.close()
    return avistamientos

def get_avistamientos_filtrados(tipo="todos", orden="fecha-desc", page=1, page_size=3):
    session = SessionLocal()
    query = session.query(Avistamiento).join(Comuna).join(Region)
    
    if tipo and tipo != "todos":
        query = query.filter(Avistamiento.tipo_ave == tipo)
    if orden == "fecha-desc":
        query = query.order_by(Avistamiento.fecha_hora.desc())
    elif orden == "fecha-asc":
        query = query.order_by(Avistamiento.fecha_hora.asc())
    elif orden == "region-asc":
        query = query.order_by(Region.nombre.asc())
    elif orden == "region-desc":
        query = query.order_by(Region.nombre.desc())
    else:
        query = query.order_by(Avistamiento.fecha_hora.desc())
        
    total_items = query.count()
    offset = (page - 1) * page_size
    avistamientos_pagina = query.offset(offset).limit(page_size).all()
    
    session.close() 
    return avistamientos_pagina, total_items

def create_avistamiento(voluntario_id, ave_id, tipo_ave, comuna_id, fecha_hora, lugar, archivos):
    session = SessionLocal()
    nuevo_avistamiento = Avistamiento(
        voluntario_id=voluntario_id,
        ave_id=ave_id,
        tipo_ave=tipo_ave,
        comuna_id=comuna_id,
        fecha_hora=fecha_hora,
        lugar=lugar
    )
    session.add(nuevo_avistamiento)
    session.commit()
    
    for archivo in archivos:
        nuevo_registro = Registro(
            ruta_archivo=archivo['ruta'],
            nombre_archivo=archivo['nombre'],
            avistamiento_id=nuevo_avistamiento.id
        )
        session.add(nuevo_registro)
    
    session.commit()
    session.close()

def get_comuna_id(nombre_comuna):
    session = SessionLocal()
    comuna = session.query(Comuna).filter(Comuna.nombre == nombre_comuna).first()
    session.close()
    return comuna.id
