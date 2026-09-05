// validacion formulario
const validarForm = (e) => {
    e.preventDefault();

    // funciones auxiliares
    const tiposValidos = ["Rapaces", "Cantoras", "Acuáticas y Marinas", "Corredoras", "Trepadoras", "Galliformes"];
    //tipo de ave debe estar en la lista valida
    const validadorTipoAve = (tipo) => tipo && tiposValidos.includes(tipo);

    //el nombre debe tener al menos 3 caracteres
    const validadorNombreAve = (nombre) => nombre && nombre.trim().length > 2;

    //la region debe estar en la lista de regiones validas
    const validadorRegion = (region) => region && lista_regiones.includes(region);

    //la comuna debe estar en la lista de comunas validas
    const validadorComuna = (comuna) => comuna && lista_comunas.includes(comuna); //quiero que se seleccione una comuna de las predefinidas

    //el lugar debe tener al menos 3 caracteres
    const validadorLugar = (lugar) => lugar && lugar.trim().length > 2;

    //la fecha no puede estar en el pasado y puede ser de maximo 2 semanas de antigüedad
    const validadorFecha = (fecha) => {
        if (!fecha || fecha === "") return false;
        const fechaIngresada = new Date(fecha);
        const fechaActual = new Date();
        const limitePasado = new Date();
        limitePasado.setDate(limitePasado.getDate() - 14); // Máximo 2 semanas (14 días) en el pasado
        return fechaIngresada <= fechaActual && fechaIngresada >= limitePasado;
    };

    //solo acepta formatos png, jpg, jpeg, mp4, avi o mkv
    const validadorMedia = (media) => {
        if (!media) return false;
        const extension = media.split('.').pop().toLowerCase();
        const extensionesValidas = ['png', 'jpg', 'jpeg', 'mp4', 'avi', 'mkv'];
        return extensionesValidas.includes(extension);
    };

    // obtener inputs del DOM por el Id
    let tipoAveInput = document.getElementById("tipoAve");
    let nombreAveInput = document.getElementById("nombreAve");
    let regionInput = document.getElementById("region");
    let comunaInput = document.getElementById("comuna");
    let lugarInput = document.getElementById("lugar");
    let fechaInput = document.getElementById("fecha");
    let mediaInput = document.getElementById("media");

    let isValid = true;

    if (!validadorTipoAve(tipoAveInput.value)) {
        tipoAveInput.style.borderColor = "red";
        document.getElementById("error-tipoAve").classList.add("visible");
        isValid = false;
    } else {
        tipoAveInput.style.borderColor = "";
        document.getElementById("error-tipoAve").classList.remove("visible");
    }

    if (!validadorNombreAve(nombreAveInput.value)) {
        nombreAveInput.style.borderColor = "red";
        document.getElementById("error-nombreAve").classList.add("visible");
        isValid = false;
    } else {
        nombreAveInput.style.borderColor = "";
        document.getElementById("error-nombreAve").classList.remove("visible");
    }

    if (!validadorRegion(regionInput.value)) {
        regionInput.style.borderColor = "red";
        document.getElementById("error-region").classList.add("visible");
        isValid = false;
    } else {
        regionInput.style.borderColor = "";
        document.getElementById("error-region").classList.remove("visible");
    }

    if (!validadorComuna(comunaInput.value)) {
        comunaInput.style.borderColor = "red";
        document.getElementById("error-comuna").classList.add("visible");
        isValid = false;
    } else {
        comunaInput.style.borderColor = "";
        document.getElementById("error-comuna").classList.remove("visible");
    }

    if (!validadorLugar(lugarInput.value)) {
        lugarInput.style.borderColor = "red";
        document.getElementById("error-lugar").classList.add("visible");
        isValid = false;
    } else {
        lugarInput.style.borderColor = "";
        document.getElementById("error-lugar").classList.remove("visible");
    }

    if (!validadorFecha(fechaInput.value)) {
        fechaInput.style.borderColor = "red";
        document.getElementById("error-fecha").classList.add("visible");
        isValid = false;
    } else {
        fechaInput.style.borderColor = "";
        document.getElementById("error-fecha").classList.remove("visible");
    }


    if (!validadorMedia(mediaInput.value)) {
        mediaInput.style.borderColor = "red";
        document.getElementById("error-media").classList.add("visible");
        isValid = false;
    } else {
        mediaInput.style.borderColor = "";
        document.getElementById("error-media").classList.remove("visible");
    }

    if (isValid) {
        alert("Avistamiento registrado.");
    }
};

let avistamientoForm = document.getElementById("avistamientoForm");
avistamientoForm.addEventListener("submit", validarForm);