window.onload = function () {
    let form = document.getElementById("formRegister");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let firstName = document.getElementById("user-name");
        let lastName = document.getElementById("user-last-name");
        let avatar = document.getElementById("avatar");
        let email = document.getElementById("user-email");
        let password = document.getElementById("user-password");
        let confirmPassword = document.getElementById("confirm-user-password");

        let errors = [];
        let clasesAlert = ["border", "border-danger"];

        let mailformat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
        let regex = new RegExp("(.*?).(png|jpg|jpeg)$");

        if (firstName.value < 2) {
            errors.push("El nombre debe tener al menos 2 caracteres.");
            firstName.classList.add(...clasesAlert);
        } else {
            firstName.classList.add(...clasesAlert)
            firstName.classList.remove(...clasesAlert);
        };
        if (lastName.value < 2) {
            errors.push("El apellido debe tener al menos 2 caracteres.");
            lastName.classList.add(...clasesAlert);
        } else {
            lastName.classList.remove(...clasesAlert);
        };
        if (avatar.value != "" && !regex.test(avatar.value)) {
            errors.push("Debe seleccionar un formato de imagen válido (png/jpg/jpeg).");
            avatar.classList.add(...clasesAlert);
        } else {
            avatar.classList.remove(...clasesAlert);
        }
        if (email.value == "") {
            errors.push("El email no puede estar vacio.");
            email.classList.add(...clasesAlert);
        } else if (!email.value.match(mailformat)) {
            errors.push("El email no es valido");
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
        if (confirmPassword.value.length <= 5) {
            errors.push("La confirmación debe tener al menos 6 caracteres.");
            confirmPassword.classList.add(...clasesAlert);
        } else if (confirmPassword.value != password.value) {
            errors.push("Las contraseñas no coinciden.");
            password.classList.add(...clasesAlert);
            confirmPassword.classList.add(...clasesAlert);
        } else {
            confirmPassword.classList.remove(...clasesAlert);
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

/* Sobre la comprobacion de si el email ya existe, crear una api en back, consumirla en front y que ahi
verifique si esta o no ese email. */

/* Agregar que se pueda editar la imagen dentro del edit de usuarios. */