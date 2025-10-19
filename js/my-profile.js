const email = localStorage.getItem("usuario");
const usuarioEmail = document.getElementById("usuarioEmail");
const usuarioNombre = document.getElementById("usuarioNombre");
const usuarioApellido = document.getElementById("usuarioApellido");
const usuarioTelefono = document.getElementById("usuarioTelefono");

function mostrarEmail() {
    usuarioEmail.innerText = email;
};

function guardarCambios() {
    localStorage.setItem("usuarioNombre", usuarioNombre.value.trim());
    localStorage.setItem("usuarioApellido", usuarioApellido.value.trim());
    localStorage.setItem("usuarioTelefono", usuarioTelefono.value.trim());
};

document.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("usuarioNombre");
    const apellido = localStorage.getItem("usuarioApellido");
    const telefono = localStorage.getItem("usuarioTelefono");
    mostrarEmail();
    if (nombre) usuarioNombre.placeholder = nombre;
    if (apellido) usuarioApellido.placeholder = apellido;
    if (telefono) usuarioTelefono.placeholder = telefono;
});

document.getElementById("botonActualizarCambios").addEventListener("click", () => {
    guardarCambios();
});

/* Modo uscuro */
