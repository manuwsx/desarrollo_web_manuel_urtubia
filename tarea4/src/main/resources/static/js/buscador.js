// obtener elementos
const form = document.getElementById('form-buscador');
const inputBusqueda = document.getElementById('texto-busqueda');
const mensaje = document.getElementById('mensaje');
const tabla = document.getElementById('tabla-resultados');
const resultadosBusqueda = document.getElementById('cuerpo-resultados');

// temporizador para el debounce al escribir
let temporizador = null;

// toma un texto, le saca tildes y lo convierte en minusculas
const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const formatearPromedio = (promedio) => {
    if (promedio === null) {
        return '-';
    }
    return promedio.toFixed(1);
};

const mostrarMensaje = (texto, clase) => {
    mensaje.textContent = texto;
    mensaje.className = clase;
    mensaje.hidden = false;
};

const limpiar = () => {
    resultadosBusqueda.innerHTML = '';
    tabla.hidden = true;
    mensaje.hidden = true;
};

// resalta las coincidencias de texto con busqueda en la celda
const resaltar = (celda, texto, busqueda) => {
    const textoLimpio = normalizar(texto);
    const buscado = normalizar(busqueda);

    let inicio = 0;
    let posicion = textoLimpio.indexOf(buscado);
    while (posicion !== -1) {
        const marca = document.createElement('mark');
        marca.textContent = texto.slice(posicion, posicion + buscado.length);
        celda.append(texto.slice(inicio, posicion), marca);
        inicio = posicion + buscado.length;
        posicion = textoLimpio.indexOf(buscado, inicio);
    }
    celda.append(texto.slice(inicio));
};

// envia la nota al servidor y actualiza el promedio en la celda de la nota
const evaluar = (avistamientoId, nota, celdaNota) => {
    // se verifica que la nota sea un entero entre 1 y 7
    if (!Number.isInteger(nota) || nota < 1 || nota > 7) {
        mostrarMensaje('La nota debe ser un número entero entre 1 y 7.', 'mensaje-error');
        return;
    }

    // se envia la nota al backend
    fetch('/post-nota/' + avistamientoId, {
        method: 'POST',
        body: new URLSearchParams({ nota: nota })
    })
        .then((response) => response.json())
        .then((respuesta) => {
            if (!respuesta.success) {
                mostrarMensaje(respuesta.error, 'mensaje-error');
                return;
            }
            // se guarda, se actualiza el promedio sin recargar la pagina y se muestra un mensaje de exito
            celdaNota.textContent = formatearPromedio(respuesta.promedio);
            mostrarMensaje('Nota registrada! Nuevo promedio: ' + formatearPromedio(respuesta.promedio), 'mensaje-exito');
        })
        .catch(() => {
            mostrarMensaje('Error al guardar la nota. Intenta nuevamente.', 'mensaje-error');
        });
};

// inserta los avistamientos en la tabla de resultados de la busqueda
const insertarResultados = (avistamientos, texto) => {
    limpiar(); // limpiamos los resultados de la anterior busqueda

    if (avistamientos.length === 0) {
        mostrarMensaje('No se encontraron avistamientos para "' + texto + '".', 'mensaje-info');
        return;
    }

    avistamientos.forEach((av) => { // para cada avistamiento encontrado insertamos una fila con sus datos
        const nuevaFila = resultadosBusqueda.insertRow(-1);

        const celdaVoluntario = nuevaFila.insertCell(0);
        resaltar(celdaVoluntario, av.voluntario.trim(), texto);
        celdaVoluntario.append(' (');
        resaltar(celdaVoluntario, av.usuario.trim(), texto);
        celdaVoluntario.append(')');
        nuevaFila.insertCell(1).textContent = av.dia;
        resaltar(nuevaFila.insertCell(2), av.ave, texto);
        resaltar(nuevaFila.insertCell(3), av.comuna, texto);
        const celdaNota = nuevaFila.insertCell(4);
        celdaNota.textContent = formatearPromedio(av.promedio);

        // boton para evaluar
        const btnEvaluar = document.createElement('button');
        btnEvaluar.textContent = 'Evaluar';

        // select para elegir la nota
        const selectNota = document.createElement('select');
        selectNota.add(new Option('Nota', ''));
        for (let i = 1; i <= 7; i++) {
            selectNota.add(new Option(i, i));
        }
        selectNota.hidden = true;

        // al hacer clic en Evaluar sale un select para elegir la nota
        btnEvaluar.addEventListener('click', () => {
            btnEvaluar.hidden = true;
            selectNota.hidden = false;
        });

        // al elegir una nota se envia y se vuelve a mostrar el boton
        selectNota.addEventListener('change', () => {
            evaluar(av.id, Number(selectNota.value), celdaNota);
            selectNota.value = '';
            selectNota.hidden = true;
            btnEvaluar.hidden = false;
        });

        nuevaFila.insertCell(5).append(btnEvaluar, selectNota);
    });
    tabla.hidden = false;
};

// obtener avistamientos del backend, una vez lleguen insertarlos en la tabla
const buscar = (texto) => {
    fetch('/get-avistamientos?' + new URLSearchParams({ texto: texto }))
        .then((response) => response.json())
        .then((respuesta) => {
            insertarResultados(respuesta.data, texto);
        })
        .catch(() => {
            limpiar();
            mostrarMensaje('Error al realizar la búsqueda. Intenta nuevamente.', 'mensaje-error');
        });
};

inputBusqueda.addEventListener('input', (e) => {
    const busqueda = e.target.value.trim();
    clearTimeout(temporizador);
    if (busqueda === '') {
        limpiar();
        return;
    }
    temporizador = setTimeout(() => buscar(busqueda), 300);
});

form.addEventListener('submit', (e) => e.preventDefault());