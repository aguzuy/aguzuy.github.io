document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector("main .container");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-info text-center" role="alert">
        No hay ningún producto en el carrito.
      </div>`;
    return;
  }

  renderizarCarrito();

  function renderizarCarrito() {
    contenedor.innerHTML = `
      <div id="listaCarrito" class="mt-4"></div>
      <div class="text-center mt-4">
        <button id="btn-comprar" class="btn-comprar">Comprar</button>
      </div>`;

    const lista = document.getElementById("listaCarrito");

    carrito.forEach((p, i) => {
      const item = document.createElement("div");
      item.className = "producto-item";
      item.innerHTML = `
        <div class="carrito-producto-info">
          <div class="d-flex align-items-center">
            <img id="imagen-producto-carrito" src="${p.imagen}">
            <div>
              <p><strong>${p.nombre}</strong></p>
              <p>Precio: ${p.costo} ${p.moneda}</p>
              <p>
                Cantidad: 
                <input 
                  class="cant form-control w-50 d-inline-block" 
                  type="number" 
                  min="1" 
                  value="${p.cantidad}" 
                  data-i="${i}">
              </p>
              <p>Subtotal: <span class="subtotal">${p.subtotal.toFixed(2)}</span> ${p.moneda}</p>
            </div>
          </div>
          <button class="btn-eliminar" data-i="${i}">Eliminar</button>
        </div>
      `;
      lista.appendChild(item);
    });
  
    document.querySelectorAll(".cant").forEach(input => {
      input.addEventListener("input", e => {
        const i = e.target.dataset.i;
        carrito[i].cantidad = parseInt(e.target.value) || 1;
        carrito[i].subtotal = carrito[i].costo * carrito[i].cantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        const subtotalSpan = e.target.closest(".carrito-producto-info").querySelector(".subtotal");
        subtotalSpan.textContent = carrito[i].subtotal.toFixed(2);
      });
    });
    
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", e => {
        const i = e.target.dataset.i;
        carrito.splice(i, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
      });
    });
  }
});
