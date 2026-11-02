# Tarea 3 - CC5002 Desarrollo de Aplicaciones Web

**Autor**: Manuel Urtubia

## Descripción
La aplicación cuenta con una página de inicio (index.html) que permite navegar hacia el registro de voluntarios, el formulario de avistamientos, la vista de estadísticas y un listado interactivo (con filtros y ordenamiento) de los registros.

Para esta entrega se obtienen datos directamente desde la base de datos para generar los gráficos pedidos en la ventana de estadisticas.

Como nueva funcionalidad, se añadieron comentarios para cada avistamiento en su ventana de detalle.

## Decisiones de Diseño e Implementación

- **Permisividad de caracteres (< y >) y protección XSS**:
Se descartó la restricción de prohibir los símbolos < y > en los campos de texto (como comentarios y nombres). Se consideró que dicha limitación afectaba negativamente la experiencia del usuario, ya que es muy común escribir combinaciones como "<3" o emoticones de texto. Esta decisión no compromete la seguridad del sitio contra ataques XSS, debido a que Jinja2 convierte dichos caracteres en entidades HTML seguras (&lt; y &gt;) al renderizarlos en pantalla.

- **Consolidación de mensajes de error de la base de datos:**
Para mejorar la experiencia del usuario durante el registro de voluntarios, en lugar de validar y retornar un solo error a la vez (deteniendo el flujo ante el primer conflicto), el backend acumula todos los problemas existentes en la base de datos (por ejemplo, si el correo, el nombre de usuario y el teléfono ya están en uso) dentro de una lista. De esta forma, el usuario recibe todos los errores juntos en una sola respuesta y con saltos de línea claros, evitando la frustración de tener que enviar el formulario múltiples veces para descubrir cada fallo por separado.

- **Uso de Fetch para comunicación asíncrona (AJAX):**
Se utilizó la fetch para evitar recargas completas de la página en dos funcionalidades clave:

    1. En la vista de estadísticas, para consultar el endpoint /get-stats y renderizar los gráficos de Chart.js con los datos actualizados del servidor.
    
    2. En el detalle del avistamiento, para consultar de forma dinámica los comentarios existentes (/get-comentarios/<id>) y para enviar nuevos comentarios (/add-comentario/<id>) mediante peticiones POST con JSON, actualizando la lista en pantalla en tiempo real sin perder la posición del scroll ni recargar la vista.

- **Esquema de comentarios y participación de usuarios no registrados:** Se utilizó exactamente el archivo SQL provisto para la tabla comentario sin modificar su estructura. Al almacenar directamente el nombre del autor como una cadena de texto en vez de pedir el nombre de usuario más su clave, se permite intencionalmente que cualquier visitante pueda dejar un comentario en un avistamiento sin la necesidad de tener una cuenta de voluntario.

- **Agregaciones SQL en el backend para estadísticas:** En lugar de enviar todos los registros crudos de avistamientos y voluntarios al cliente para calcular las métricas con JavaScript, los conteos y agrupaciones se resuelven directamente en el motor de base de datos usando GROUP BY y func.count() a través de SQLAlchemy. Además, la ruta /get-stats formatea las respuestas con la estructura exacta de labels y datasets que requiere Chart.js, reduciendo el tráfico de datos en la red y liberando de cómputo al navegador.

- **Uso de librería**: Se usó la librería Chart.js para hacer los gráficos de la vista de estadísticas y se usó la librería Select2 para hacer un select en el que se pudiera buscar el nombre de la ave en el form para los avistamientos.

## Sobre uso de imagen

La imagen del búho fue obtenida de Library of Congress (https://www.loc.gov/) y es de uso libre.

## Testeo de página

La página fue testeada en los navegadores Chrome y Edge.