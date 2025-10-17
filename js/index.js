document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const buttonUsuario = document.getElementById("usuarioIndex");

  if (!isLoggedIn) {
    window.location.href = "login.html";
  } else { //muestra el nombre dentro del boton
    buttonUsuario.innerHTML = `Bienvenido, ${localStorage.getItem("usuario")}`; //muestra el nombre
    buttonUsuario.style.justifyContent = "flex-end";
    buttonUsuario.href= "my-profile.html";
  }
});

const buttonUsuario = document.getElementById("usuarioIndex");

buttonUsuario.addEventListener("click", () => {
    window.location = "my-profile.html";
});
