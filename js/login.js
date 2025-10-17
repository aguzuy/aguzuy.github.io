document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

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
    localStorage.setItem("usuario", usuario);

    window.location.href = "index.html"; //Redirigir al index
  });
});



