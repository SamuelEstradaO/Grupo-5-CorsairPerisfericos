window.onload = function () {
  const btnAgregar = document.getElementsByClassName("btn__agregar");
  const notification = document.getElementById("notification");
  const snackbar = document.createElement("div");
  snackbar.innerText = "Producto agregado al carrito";
  snackbar.id = "snackbar";
  document.body.appendChild(snackbar);
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
      notification.classList.add("show");
      notification.innerText = cart.length
      snackbar.className = "show";
      setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
      }, 3000)
      localStorage.setItem("cart", JSON.stringify(cart));


    });

  }
};
