document.addEventListener("DOMContentLoaded", () => {
    const prodID = localStorage.getItem("productID");
    const contenedor = document.getElementById("contenedor-prin");
    const contenedorRecs = document.getElementById("contenedor-prin-recs");
    const contenedorComs = document.getElementById("contenedor-prin-comentarios");

    fetch ("https://japceibal.github.io/emercado-api/products/" + prodID + ".json")
    .then (response => {
        if(!response.ok){
            throw new Error("network response was not ok" + response.statusText)
        }
        return response.json();
    })

    .then (data=>{
        mostrarProducto(data);
        mostrarRecomendados(data);
    })

    function mostrarProducto(data){
        const caja= document.createElement("div");
        caja.className = "contenedor-producto";
        caja.innerHTML=`
            <div class="cont-carrusel">
                ${data.images.map((imgSrc, index) => `
                <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                    <img src="${imgSrc}" alt="${data.name} - Imagen ${index + 1}">
                </div>
                `).join('')}
                <button type="button" class="carousel-btn anterior text-3xl p-4 rounded-full"><i class="fas fa-chevron-left"></i></button>
                <button type="button" class="carousel-btn siguiente text-3xl p-4 rounded-full"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="contenedorDerecha">
                <div class="contenedorDerechaArriba">
                    <p id="categoria">Categoría: ${data.category}</p>
                    <h1 id="nombreProducto">${data.name}</h1>
                </div>
                <div class="contenedorDerechaAbajo">
                    <h1 id="precio">${data.cost} ${data.currency}</h1>
                    <p id="cantVendidos">Vendidos: ${data.soldCount}</p>
                    <button class="btn-agregar">Agregar</button>
                </div>
            </div>
            <div class="contenedorInferior">
                <p class="descripcionProducto">${data.description}</p>
            </div>
        ` 
        contenedor.appendChild(caja);

        // carrusel logica
        const c = caja.querySelector('.cont-carrusel');
        const slides = c.querySelectorAll('.carousel-slide');
        let i = 0;

        function mostrar(n){
            slides[i].classList.remove('active');
            i = (n + slides.length) % slides.length;
            slides[i].classList.add('active');
        }

        c.querySelector('.anterior').addEventListener('click', () => mostrar(i - 1));
        c.querySelector('.siguiente').addEventListener('click', () => mostrar(i + 1));
    }
    
    function mostrarRecomendados(data){
        contenedorRecs.innerHTML = "";
        data.relatedProducts.forEach(item => {
        const caja= document.createElement("div");

            caja.className = "contenedor-tarjeta-recomendados";
            caja.dataset.id = item.id;
            caja.innerHTML=`
            <div class="card recomendados" style="width: 18rem;">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <div class="titulo-recomendados">
                        <h5 class="card-title">${item.name}</h5>
                        <a href="#" class="btn btn-primary btn-sm btnAgregarRec" data-id="${item.id}">Agregar</a>
                    </div>
                </div>
            </div>
            `
            contenedorRecs.appendChild(caja);
        })
    }

    contenedorRecs.addEventListener('click', (e) => {
        const link = e.target.closest('a.btnAgregarRec');
        if (!link || !contenedorRecs.contains(link)) return;

        const caja = link.closest('.contenedor-tarjeta-recomendados');
        const productoId = caja?.dataset.id ?? link.dataset.id;

        localStorage.setItem("productID", String(productoId));

        window.location.href = "product-info.html";
    });

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
    
    //aca comentarios
    fetch ("https://japceibal.github.io/emercado-api/products_comments/" + prodID + ".json")
    .then (response => {
        if(!response.ok){
            throw new Error("network response was not ok" + response.statusText)
        }
        return response.json();
    })
    .then (comments=>{
        mostrarComentarios(comments);
    })

    function mostrarComentarios(comentarios){
        contenedorComs.innerHTML = "";
        comentarios.forEach(com => {
        const caja= document.createElement("div");

            caja.className = "contenedor-comentarios";
            caja.innerHTML=`
            <div class="cont-usuario">
                <p class="com-usuario">${com.user}</p>
            </div>    
            <div class="cont-fecha">
                <p class="com-fecha">${com.dateTime}</p>
            </div>
            <div class="cont-contenido-comentario">
                <p class="com-contenido">${com.description}</p>
            </div>
            <div class="cont-rating">
            </div>
            `
            const max = 5;
            // Convierte a número y acota a 0..5
            const val = Math.max(0, Math.min(Number(com.score) || 0, max));
            const contEstrellas = caja.querySelector(".cont-rating");
            contEstrellas.innerHTML=
            `<i class="bi bi-star-fill"></i>`.repeat(val) +
            `<i class="bi bi-star"></i>`.repeat(max - val);

            contenedorComs.appendChild(caja);
        })
    }
 })