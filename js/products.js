document.addEventListener("DOMContentLoaded", () => {
    const cat = localStorage.getItem("catID");
    const contenedor= document.getElementById("contenedor-main-tarjetas");
    let datos = [];

    fetch ("https://japceibal.github.io/emercado-api/cats_products/" + cat + ".json")
    .then (response => {
        if(!response.ok){
            throw new Error("network response was not ok" + response.statusText)
        }
        return response.json();
    })

    .then (data=>{
        datos= data.products; //guardo datos del fetch original
        mostrarTarjetas(datos); //creo las tarjetas por primera vez
    })

    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    })

    function mostrarTarjetas(productos){
        contenedor.innerHTML = "";
        productos.forEach(auto => {
            const caja= document.createElement("div");

            caja.className = "contenedor-tarjetas";
            caja.innerHTML=`
            <!-- Sin hover -->
            <div class="card normal" style="width: 18rem;">
                <img src="${auto.image}" class="card-img-top" alt="${auto.name}">
                <div class="card-body">
                    <div class="franja">
                        <h5 class="card-title">${auto.name}</h5>
                    </div>
                    <p class="auto-precio">${auto.cost} ${auto.currency}</p>
                    <a href="#" class="btn btn-primary btn-sm">Agregar</a>
                </div>
            </div>

            <!-- Al hacer hover -->
            <div class="card expandida" style="width: 18rem;">
                <div class="franjaHover">
                    <h5 class="auto-nombre">${auto.name}</h5>
                </div>
                <p class="auto-desc">${auto.description}</p>
                <p class="auto-vendidos">Vendidos: ${auto.soldCount}</p>
                <a href="#" class="btn btn-primary">Agregar</a>
            </div>
            `
            contenedor.appendChild(caja);
        })
    }

    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const userDiv = document.getElementById("botonLogin");
    const botonReg = document.getElementById("botonRegistro");

    if (isLoggedIn) {
        userDiv.innerHTML = `${sessionStorage.getItem("usuario")}
        <img class="imagenUsuario" src="img/usuarioPerfil.png" alt="Imagen Usuario">
        `; //muestra el nombre y la imagen
        userDiv.href= "#"; 
        botonReg.style.display= "none"; //esconde btn registro
    }

    
    const filtroAsc = document.getElementById("filtro-precio-asc");
    const filtroDesc = document.getElementById("filtro-precio-desc");
    const filtroRel = document.getElementById("filtro-rel");

    filtroAsc.addEventListener("click", () => {
        datos.sort(function(act,pos){
            if(act.cost>pos.cost)
                return -1;
            else return 1;
        })
        mostrarTarjetas(datos);
    })

    filtroDesc.addEventListener("click", () => {
        datos.sort(function(act,pos){
            if(act.cost>pos.cost)
                return 1;
            else return -1;
        })
        mostrarTarjetas(datos);
    })

    filtroRel.addEventListener("click", () => {
        datos.sort(function(act,pos){
            if(act.soldCount>pos.soldCount)
                return -1;
            else return 1;
        })
        mostrarTarjetas(datos);
    })


    const botonPrecio = document.getElementById("filtro-precio-btn");

    botonPrecio.addEventListener("click", function(e) {
        const precioMin = parseInt(document.getElementById("price-min").value);
        const precioMax = parseInt(document.getElementById("price-max").value);
        e.preventDefault();
        datos=datos.filter(function(a){
            if(a.cost>=precioMin && a.cost <= precioMax){
                return a;
            }
        })
        mostrarTarjetas(datos);
    })
});


