window.onload = function async() {
  let cartBox = document.querySelector(".box-cart");

  //Local Storage
  function obtenerProductos() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) {
      cart = [];
    }
    return cart;
  }
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
               <div>
                 <ul class="main__article--list">
                   <li><a href="#">Borrar</a></li>
                   <li><a href="#">Ir a local</a></li>
                   <li><a href="#">Guardar</a></li>
                 </ul>
               </div>
             </div>
             <div class="main__article--option">
                <p>Cantidad</p>
                <select name="cantidad" id="${product.id}" class="cantidad">
                  ${options}
               </select>
               <p>${product.stock} disponibles</p>
               <p>$${product.precio} por unidad</p>
             </div>`;
        cartBox.appendChild(article);
        document.querySelector(`select#${product.id}`).addEventListener("change", updateCart);

      })
  }

}
