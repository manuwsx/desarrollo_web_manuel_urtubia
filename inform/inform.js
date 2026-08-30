// validacion formulario
const validarForm = (e) => {
    e.preventDefault();

    // funciones auxiliares
    const tiposValidos = ["Rapaces", "Cantoras", "Acuáticas y Marinas", "Corredoras", "Trepadoras", "Galliformes"];
    const validadorTipoAve = (tipo) => tipo && tiposValidos.includes(tipo);

    const validadorNombreAve = (nombre) => nombre && nombre.trim().length > 2;

    const validadorRegion = (region) => region && lista_regiones.includes(region); //quiero que se seleccione una region de las predefinidas

    const validadorComuna = (comuna) => comuna && lista_comunas.includes(comuna); //quiero que se seleccione una comuna de las predefinidas

    const validadorLugar = (lugar) => lugar && lugar.trim().length > 2;

    const validadorFecha = (fecha) => {
        if (!fecha || fecha === "") return false;
        const fechaIngresada = new Date(fecha);
        const fechaActual = new Date();
        const limitePasado = new Date();
        limitePasado.setDate(limitePasado.getDate() - 14); // Máximo 2 semanas (14 días) en el pasado
        return fechaIngresada <= fechaActual && fechaIngresada >= limitePasado;
    };

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

    let isValid = false;
    let msg = "";

    if (!validadorTipoAve(tipoAveInput.value)) {
        msg += "Tipo de ave no válido!\n";
        tipoAveInput.style.borderColor = "red";
    } else {
        tipoAveInput.style.borderColor = "";
    }

    if (!validadorNombreAve(nombreAveInput.value)) {
        msg += "Nombre del ave debe tener al menos 3 caracteres!\n";
        nombreAveInput.style.borderColor = "red";
    } else {
        nombreAveInput.style.borderColor = "";
    }

    if (!validadorRegion(regionInput.value)) {
        msg += "Región no seleccionada!\n";
        regionInput.style.borderColor = "red";
    } else {
        regionInput.style.borderColor = "";
    }

    if (!validadorComuna(comunaInput.value)) {
        msg += "Comuna no seleccionada!\n";
        comunaInput.style.borderColor = "red";
    } else {
        comunaInput.style.borderColor = "";
    }

    if (!validadorLugar(lugarInput.value)) {
        msg += "El lugar debe tener al menos 3 caracteres!\n";
        lugarInput.style.borderColor = "red";
    } else {
        lugarInput.style.borderColor = "";
    }

    if (!validadorFecha(fechaInput.value)) {
        msg += "Fecha no válida! (No puede estar en el futuro ni ser de hace más de 2 semanas)\n";
        fechaInput.style.borderColor = "red";
    } else {
        fechaInput.style.borderColor = "";
    }

    if (!validadorMedia(mediaInput.value)) {
        msg += "Archivo no válido! (Debe ser png, jpg, jpeg, mp4, avi, mkv)\n";
        mediaInput.style.borderColor = "red";
    } else {
        mediaInput.style.borderColor = "";
    }

    if (msg === "") {
        msg = "Avistamiento registrado.";
        isValid = true;
    }

    alert(msg);
};

let avistamientoForm = document.getElementById("avistamientoForm");
avistamientoForm.addEventListener("submit", validarForm);