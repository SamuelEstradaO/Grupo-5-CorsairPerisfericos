window.onload = function () {
  let form = document.getElementById("formProduct");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let productName = document.getElementById("productName");
    let productDescription = document.getElementById("productDescription");
    let imgProduct = document.getElementById("imgProduct");
    let categorias = document.getElementsByName("category");
    let caracteristicas = document.getElementById("productFeatures")
    let price = document.getElementById("price");
    let stock = document.getElementById("stock");

    let errors = [];
    let clasesAlert = ["border", "border-danger"];

    let regex = new RegExp("(.*?).(png|jpg|jpeg)$");
    let isCategory = false;

    if (productName.value < 6) {
      errors.push("El nombre debe tener al menos 5 caracteres.");
      productName.classList.add(...clasesAlert);
    } else {
      productName.classList.remove(...clasesAlert);
    }
    console.log(errors);
    if (productDescription.value.length < 20) {
      errors.push("La descripción debe tener al menos 20 caracteres.");
      productDescription.classList.add(...clasesAlert);
    } else {
      productDescription.classList.remove(...clasesAlert);
    }
    if (imgProduct.value != "" && !regex.test(imgProduct.value)) {
      errors.push(
        "Debe seleccionar un formato de imagen válido (png/jpg/jpeg)."
      );
      imgProduct.classList.add(...clasesAlert);
    } else {
      imgProduct.classList.remove(...clasesAlert);
    }
    if (caracteristicas.value.length < 40) {
      errors.push("Las caracteristicas deben tener al menos 40 caracteres.");
      caracteristicas.classList.add(...clasesAlert);
    } else {
      caracteristicas.classList.remove(...clasesAlert);
    }
    for (let i = 0; i < categorias.length; i++) {
      //   console.log(categorias[i]);
      if (categorias[i].checked) {
        isCategory = true;
      }
    }
    if (!isCategory) {
      errors.push("La categoria debe ser obligatoria");
      document.getElementById("categorias").classList.add(...clasesAlert);
    } else {
      document.getElementById("categorias").classList.remove(...clasesAlert);
    }
    if (!price.value) {
      errors.push("El precio es obligatorio");
      price.classList.add(...clasesAlert);
    } else {
      price.classList.remove(...clasesAlert);
    }
    if (!stock.value) {
      errors.push("El stock es obligatorio");
      stock.classList.add(...clasesAlert);
    } else {
      stock.classList.remove(...clasesAlert);
    }
    if (errors.length > 0) {
      let ulErrors = document.getElementById("errores");
      ulErrors.innerHTML = "";

      errors.forEach((error) => {
        ulErrors.innerHTML += `<li>${error}</li>`;
      });
      document.querySelector(".errores").style.display = "block";
    } else {
      form.submit();
    }
  });
};
