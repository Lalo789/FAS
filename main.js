document.addEventListener('DOMContentLoaded', () => {
    // Lógica para Selección de Mesas
    const botonesMesa = document.querySelectorAll('.mesa-btn');
    botonesMesa.forEach(btn => {
        btn.addEventListener('click', () => {
            // Quitar selección previa
            document.querySelectorAll('.mesa-selected').forEach(el => {
                el.classList.remove('mesa-selected', 'ring-4', 'ring-orange-500/20');
            });
            // Aplicar nueva selección
            btn.classList.add('mesa-selected', 'ring-4', 'ring-orange-500/20');
            console.log("Mesa seleccionada:", btn.querySelector('.mesa-id').innerText);
        });
    });

    // Manejo de botones de descarga
    const btnDownload = document.getElementById('btn-download-pdf');
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            alert("Preparando la descarga de tu comprobante en PDF...");
        });
    }
});