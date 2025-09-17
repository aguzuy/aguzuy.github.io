document.addEventListener("DOMContentLoaded", () => {
    const prodID = localStorage.getItem("productID");
    const contenedor = document.getElementById("contenedor-prin");

    fetch ("https://japceibal.github.io/emercado-api/products/" + prodID + ".json")
    .then (response => {
        if(!response.ok){
            throw new Error("network response was not ok" + response.statusText)
        }
        return response.json();
    })

    .then (data=>{
        mostrarProducto(data);
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

        
 })