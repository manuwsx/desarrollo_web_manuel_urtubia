# Tarea 2 - CC5002 Desarrollo de Aplicaciones Web

**Autor**: Manuel Urtubia

## Descripción
La aplicación cuenta con una página de inicio (index.html) que permite navegar hacia el registro de voluntarios, el formulario de avistamientos, la vista de estadísticas y un listado interactivo (con filtros y ordenamiento) de los registros.

Esta entrega conserva las funcionalidades de la tarea anterior, pero incorpora un backend. Gracias a esto, los datos de los voluntarios, los avistamientos informados y sus respectivos archivos multimedia ahora persisten en una base de datos.

Como nueva funcionalidad, desde la tabla de avistamientos ahora se puede acceder a una vista de detalles para consultar la información completa y las fotos o videos de cada registro.

Además, se implementaron correcciones basadas en el feedback de la tarea anterior: la lista de avistamientos ahora utiliza una tabla HTML, los campos obligatorios de los formularios incluyen un asterisco (*) y se agregó un nuevo gráfico sobre los voluntarios.

Se expandió la hoja de estilos CSS para que la página se viera estéticamente mejor.

## Decisiones de Diseño e Implementación

- **Modificación del esquema de la base de datos**: Se adaptó el archivo sql entregado originalmente para alinearlo con lo hecho en la tarea pasada. Específicamente, a la tabla voluntario se le añadieron los campos de nombre de usuario y contraseña. En la tabla avistamiento, se eliminó el campo de descripción (para mantener consistencia con la entrega anterior) y se agregó el atributo tipo_ave para permitir el funcionamiento de los filtros. Idealmente este atributo debió pertenecer a la tabla ave, sin embargo se decidió incluirlo en avistamiento para evitar modificar el extenso archivo que contenía las inserciones de todas las aves. Lamentablemente esto significa que cualquier ave puede ser clasificada bajo cualquier tipo.

- **Enlace de avistamientos con voluntarios**: Para mantener la simplicidad, se optó por no implementar un sistema de sesiones y de login. En su lugar, para asociar cada nuevo avistamiento con el voluntario que lo reporta, el formulario solicita ingresar sus credenciales (nombre de usuario y contraseña), validando directamente contra la base de datos que la información coincida con un usuario registrado.

- **Guardado de contraseñas en DB**: Las contraseñas no se guardan en texto plano sino que se hashean. 

- **Lógica de lista de avistamientos**: La lógica de la lista de avistamientos (filtros y paginación) se pasó por completo al backend. Ahora, cuando un usuario quiere filtrar por un tipo de ave, se hace una consulta (query) a la base de datos para obtener únicamente los registros que corresponden a esa página. Esto se hizo ya que si la base de datos creciera a un millón de avistamientos, enviarle todos los datos al navegador del usuario para que los filtre usando JavaScript haría que la página fuera excesivamente lenta.

- **Seguridad ante ataques**: Se reforzaron las validaciones del backend para los inputs de texto: ahora tienen límites de largo máximo (coincidentes con la base de datos) y rechazan los símbolos < y > para prevenir ataques XSS.

## Sobre uso de imagen

La imagen del búho fue obtenida de Library of Congress (https://www.loc.gov/) y es de uso libre.

## Testeo de página

La página fue testeada en los navegadores Chrome y Edge.