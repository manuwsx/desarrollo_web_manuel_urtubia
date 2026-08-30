const avistamientos = [
    {
        id: 1,
        nombre: "Cóndor Andino",
        tipo: "Rapaces",
        fecha: "2023-10-15",
        region: "Región Metropolitana de Santiago",
        comuna: "San José de Maipo"
    },
    {
        id: 2,
        nombre: "Loica",
        tipo: "Cantoras",
        fecha: "2023-11-02",
        region: "Valparaíso",
        comuna: "Viña del Mar"
    },
    {
        id: 3,
        nombre: "Flamenco Chileno",
        tipo: "Acuáticas y Marinas",
        fecha: "2023-08-14",
        region: "Antofagasta",
        comuna: "San Pedro de Atacama"
    },
    {
        id: 4,
        nombre: "Ñandú",
        tipo: "Corredoras",
        fecha: "2023-12-01",
        region: "Región de Magallanes y de la Antártica Chilena",
        comuna: "Natales"
    },
    {
        id: 5,
        nombre: "Carpintero Negro",
        tipo: "Trepadoras",
        fecha: "2023-09-05",
        region: "Región de la Araucanía",
        comuna: "Curacautín"
    },
    {
        id: 6,
        nombre: "Perdiz Chilena",
        tipo: "Galliformes",
        fecha: "2024-01-10",
        region: "Región del Maule",
        comuna: "Talca"
    },
    {
        id: 7,
        nombre: "Pingüino de Magallanes",
        tipo: "Acuáticas y Marinas",
        fecha: "2023-07-22",
        region: "Región de Magallanes y de la Antártica Chilena",
        comuna: "Punta Arenas"
    },
    {
        id: 8,
        nombre: "Aguilucho",
        tipo: "Rapaces",
        fecha: "2023-11-30",
        region: "Región de Los Lagos",
        comuna: "Puerto Varas"
    },
    {
        id: 9,
        nombre: "Chucao",
        tipo: "Cantoras",
        fecha: "2024-02-05",
        region: "Región de Los Ríos",
        comuna: "Valdivia"
    },
    {
        id: 10,
        nombre: "Codorniz",
        tipo: "Galliformes",
        fecha: "2024-01-25",
        region: "Región del Libertador Gral. Bernardo O’Higgins",
        comuna: "Rancagua"
    },
    {
        id: 11,
        nombre: "Rayo de Sol",
        tipo: "Trepadoras",
        fecha: "2023-12-18",
        region: "Región de Los Lagos",
        comuna: "Castro"
    },
    {
        id: 12,
        nombre: "Cisne de Cuello Negro",
        tipo: "Acuáticas y Marinas",
        fecha: "2023-09-20",
        region: "Región de Los Ríos",
        comuna: "Valdivia"
    }
];

let paginaActual = 1;
const elementosByPage = 3;
let lista_actual = avistamientos;

const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const spanPagina = document.getElementById("pagina-actual");
const contenedor = document.getElementById("contenedor-avistamientos");

const show_list = (lista) => {
    //obtener la lista con los avistamientos para mostrar en esta pagina
    const inicio = (paginaActual - 1) * elementosByPage;
    const fin = inicio + elementosByPage;
    data2show = lista.slice(inicio, fin);

    contenedor.innerHTML = "";

    if (data2show.length === 0) {
        contenedor.innerHTML = "<p>No hay avistamientos para mostrar.</p>";
    } else {
        data2show.forEach(ave => {
            const filaHtml = `
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 5px;">
                    <strong>${ave.nombre}</strong> - ${ave.tipo} - ${ave.fecha} - ${ave.region} (${ave.comuna})
                </div>
            `;
            contenedor.innerHTML += filaHtml;
        });
    }

    spanPagina.textContent = "Página " + paginaActual;

    if (paginaActual === 1) {
        btnAnterior.disabled = true;
    } else {
        btnAnterior.disabled = false;
    }

    const totalPaginas = Math.ceil(lista.length / elementosByPage);
    if (paginaActual >= (totalPaginas || 1)) {
        btnSiguiente.disabled = true;
    } else {
        btnSiguiente.disabled = false;
    }
}

//filtro
const selectFiltro = document.getElementById("filtroTipo")
selectFiltro.addEventListener("change", e => {
    const filtroSeleccionado = e.target.value;

    const avesFiltradas = avistamientos.filter(ave => {
        if (filtroSeleccionado === "todos") {
            return true;
        }
        return ave.tipo === filtroSeleccionado;
    });
    paginaActual = 1
    lista_actual = avesFiltradas;
    show_list(lista_actual)
});

//botones
const btn_anterior = document.getElementById("anterior")
btn_anterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual = paginaActual - 1;
        show_list(lista_actual);
    }
});

const btn_siguiente = document.getElementById("siguiente")
btn_siguiente.addEventListener("click", () => {
    paginaActual = paginaActual + 1;
    show_list(lista_actual);
});

//ordenar
const selectOrden = document.getElementById("orden")
selectOrden.addEventListener("change", e => {
    const ordenSeleccionado = e.target.value;

    lista_actual.sort((a, b) => {
        if (ordenSeleccionado === "fecha-desc") {
            return new Date(b.fecha) - new Date(a.fecha);
        }
        if (ordenSeleccionado === "fecha-asc") {
            return new Date(a.fecha) - new Date(b.fecha);
        }
        if (ordenSeleccionado === "region-asc") {
            return a.region.localeCompare(b.region);
        }
        if (ordenSeleccionado === "region-desc") {
            return b.region.localeCompare(a.region);
        }
    });

    paginaActual = 1
    show_list(lista_actual)
});

lista_actual.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
show_list(lista_actual);