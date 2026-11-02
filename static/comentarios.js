const avistamientoId = document.getElementById('avistamiento_id').value;
const listaComentarios = document.getElementById('lista-comentarios');
const formComentario = document.getElementById('form-comentario');
const mensajeError = document.getElementById('mensaje-comentario');

// funcion para renderizar comentarios obtenidos con fetch
const renderComentarios = (comentarios) => {
    listaComentarios.innerHTML = ''; // borrar el "cargando comentarios"

    if (comentarios.length === 0) {
        listaComentarios.innerHTML = '<p> No hay comentarios para este avistamiento. </p>';
        return;
    }

    comentarios.forEach((c) => {
        const div = document.createElement('div');
        div.className = 'comentario-item';

        const autor = document.createElement('strong');
        autor.textContent = c.nombre;

        const fecha = document.createElement('small');
        fecha.textContent = ' — ' + c.fecha;

        const texto = document.createElement('p');
        texto.textContent = c.texto;

        div.appendChild(autor);
        div.appendChild(fecha);
        div.appendChild(texto);
        div.appendChild(document.createElement('hr'));

        listaComentarios.appendChild(div);
    });
}

//obtener comentarios en la ruta /get-comentarios/ + avistamientoId, una vez obtenidos renderizarlos
const fetchComentarios = () => {
    fetch('/get-comentarios/' + avistamientoId)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((comentarios) => {
            console.log("Comentarios recibidos:", comentarios);
            renderComentarios(comentarios);
        })
        .catch((error) => {
            console.error("Hubo un problema al cargar los comentarios:", error);
            listaComentarios.innerHTML = '<p> Error al cargar comentarios. </p>';
        });
};

// validacion del formulario para postear comentarios
const validarComentario = (e) => {
    e.preventDefault();

    // funciones de validacion
    const validadorNombre = (nombre) => nombre && nombre.trim().length >= 3 && nombre.trim().length <= 50;
    const validadorTexto = (texto) => texto && texto.trim().length >= 5 && texto.trim().length <= 300;

    // obtener inputs del usuario
    const nombreInput = document.getElementById("nombre");
    const textoInput = document.getElementById("texto");

    let isValid = true;

    // validar nombre y texto
    if (!validadorNombre(nombreInput.value)) {
        nombreInput.style.borderColor = "red";
        document.getElementById("error-nombre").classList.add("visible");
        isValid = false;
    } else {
        nombreInput.style.borderColor = "";
        document.getElementById("error-nombre").classList.remove("visible");
    }

    if (!validadorTexto(textoInput.value)) {
        textoInput.style.borderColor = "red";
        document.getElementById("error-texto").classList.add("visible");
        isValid = false;
    } else {
        textoInput.style.borderColor = "";
        document.getElementById("error-texto").classList.remove("visible");
    }

    // si son validos subir el comentario a la ruta /add-comentario/ + avistamientoId
    // y volver a renderizar los comentarios para mostrar el nuevo
    if (isValid) {
        mensajeError.textContent = "";
        mensajeError.style.display = "none";

        fetch('/add-comentario/' + avistamientoId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nombreInput.value.trim(),
                texto: textoInput.value.trim()
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en el servidor al guardar el comentario.");
                }
                return response.json();
            })
            .then((data) => {
                // si se sube correctamente limpiamos inputs del form y borramos errores
                formComentario.reset();
                nombreInput.style.borderColor = "";
                textoInput.style.borderColor = "";

                // recargamos los comentarios para mostrar el nuevo
                fetchComentarios();
            })
            .catch((error) => {
                mensajeError.textContent = error.message;
                mensajeError.style.display = "block";
            });
    }
};

formComentario.addEventListener("submit", validarComentario);
fetchComentarios();