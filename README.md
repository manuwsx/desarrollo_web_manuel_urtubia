# Tarea 1 - CC5002 Desarrollo de Aplicaciones Web

**Autor**: Manuel Urtubia

## Descripción
La página web consiste de una landing page (index.html) la cual tiene hipervinculos de navegación hacia las vistas que pide la tarea.

## Decisiones de Diseño e Implementación

- **Validaciones de Formularios**: Para las validaciones en el registro de usuarios y en el formulario de avistamientos, se implementaron indicadores visuales. Para mostrar si un dato ingresado está correcto o incorrecto, se utilizaron etiquetas `<span>` como se hizo en el Ejercicio 1.

- **Manejo de Datos Geográficos (Regiones y Comunas)**: Todos los datos correspondientes a las regiones y comunas de Chile, junto con las funciones encargadas de manejar los *dropdowns* de ellas, se dejaron en el archivo `geo_data.js` .

- **Estadísticas**: En la vista de estadísticas (`stats`) se presentan estadísticas básicas de la página. Sin embargo, dado que no hay un backend, todos los datos mostrados son estáticos.
