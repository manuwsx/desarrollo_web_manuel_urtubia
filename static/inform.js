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
    const validadorComuna = (comuna) => comuna && lista_comunas.includes(comuna);

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
        const extensionesValidas = ['png', 'jpg', 'jpeg', 'mp4', 'webm'];
        return extensionesValidas.includes(extension);
    };

    //valida que los archivos pesen a lo mas 10MB
    const validadorPesoMedia = (media) => {
        const limiteBytes = 10 * 1024 * 1024;

        if (media.files && media.files.length > 0) {
            const pesoArchivo = media.files[0].size;
            return pesoArchivo <= limiteBytes;
        }
        return false;
    };

    // obtener inputs del DOM por el Id
    let tipoAveInput = document.getElementById("tipo_ave");
    let aveIdInput = document.getElementById("ave_id");
    let regionInput = document.getElementById("region");
    let comunaInput = document.getElementById("comuna");
    let lugarInput = document.getElementById("lugar");
    let fechaInput = document.getElementById("fecha");
    let mediaInput = document.getElementById("media");
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    let isValid = true;

    if (!validadorTipoAve(tipoAveInput.value)) {
        tipoAveInput.style.borderColor = "red";
        document.getElementById("error-tipoAve").classList.add("visible");
        isValid = false;
    } else {
        tipoAveInput.style.borderColor = "";
        document.getElementById("error-tipoAve").classList.remove("visible");
    }

    if (aveIdInput.value.trim() === "") {
        aveIdInput.style.borderColor = "red";
        document.getElementById("error-ave_id").classList.add("visible");
        isValid = false;
    } else {
        aveIdInput.style.borderColor = "";
        document.getElementById("error-ave_id").classList.remove("visible");
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
        document.getElementById("error-media-tipo").classList.add("visible");
        isValid = false;
    } else {
        mediaInput.style.borderColor = "";
        document.getElementById("error-media-tipo").classList.remove("visible");

        if (!validadorPesoMedia(mediaInput)) {
            mediaInput.style.borderColor = "red";
            document.getElementById("error-media-peso").classList.add("visible");
            isValid = false;
        } else {
            mediaInput.style.borderColor = "";
            document.getElementById("error-media-peso").classList.remove("visible");
        }
    }

    if (usernameInput.value.trim() === "") {
        usernameInput.style.borderColor = "red";
        document.getElementById("error-username").classList.add("visible");
        isValid = false;
    } else {
        usernameInput.style.borderColor = "";
        document.getElementById("error-username").classList.remove("visible");
    }

    if (passwordInput.value.trim() === "") {
        passwordInput.style.borderColor = "red";
        document.getElementById("error-password").classList.add("visible");
        isValid = false;
    } else {
        passwordInput.style.borderColor = "";
        document.getElementById("error-password").classList.remove("visible");
    }

    if (isValid) {
        avistamientoForm.submit();
    }
};

let avistamientoForm = document.getElementById("avistamientoForm");
avistamientoForm.addEventListener("submit", validarForm);