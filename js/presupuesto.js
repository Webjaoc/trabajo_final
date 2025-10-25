// Creamos un filtro con Js para el formulario de presupuesto
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPresupuesto");
    const alertDiv = form.querySelector(".alert");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alertDiv.innerHTML = ""; 
        let errors = [];

        // Validación nombre
        const nombre = form.nombre.value.trim();
        const nombreRegex = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/; 
        if (nombre.length < 3 || nombre.length >15 || !nombreRegex.test(nombre)) {
            errors.push("El nombre es obligatorio, entre 3 y 15 caracteres y no debe contener números.");
        }

        // Validación apellidos
        const apellidos = form.apellidos.value.trim();
        const apellidosRegex = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/;
        if (apellidos.length < 1 || apellidos.length > 40 || !apellidosRegex.test(apellidos)) {
            errors.push("Los apellidos son obligatorios, entre 1 y 40 caracteres y no deben contener números.");
        }

        // Validación teléfono
        const telefono = form.telefono.value.trim();
        const telRegex = /^[0-9]{1,9}$/;
        if (!telRegex.test(telefono)) {
            errors.push("El teléfono debe tener 9 dígitos.");
        }

        // Validación email
        const email = form.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Correo electrónico no válido.");
        }

        // Validación producto
        const producto = form.producto.value;
        if (!producto) {
            errors.push("Selecciona un producto.");
        }

        // Validación condiciones
        if (!form.condiciones.checked) {
            errors.push("Debes aceptar las políticas de privacidad.");
        }

        // Mostrar errores o enviar formulario
        if (errors.length > 0) {
            alertDiv.innerHTML = errors.join("<br>");
            alertDiv.style.color = "red";
        } else {
            alertDiv.innerHTML = `<h1>Formulario enviado correctamente!</h1>`;
            alertDiv.style.color = "green";
            form.reset();
            setTimeout(() =>{
                alertDiv.innerHTML = "";
            }, 2000);
        }
    });
});
// Aqui calculamos los precios del presupuesto
(() => {
    const tipoPag = document.querySelector("#producto");
    const plazoMes = document.querySelector("#plazos");
    const opciones = document.querySelectorAll(".extra");
    const preTotal = document.querySelector("#total");

    function calcularPresupuesto() {
        let total = 0;

        // Sumar el valor del producto
        total += parseInt(tipoPag.value) || 0;

        // Aumentar el costo según el plazo
        const meses = parseInt(plazoMes.value) || 1;
            if (meses === 2) total += 50;
            else if (meses === 3) total += 100;

        // Sumar los extras seleccionados
        opciones.forEach(extra => {
            if (extra.checked) {
                total += parseInt(extra.value);
            }
        });

        // Mostrar el resultado en el <span>
        preTotal.textContent = total;
    }

    // Eventos para recalcular
    tipoPag.addEventListener("change", calcularPresupuesto);
    plazoMes.addEventListener("input", calcularPresupuesto);
    opciones.forEach(extra => extra.addEventListener("change", calcularPresupuesto));

    // Reset del formulario
    document.querySelector("#resetBtn").addEventListener("click", () => {
        preTotal.textContent = "0";
    });
})();
    


