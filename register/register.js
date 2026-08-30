// validacion formulario
const validarForm = (e) => {
    e.preventDefault();

    // funciones auxiliares
    const validadorMail = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

    const validadorUserName = (username) => username && username.trim().length > 4;

    const validadorNombreCompleto = (nombre) => {
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return nombre && regexNombre.test(nombre) && nombre.trim().includes(" ") && nombre.trim().length > 5;
    };

    const validadorTelefono = (tel) => /^(\+?56)?9\d{8}$/.test(tel);

    const validadorRegion = (region) => region && lista_regiones.includes(region);
    const validadorComuna = (comuna) => comuna && lista_comunas.includes(comuna);

    const validadorContrasena = (pswd) => {
        const regexSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regexSegura.test(pswd);
    };

    // obtener inputs del DOM por el Id
    let emailInput = document.getElementById("email");
    let userNameInput = document.getElementById("nombre");
    let nombreCompletoInput = document.getElementById("nombre_completo");
    let telefonoInput = document.getElementById("telefono");
    let regionInput = document.getElementById("region");
    let comunaInput = document.getElementById("comuna");
    let pswdInput = document.getElementById("contrasena");

    let isValid = false;
    let msg = "";

    if (!validadorMail(emailInput.value)) {
        msg += "Mail malo!\n";
        emailInput.style.borderColor = "red"; // cambiar estilo con JS!!
    } else {
        emailInput.style.borderColor = "";
    }

    if (!validadorUserName(userNameInput.value)) {
        msg += "Nombre malo!\n";
        userNameInput.style.borderColor = "red";
    } else {
        userNameInput.style.borderColor = "";
    }

    if (!validadorNombreCompleto(nombreCompletoInput.value)) {
        msg += "Nombre completo malo! (Debe incluir apellido)\n";
        nombreCompletoInput.style.borderColor = "red";
    } else {
        nombreCompletoInput.style.borderColor = "";
    }

    if (!validadorTelefono(telefonoInput.value)) {
        msg += "Teléfono malo! (Formato chileno requerido)\n";
        telefonoInput.style.borderColor = "red";
    } else {
        telefonoInput.style.borderColor = "";
    }

    if (!validadorRegion(regionInput.value)) {
        msg += "Región no seleccionada o inválida!\n";
        regionInput.style.borderColor = "red";
    } else {
        regionInput.style.borderColor = "";
    }

    if (!validadorComuna(comunaInput.value)) {
        msg += "Comuna no seleccionada o inválida!\n";
        comunaInput.style.borderColor = "red";
    } else {
        comunaInput.style.borderColor = "";
    }

    if (!validadorContrasena(pswdInput.value)) {
        msg += "Contraseña mala! (Min 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 símbolo)\n";
        pswdInput.style.borderColor = "red";
    } else {
        pswdInput.style.borderColor = "";
    }

    if (msg === "") {
        msg = "Felicidades ya tienes una cuenta!";
        isValid = true;
    }

    alert(msg); // alertas JS
};

let loginForm = document.getElementById("registro-form");
loginForm.addEventListener("submit", validarForm);
