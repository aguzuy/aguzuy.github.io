

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const pass = document.getElementById("contraseña").value.trim();

    if (usuario === "" || pass === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Si los campos tienen algo, iniciamos "sesión"
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("usuario", usuario);

    window.location.href = "index.html"; //Redirigir al index
  });
});

