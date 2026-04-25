document.addEventListener('DOMContentLoaded', () => {
    console.log("FAS Engine: Reportes e Interfaz listos 📊");

    // 1. FECHA AUTOMÁTICA
    const dateSpan = document.getElementById('current-date');
    if (dateSpan) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateSpan.textContent = new Date().toLocaleDateString('es-MX', options);
    }

    // 2. SELECTOR DE PERIODOS (Reportes)
    const periodBtns = document.querySelectorAll('.btn-period');
    periodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            periodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log(`Cambiando reporte a periodo: ${this.innerText}`);
            // Lalo podrá usar este evento para recargar la gráfica vía API
        });
    });

    // 3. BUSCADOR UNIVERSAL
    const searchInputs = document.querySelectorAll('input[id*="Search"]');
    searchInputs.forEach(input => {
        input.addEventListener('keyup', function() {
            const term = this.value.toLowerCase();
            const table = document.querySelector('.fas-table');
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => row.style.display = row.innerText.toLowerCase().includes(term) ? '' : 'none');
            }
        });
    });

    // 4. FORMATEADOR DE PRECIOS
    document.querySelectorAll('.price-format, .dish-income, .stat-value').forEach(el => {
        if (el.textContent.includes('$')) return; // Evitar doble formato
        const value = parseFloat(el.textContent.replace(/[^0-9.-]+/g,""));
        if (!isNaN(value) && el.textContent.length < 15) { // Evitar formatear IDs
            el.textContent = new Intl.NumberFormat('es-MX', {
                style: 'currency', currency: 'MXN'
            }).format(value);
        }
    });
});

// 5. FUNCIÓN ELIMINAR
function handleDelete(entidad, id) {
    if (confirm(`¿Confirmas la eliminación en ${entidad}?`)) {
        alert(`Petición enviada al servidor para ID: ${id}`);
    }


    // 6. MENÚ DE USUARIO   
    // Al final de main.js
const userToggle = document.getElementById('userMenuToggle');
const userDropdown = document.getElementById('userDropdown');

if (userToggle && userDropdown) {
    userToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Evita que el clic se propague al documento
        console.log("Clic detectado en Admin Eduardo"); // Si sale esto en F12, el JS está bien
        userDropdown.classList.toggle('show');
    });

    // Cerrar si haces clic en cualquier otro lado de la pantalla
    document.addEventListener('click', function() {
        userDropdown.classList.remove('show');
    });
} else {
    console.error("No se encontraron los IDs del menú. Revisa tu base.html");
}
}