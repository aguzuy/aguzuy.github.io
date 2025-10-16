const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
// redirecciona a my-profile
document.addEventListener("DOMContentLoaded", () => {
  const botonLogin = document.getElementById("botonLogin");
  const usuarioBtn = document.getElementById("usuarioBtn");
  const usuarioNombre = document.getElementById("usuarioNombre");

  //traemos el nombre de usuario desde sessionStorage o localStorage
  const usuario = sessionStorage.getItem("usuario") || localStorage.getItem("usuario");

  if (usuario) {
    //mostrar el botón del usuario
    usuarioBtn.style.display = "inline-block";
    usuarioNombre.textContent = usuario;

    
    if (botonLogin) botonLogin.style.display = "none";

    //al hacer clic lleva al perfil
    usuarioBtn.addEventListener("click", () => {
      window.location.href = "my-profile.html";
    });
  } else {
    // si no esta logueado muestra el botón de Ingresar
    if (botonLogin) botonLogin.style.display = "inline-block";
    if (usuarioBtn) usuarioBtn.style.display = "none";
  }
});

//redireccionar a my-profile desde la navbar del index haciendo click en: Bienvenido,"usuario"
document.addEventListener("DOMContentLoaded", () => {
  const usuarioSpan = document.getElementById("usuario");
  const usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioSpan) {
    if (usuarioGuardado) {
      
      // Hacer clickeable para ir al perfil
      usuarioSpan.style.cursor = "pointer";
      usuarioSpan.addEventListener("click", () => {
        window.location.href = "my-profile.html";
      });
    } else {
      // Si no hay usuario logueado
      usuarioSpan.textContent = "Iniciar sesión";
      usuarioSpan.style.cursor = "pointer";
      usuarioSpan.addEventListener("click", () => {
        window.location.href = "login.html";
      });
    }
  }
});