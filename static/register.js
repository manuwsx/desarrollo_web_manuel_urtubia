// validacion formulario
const validarForm = (e) => {
    e.preventDefault();

    // funciones auxiliares

    //regex para validar
    const validadorMail = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

    //username debe tener mas de 3 caracteres
    const validadorUserName = (username) => username && username.trim().length > 3;

    //nombre debe tener mas de 5 caracteres y un espacio, sin espacios múltiples
    const validadorNombreCompleto = (nombre) => {
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/;
        return nombre && regexNombre.test(nombre) && nombre.length > 5;
    };

    //telefono debe ser formato chileno
    const validadorTelefono = (tel) => /^(\+?56)?9\d{8}$/.test(tel);

    //region debe ser valida y estar en regiones definidas
    const validadorRegion = (region) => region && lista_regiones.includes(region);
    //comuna debe ser valida y estar en comunas definidas
    const validadorComuna = (comuna) => comuna && lista_comunas.includes(comuna);

    //contrasena debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero y un simbolo
    const validadorContrasena = (pswd) => {
        const regexSeguro = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regexSeguro.test(pswd);
    };

    // obtener inputs del DOM por el Id
    let emailInput = document.getElementById("email");
    let userNameInput = document.getElementById("nombre");
    let nombreCompletoInput = document.getElementById("nombre_completo");
    let telefonoInput = document.getElementById("telefono");
    let regionInput = document.getElementById("region");
    let comunaInput = document.getElementById("comuna");
    let pswdInput = document.getElementById("contrasena");

    let isValid = true;

    if (!validadorMail(emailInput.value)) {
        emailInput.style.borderColor = "red";
        document.getElementById("error-email").classList.add("visible");
        isValid = false;
    } else {
        emailInput.style.borderColor = "";
        document.getElementById("error-email").classList.remove("visible");
    }

    if (!validadorUserName(userNameInput.value)) {
        userNameInput.style.borderColor = "red";
        document.getElementById("error-nombre").classList.add("visible");
        isValid = false;
    } else {
        userNameInput.style.borderColor = "";
        document.getElementById("error-nombre").classList.remove("visible");
    }

    if (!validadorNombreCompleto(nombreCompletoInput.value)) {
        nombreCompletoInput.style.borderColor = "red";
        document.getElementById("error-nombre_completo").classList.add("visible");
        isValid = false;
    } else {
        nombreCompletoInput.style.borderColor = "";
        document.getElementById("error-nombre_completo").classList.remove("visible");
    }

    if (!validadorTelefono(telefonoInput.value)) {
        telefonoInput.style.borderColor = "red";
        document.getElementById("error-telefono").classList.add("visible");
        isValid = false;
    } else {
        telefonoInput.style.borderColor = "";
        document.getElementById("error-telefono").classList.remove("visible");
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

    if (!validadorContrasena(pswdInput.value)) {
        pswdInput.style.borderColor = "red";
        document.getElementById("error-contrasena").classList.add("visible");
        isValid = false;
    } else {
        pswdInput.style.borderColor = "";
        document.getElementById("error-contrasena").classList.remove("visible");
    }

    if (isValid) {
        alert("Cuenta creada exitosamente!");
    }
};

let loginForm = document.getElementById("registro-form");
loginForm.addEventListener("submit", validarForm);
