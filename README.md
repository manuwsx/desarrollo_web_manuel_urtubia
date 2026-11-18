# Tarea 4 - CC5002 Desarrollo de Aplicaciones Web

**Autor**: Manuel Urtubia

## Descripción
Para esta entrega se agregó un buscador de avistamientos hecho con SpringBoot y JPA, que usa la misma base de datos MySQL (`tarea2`) de las tareas anteriores. El buscador muestra automáticamente, a medida que se escribe, los avistamientos cuyo nombre de ave, voluntario o comuna contiene el texto ingresado, destacando la parte que coincide. Además, cada resultado muestra su nota promedio y permite evaluarlo con una nota entre 1 y 7, la cual se guarda en la nueva tabla `nota` (se usó exactamente el mismo archivo sql que se entregó en el enunciado).

La aplicación de Flask (tareas 1 a 3) se mantiene en la raíz del repositorio, y el proyecto de SpringBoot está en la carpeta `tarea4/`.

## Correcciones de la Tarea 2

- **P1**: Se añadió un breve párrafo de bienvenida en la página de inicio. Además, los 2 registros que se muestran en la landing page ahora corresponden a los más recientemente añadidos, esto se hace tomando los 2 avistamientos con el id más nuevo.

- **P2**: Ahora el servidor no acepta avistamientos ni registros de voluntarios donde la región no calce con la comuna. Esto se hizo validando en el backend que la comuna enviada en el formulario pertenezca a la región enviada en el formulario.

- **P3**: Se corrigió el error 500 al enviar fechas con zona horaria: ahora la fecha se valida con `strptime` usando el formato exacto del input, y cualquier otro formato se rechaza. Además, la carpeta `static/uploads` se crea al iniciar la app si no existe, y el `.gitignore` ahora ignora solo su contenido. Por último, para que los archivos con el mismo nombre no se sobrescriban, cada uno se guarda con un nombre único formado por el id del avistamiento, su índice de subida y su nombre original.

- **P4**: En el listado de avistamientos ahora se puede hacer clic en cualquier parte de la fila para abrir el detalle del avistamiento, y la fila cambia de color al pasar el mouse por encima para que se note que es clickeable.

## Decisiones de Diseño e Implementación

- **Estructura del proyecto SpringBoot**: Se siguió la misma estructura que se vio en el auxiliar, separando el código en capas: `models` (entidades y repositorios), `services` (la lógica, en `ApiService`) y `controllers` (los endpoints, en `ApiController`). Solo se crearon entidades para las tablas que necesita el buscador (`avistamiento`, `ave`, `voluntario`, `comuna` y `nota`), y con los campos que se usan.

- **Campos de búsqueda**: Se busca por nombre de usuario, nombre de ave, nombre completo real del voluntario y comuna. En los resultados el voluntario se muestra como "Nombre completo (usuario)", y la coincidencia se destaca en cualquiera de los dos.

- **Filtrado en el servidor**: Para buscar, se traen todos los avistamientos de la base de datos a memoria y se filtran uno por uno aquellos que sirven (igual que en el auxiliar). Esto es rápido de programar, pero en una aplicación con una base de datos gigantesca se vuelve imposible hacerlo.

- **Búsqueda sin distinguir mayúsculas ni tildes**: Tanto en el servidor (para filtrar) como en el navegador (para destacar), el texto se pasa a minúsculas y se le quitan las tildes antes de comparar. Así, buscar "condor" encuentra "Cóndor" y buscar "nunoa" encuentra "Ñuñoa". La coincidencia se destaca con la etiqueta `<mark>` sobre el texto original.

- **Búsqueda automática**: La búsqueda se hace con `fetch` (GET a `/get-avistamientos?texto=...`) cuando el usuario deja de escribir por 300 ms, para no hacer una petición al servidor por cada tecla.

- **Evaluar un avistamiento**: Al hacer clic en "Evaluar" aparece un select con las notas del 1 al 7, y al seleccionar una nota esta se envía con `fetch` (POST a `/post-nota/<id>`). El servidor guarda la nota en la tabla `nota` y responde con el nuevo promedio, que se actualiza en la fila sin recargar la página. Si el avistamiento no tiene notas, se muestra "-".

- **Validación de la nota en el cliente y en el servidor**: En el navegador se verifica que la nota sea un número entero entre 1 y 7 antes de enviarla. En el servidor se vuelve a validar (que sea entero, que esté entre 1 y 7 y que el avistamiento exista), ya que cualquiera podría enviar una petición directamente sin usar la página. Si la nota no es válida, el servidor responde `{"success": false, "error": "..."}` y el mensaje se muestra en la página.

## Testeo de página

La página fue testeada en los navegadores Chrome y Edge.