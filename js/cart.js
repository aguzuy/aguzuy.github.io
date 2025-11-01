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
      <h2 class="text-center mt-3">Carrito de compras</h2>
      <div id="listaCarrito" class="mt-4"></div>`;

    const lista = document.getElementById("listaCarrito");
    carrito.forEach((p, i) => {
      const item = document.createElement("div");
      item.className = "producto-item border rounded p-3 mb-3 bg-light";
      item.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${p.imagen}" style="width:80px;height:80px;border-radius:10px;margin-right:15px;">
          <div>
            <p><strong>${p.nombre}</strong></p>
            <p>Precio: ${p.costo} ${p.moneda}</p>
            <p>Cantidad: <input type="number" min="1" value="${p.cantidad}" data-i="${i}" class="cant form-control w-50 d-inline-block"></p>
            <p>Subtotal: <span class="subtotal">${p.subtotal}</span> ${p.moneda}</p>
          </div>
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
        renderizarCarrito(); 
      });
    });
  }
});
