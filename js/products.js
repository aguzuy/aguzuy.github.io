fetch (".json")
.then (response => {
    if(!response.ok){
        throw new error("network response was not ok" + response.statusText)
    }
    return response.json
})

.then (data=>{
    const productos = data.autos.products;
    const contenedor= document.getElementById("tarjetas")
})
productos.forEach(e => {
    const tarjeta= document.createElement("div");
    tarjeta.className = "card-header";
    tarjeta.innerHTML = `
    ${e.}`

});
