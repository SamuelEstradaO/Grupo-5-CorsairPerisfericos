window.onload = function async() {
  let cartBox = document.querySelector(".box-cart");
  //Local Storage
  let productos = obtenerProductos();
  //update cart
  const updateCart = (e) => {
    console.log(e);
    if (e.target.value) {
      let cart = obtenerProductos();
      let index = cart.findIndex((product) => product.id == e.target.id);
      cart[index].cantidad = e.target.value;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  for (const producto of productos) {
    fetch(`/api/products/${producto.id}`)
      .then((response) => response.json())
      .then(({ product }) => {
        // console.log(product);
        let options = ""
        for (let i = 0; i < product.stock; i++) {
          options += `<option value="${i + 1}" ${producto.cantidad == i + 1 ? "selected" : ""}>${i + 1}</option>`;
        }
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
                 <button class="hover__btn btn ">Borrar</button>
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
        // document.querySelector(`select#${product.id}`).addEventListener("change", updateCart);
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
}