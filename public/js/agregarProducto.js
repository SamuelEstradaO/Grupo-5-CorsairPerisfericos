window.onload = function () {
  const btnAgregar = document.getElementsByClassName("btn__agregar");
  for (let i = 0; i < btnAgregar.length; i++) {
    btnAgregar[i].addEventListener("click", function () {
      let producto = btnAgregar[i].parentNode.parentNode;
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart == null) {
        cart = [];
      }

      const index = cart.findIndex((product) => product.id == producto.id);

      if (index != -1) {
        cart[index].cantidad++;
      } else {
        cart.push({ id: producto.id, cantidad: 1 });
      }
      console.log(cart);

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Producto agregado al carrito");
    });
  }
};
