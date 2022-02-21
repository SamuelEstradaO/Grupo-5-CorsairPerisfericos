

window.onload = function async() {
  let cartBox = document.querySelector(".box-cart");
  let resumenCart = document.getElementById("resumenCart");
  let eliminarProductos = document.getElementById("eliminarProductos");

  eliminarProductos.addEventListener("click", function () {
    localStorage.removeItem("cart");
    location.reload();

  })

  let productos = obtenerProductos();
  if (productos.length > 0) {
    eliminarProductos.classList.add("show");
  }

  let resumenTotal = document.getElementById("resumenTotal");
  const sumatoria = [];



  for (const producto of productos) {
    let total = 0;

    console.log(resumenTotal.innerText)
    fetch(`/api/products/${producto.id}`)
      .then((response) => response.json())
      .then(({ product }) => {
        sumatoria.push(product.precio * producto.cantidad);
        console.log(sumatoria);
        let options = ""
        if(product.stock < producto.cantidad ){
          changeValue(product.stock, product.id);
        }
        for (let i = 0; i < product.stock; i++) {
          options += `<option value="${i + 1}" ${producto.cantidad == i + 1 ? "selected" : ""}>${i + 1}</option>`;
        }
        updateTotal((producto.cantidad * product.precio), producto.id);
        const article = document.createElement("article");
        article.classList.add("box-cart");
        article.innerHTML = `
        <div class="main__article--img">
               <img src=${product.imagen} alt=${product.titulo} />
             </div>
             <div class="main__article--description">
               <h4>${product.titulo}</h4>
               <p>
               ${product.descripcion}
               </p>
               <div class="d-flex justify-content-center ">
                 <button class="hover__btn btn" onclick="deleteProduct(${product.id})">Borrar</button>
               </div>
             </div>
             <div class="main__article--option ">
                <div class="flex__ubication">
                <p>Cantidad</p>
                <select name="cantidad" id="${product.id}" class="cantidad" onchange="changeValue(this.value, ${product.id})">
                  ${options}
               </select>
               </div>
               <p class="flex__ubication">${product.stock} disponibles</p>
               <p class="flex__ubication">$${product.precio} por unidad</p>
             </div>`;
        cartBox.appendChild(article);

        resumenCart.innerHTML += `<p>
        ${producto.cantidad} x ${product.titulo} $${product.precio * producto.cantidad}
      </p>
      <hr />
      `

        total = sumatoria.reduce((total, valor) => total + valor);
        resumenTotal.innerText = total;
      })
  }

}



function obtenerProductos() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart == null) {
    cart = [];
  }
  return cart;
}
function changeValue(value, id) {
  let cart = obtenerProductos();
  let index = cart.findIndex((product) => product.id == id);
  cart[index].cantidad = value;
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function deleteProduct(id) {
  let cart = obtenerProductos();
  let index = cart.findIndex((product) => product.id == id);
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function updateTotal(value, id) {
  let cart = obtenerProductos();
  let index = cart.findIndex((product) => product.id == id);
  cart[index].total = value;
  localStorage.setItem("cart", JSON.stringify(cart));
}



