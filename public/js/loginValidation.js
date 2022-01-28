window.onload = function () {
    let form = document.getElementById("formLogin");



    form.addEventListener("submit", function (e) {
        e.preventDefault();



        let email = document.querySelector("#email");
        let password = document.querySelector("#password");

        let errors = [];

        let clasesAlert = ["border", "border-danger"];
        let mailformat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;


        if (email.value == "") {
            errors.push("El email no puede estar vacio.");
            email.classList.add(...clasesAlert);
        } else if (!email.value.match(mailformat)) {
            errors.push("El email no es valido.");
            email.classList.add(...clasesAlert);
        } else {
            email.classList.remove(...clasesAlert);
        };
        if (password.value.length <= 5) {
            errors.push("La contraseña debe tener al menos 6 caracteres.");
            password.classList.add(...clasesAlert);
        } else {
            password.classList.remove(...clasesAlert);
        };

        if (errors.length > 0) {
            let ulErrors = document.getElementById("errores");
            ulErrors.innerHTML = "";

            errors.forEach(error => {
                ulErrors.innerHTML += `<li>${error}</li>`;
            })
            document.querySelector(".errores").style.display = "block";

        } else {
            form.submit();
        }

    })
}