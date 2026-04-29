// ===============================
// VARIABLES RESERVA
// ===============================
let mesaSeleccionada = null;
let capacidadSeleccionada = null;
let ubicacionSeleccionada = null;
let fechaSeleccionada = null;
let horaSeleccionada = null;

// ===============================
// INGREDIENTES DEL MENÚ
// ===============================
const ingredientesMenu = {
    burger: ["Pan", "Carne", "Queso", "Lechuga", "Tomate"],
    pizza: ["Masa", "Queso", "Salsa de tomate", "Pepperoni"],
    hotdog: ["Pan", "Salchicha", "Mostaza", "Catsup"],
    papas: ["Papas", "Sal", "Aceite"],
    veganburger: ["Pan integral", "Carne vegetal", "Lechuga", "Tomate"],
    ensalada: ["Lechuga", "Tomate", "Pepino", "Aderezo"],

    refresco: ["Agua carbonatada", "Azúcar", "Saborizante"],
    jugo: ["Fruta", "Agua", "Azúcar"],
    malteada: ["Leche", "Helado", "Jarabe"],

    nieve: ["Leche", "Azúcar", "Sabor"],
    crepa: ["Harina", "Leche", "Huevo", "Chocolate"],
    pastel: ["Harina", "Huevo", "Azúcar", "Crema"]
};

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    cargarMesasReservadas();

    // ===========================
    // SELECCIÓN DE MESAS
    // ===========================
    const mesas = document.querySelectorAll(".map-table.mesa");

    mesas.forEach(mesa => {
        mesa.addEventListener("click", () => {

            if (mesa.classList.contains("map-occupied")) {
                alert("Esta mesa ya está reservada");
                return;
            }

            document.querySelectorAll(".map-table.mesa").forEach(m => {
                if (!m.classList.contains("map-occupied")) {
                    m.classList.remove('map-reserved');
                    m.classList.add('map-available');
                    m.style.transform = "scale(1)";
                }
            });

            mesa.classList.remove("map-available");
            mesa.classList.add("map-reserved");
            mesa.style.transform = "scale(1.15)";

            mesaSeleccionada = mesa.dataset.mesa;
            capacidadSeleccionada = mesa.dataset.capacidad;
            ubicacionSeleccionada = mesa.dataset.ubicacion;

            actualizarResumen();
        });
    });

    // ===========================
    // FECHA Y HORA
    // ===========================
    const inputFecha = document.getElementById("inputFecha");
    if (inputFecha) {
        inputFecha.addEventListener("change", e => {
            fechaSeleccionada = e.target.value;
        });
    }

    const inputHora = document.getElementById("inputHora");
    if (inputHora) {
        inputHora.addEventListener("change", e => {
            horaSeleccionada = e.target.value;
        });
    }

    cargarReservaPerfil();
});

// ===============================
// TOGGLE INGREDIENTES (LO NUEVO)
// ===============================
function toggle(id, btn) {

    const lista = document.getElementById(id);
    if (!lista) return;

    if (lista.classList.contains("hidden")) {

        // llenar solo si está vacío
        if (lista.innerHTML === "") {
            ingredientesMenu[id].forEach(ing => {
                const li = document.createElement("li");
                li.textContent = ing;
                lista.appendChild(li);
            });
        }

        lista.classList.remove("hidden");
        btn.innerText = "Ocultar Detalles";

    } else {

        lista.classList.add("hidden");
        btn.innerText = "Ver Detalles";
    }
}

// ===============================
// ACTUALIZAR RESUMEN
// ===============================
function actualizarResumen() {
    document.getElementById("resumenMesa").innerText = mesaSeleccionada || "---";
    document.getElementById("resumenCapacidad").innerText = capacidadSeleccionada || "---";
    document.getElementById("resumenUbicacion").innerText = ubicacionSeleccionada || "---";
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
        nombre: "Roberto Díaz",
        email: "roberto@email.com",
        telefono: "+52 000 000 0000",
        tipo: "VIP",
        puntos: 1250,

        mesa: mesaSeleccionada,
        capacidad: capacidadSeleccionada,
        ubicacion: ubicacionSeleccionada,
        fecha: fechaSeleccionada,
        hora: horaSeleccionada,
        personas: capacidadSeleccionada,
        estado: "Confirmada"
    };

    localStorage.setItem("reservaFAS", JSON.stringify(reserva));

    alert("Reserva confirmada");

    window.location.href = "Inicio.html";
}

// ===============================
// CARGAR MESAS OCUPADAS
// ===============================
function cargarMesasReservadas() {

    const data = localStorage.getItem("reservaFAS");
    if (!data) return;

    const reserva = JSON.parse(data);

    const mesa = document.querySelector(`[data-mesa="${reserva.mesa}"]`);

    if (mesa) {
        mesa.classList.remove("map-available", "map-reserved");
        mesa.classList.add("map-occupied");
    }
}

// ===============================
// CARGAR PERFIL + RESERVA
// ===============================
function cargarReservaPerfil() {

    const data = localStorage.getItem("reservaFAS");
    if (!data) return;

    const r = JSON.parse(data);

    const infoReserva = document.getElementById("infoReserva");

    if (infoReserva) {

        infoReserva.innerHTML = `
            <p><strong>Mesa:</strong> ${r.mesa}</p>
            <p><strong>Capacidad:</strong> ${r.capacidad}</p>
            <p><strong>Zona:</strong> ${r.ubicacion}</p>
            <p><strong>Fecha:</strong> ${r.fecha}</p>
            <p><strong>Hora:</strong> ${r.hora}</p>
            <p><strong>Personas:</strong> ${r.personas}</p>
            <p><strong>Estado:</strong> ${r.estado}</p>

            <button class="btn-danger" onclick="cancelarReserva()">
                Cancelar Reservación
            </button>
        `;
    }
}

// ===============================
// CANCELAR RESERVA
// ===============================
function cancelarReserva() {

    const confirmar = confirm("¿Cancelar reservación?");
    if (!confirmar) return;

    const data = localStorage.getItem("reservaFAS");

    if (data) {
        const reserva = JSON.parse(data);

        const mesa = document.querySelector(`[data-mesa="${reserva.mesa}"]`);

        if (mesa) {
            mesa.classList.remove("map-occupied");
            mesa.classList.add("map-available");
        }
    }

    localStorage.removeItem("reservaFAS");

    alert("Reservación cancelada");

    location.reload();
}