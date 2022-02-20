window.onload = function async() {
  let cartBox = document.getElementsByClassName("box-cart");

  //Local Storage
  function obtenerProductos() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) {
      cart = [];
    }
    return cart;
  }
  let productos = obtenerProductos();

  const getProduct = async (productos) => {
    const carrito = [];
    for await (const producto of productos) {
      let product = await fetch(`/api/products/${producto.id}`);
      product = await product.json();
      carrito.push(product);
    }
    // console.log(product);
    return carrito;
  };

  const waiteado = await getProduct(productos);
  console.log(waiteado);

  for (const producto of productos) {
    cartBox.innerHTML += `<div class="main__article--img">
        <img src="\images\#" alt="#" />
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
        <select name="" id="">
          <option value="" disabled selected>Cantidad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p>#</p>
        <p>#</p>
      </div>`;
  }
  // productos.map((producto) => {
  //   const product = getProduct(producto);
  //   cartBox.innerHTML += `<div class="main__article--img">
  //       <img src="\images\#" alt="#" />
  //     </div>
  //     <div class="main__article--description">
  //       <h4>${product.titulo}</h4>
  //       <p>
  //       ${product.descripcion}
  //       </p>
  //       <div>
  //         <ul class="main__article--list">
  //           <li><a href="#">Borrar</a></li>
  //           <li><a href="#">Ir a local</a></li>
  //           <li><a href="#">Guardar</a></li>
  //         </ul>
  //       </div>
  //     </div>
  //     <div class="main__article--option">
  //       <select name="" id="">
  //         <option value="" disabled selected>Cantidad</option>
  //         <option value="1">1</option>
  //         <option value="2">2</option>
  //         <option value="3">3</option>
  //         <option value="4">4</option>
  //         <option value="5">5</option>
  //       </select>
  //       <p>#</p>
  //       <p>#</p>
  //     </div>`;
  // });
  // localStorage.getItem("cart");

  // localStorage.setItem("key", "value");
  // localStorage.getItem("key");
  // localStorage.removeItem("key");
};
