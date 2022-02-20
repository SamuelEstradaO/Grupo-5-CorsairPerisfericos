window.onload = function () {
    const btnAgregar = document.getElementsByClassName("btn__agregar");
    for (let i = 0; i < btnAgregar.length; i++) {
        btnAgregar[i].addEventListener("click", function () {
            let producto = btnAgregar[i].parentNode.parentNode;
            console.log(producto.id)
            let cart = JSON.parse(localStorage.getItem("cart"));
            if (cart == null) {
                cart = [];
            }
            cart.push(producto.id);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Producto agregado al carrito");
        });

    }


    /*  btnAgregar.(btn => {
         btn.addEventListener("click", function () {
             let producto = btn.parentNode.parentNode;
             console.log(producto) */
    /* let productoAgregado = {
        nombre: producto.querySelector(".main__article--description h4").innerText,
        precio: producto.querySelector(".main__article--option p:nth-child(2)").innerText,
        cantidad: producto.querySelector(".main__article--option select").value,
        total: producto.querySelector(".main__article--option p:nth-child(3)").innerText
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) {
        cart = [];
    }
    cart.push(productoAgregado);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Producto agregado al carrito"); */


    /* console.log(btnAgregar) */
}