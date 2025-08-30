document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userDiv = document.getElementById("usuario");

  if (!isLoggedIn) {
    window.location.href = "login.html"; // si no hay sesion
  } else if (userDiv) { //muestra el nombre dentro de span
    const usuario = sessionStorage.getItem("usuario");
    userDiv.textContent = `Bienvenido, ${sessionStorage.getItem("usuario")}`; //muestra el nombre
  }
});
