const form = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // evita que se recargue la página

    const usuario = document.getElementById("usuario").value.trim();
    const contra = document.getElementById("contraseña").value.trim();
    if (usuario === "" || contra === "") {
        mensaje.textContent = "Por favor, ingresa usuario y contraseña.";
        mensaje.style.color = "red";
      } else {
        mensaje.textContent = "¡Datos introducidos correctamente!";
        mensaje.style.color = "green";
        window.location.href = "../index.html";
    }
});