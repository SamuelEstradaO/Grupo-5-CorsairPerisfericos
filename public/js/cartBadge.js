const notification = document.getElementById("notification");
let products = JSON.parse(localStorage.getItem("cart"));
if (products.length > 0) {
    notification.classList.add("show");
    notification.innerText = products.length;
}