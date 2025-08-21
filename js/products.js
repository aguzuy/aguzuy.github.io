fetch ("https://japceibal.github.io/emercado-api/cats_products/101.json")
.then (response => {
    if(!response.ok){
        throw new Error("network response was not ok" + response.statusText)
    }
    return response.json();
})

.then (data=>{
    const productos = data.products;
    const contenedor= document.getElementById("contenedor-main-tarjetas");

    productos.forEach(auto => {
        const caja= document.createElement("div");
        caja.className = "contenedor-tarjetas";
        caja.innerHTML=`
        <!-- Sin hover -->
        <div class="card normal" style="width: 18rem;">
            <img src="${auto.image}" class="card-img-top" alt="${auto.name}">
            <div class="card-body">
                <h5 class="card-title">${auto.name}</h5>
                <p class="auto-precio">${auto.cost} ${auto.currency}</p>
                <a href="#" class="btn btn-primary">Agregar</a>
            </div>
        </div>

        <!-- Al hacer hover -->
        <div class="card expandida" style="width: 18rem;">
            <h5 class="auto-nombre">${auto.name}</h5>
            <p class="auto-desc">${auto.description}</p>
            <a href="#" class="btn btn-primary">Agregar</a>
        </div>
        `
        contenedor.appendChild(caja);
    })

})

.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});
