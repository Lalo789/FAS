// ===============================
// VARIABLES
// ===============================
let mesaSeleccionada = null;
let capacidadSeleccionada = null;
let ubicacionSeleccionada = null;
let fechaSeleccionada = null;
let horaSeleccionada = null;


// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const mesas = document.querySelectorAll(".mesa.disponible");

    mesas.forEach(mesa => {
        mesa.addEventListener("click", () => {

            // quitar selección anterior
            document.querySelectorAll(".mesa").forEach(m => {
                m.classList.remove("mesa-selected");
            });

            // seleccionar
            mesa.classList.add("mesa-selected");

            // guardar datos (AHORA SÍ FUNCIONA)
            mesaSeleccionada = mesa.dataset.mesa;
            capacidadSeleccionada = mesa.dataset.capacidad;
            ubicacionSeleccionada = mesa.dataset.ubicacion;

            actualizarResumen();
        });
    });

    // FECHA
    const inputFecha = document.getElementById("inputFecha");
    if (inputFecha) {
        inputFecha.addEventListener("change", e => {
            fechaSeleccionada = e.target.value;
            actualizarResumen();
        });
    }

    // HORA
    const inputHora = document.getElementById("inputHora");
    if (inputHora) {
        inputHora.addEventListener("change", e => {
            horaSeleccionada = e.target.value;
            actualizarResumen();
        });
    }

    cargarReservaPerfil();
});


// ===============================
// ACTUALIZAR RESUMEN
// ===============================
function actualizarResumen() {

    const mesaEl = document.getElementById("resumenMesa");
    const capEl = document.getElementById("resumenCapacidad");
    const ubiEl = document.getElementById("resumenUbicacion");
    const fechaEl = document.getElementById("resumenFecha");

    if (mesaEl) mesaEl.innerText = mesaSeleccionada || "---";
    if (capEl) capEl.innerText = capacidadSeleccionada || "---";
    if (ubiEl) ubiEl.innerText = ubicacionSeleccionada || "---";

    if (fechaEl && fechaSeleccionada && horaSeleccionada) {
        fechaEl.innerText = `${fechaSeleccionada} - ${horaSeleccionada}`;
    }
}


// ===============================
// CONFIRMAR RESERVA
// ===============================
function confirmarReserva() {

    if (!mesaSeleccionada || !fechaSeleccionada || !horaSeleccionada) {
        alert("Completa todos los datos");
        return;
    }

    const reserva = {
        mesa: mesaSeleccionada,
        capacidad: capacidadSeleccionada,
        ubicacion: ubicacionSeleccionada,
        fecha: fechaSeleccionada,
        hora: horaSeleccionada
    };

    localStorage.setItem("reservaFAS", JSON.stringify(reserva));

    alert("Reserva guardada correctamente");

    window.location.href = "historial.html";
}


// ===============================
// PERFIL
// ===============================
function cargarReservaPerfil() {

    const data = localStorage.getItem("reservaFAS");
    if (!data) return;

    const r = JSON.parse(data);

    if (document.getElementById("fechaPerfil"))
        document.getElementById("fechaPerfil").innerText = `${r.fecha} - ${r.hora}`;

    if (document.getElementById("mesaPerfil"))
        document.getElementById("mesaPerfil").innerText = r.mesa;

    if (document.getElementById("zonaPerfil"))
        document.getElementById("zonaPerfil").innerText = r.ubicacion || "Sin zona";
}


document.addEventListener("DOMContentLoaded", () => {

    const contenedorQR = document.getElementById("qrContainer");

    if (!contenedorQR) {
        console.error("❌ No existe qrContainer en el HTML");
        return;
    }

    const data = JSON.parse(localStorage.getItem("reservaFAS") || "{}");

    const cliente = {
        nombre: "Roberto Díaz",
        correo: "roberto@email.com",
        telefono: "4431234567"
    };

    // ======================
    // MOSTRAR DATOS
    // ======================
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value || "---";
    };

    setText("clienteNombre", cliente.nombre);
    setText("clienteCorreo", cliente.correo);
    setText("clienteTelefono", cliente.telefono);

    setText("resMesa", data.mesa);
    setText("resZona", data.ubicacion);
    setText("resCapacidad", data.capacidad);
    setText("resFecha", data.fecha);
    setText("resHora", data.hora);

    // ======================
    // GENERAR TEXTO QR
    // ======================
    const qrText = `
Cliente: ${cliente.nombre}
Correo: ${cliente.correo}
Mesa: ${data.mesa || "---"}
Zona: ${data.ubicacion || "---"}
Capacidad: ${data.capacidad || "---"}
Fecha: ${data.fecha || "---"}
Hora: ${data.hora || "---"}
    `;

    // ======================
    // LIMPIAR ANTES DE CREAR
    // ======================
    contenedorQR.innerHTML = "";

    // ======================
    // GENERAR QR
    // ======================
    new QRCode(contenedorQR, {
        text: qrText.trim(),
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

});