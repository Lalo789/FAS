document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // LÓGICA DE LOGIN (CLIENTES Y REGISTRO)
    // ==========================================
    const loginBody = document.querySelector('.login-body');
    if (loginBody) {
        
        // Modal Recuperar Contraseña
        const recoverModal = document.getElementById('recoverModal');
        document.getElementById('openRecoverModal')?.addEventListener('click', (e) => {
            e.preventDefault();
            recoverModal.classList.remove('hidden');
        });
        document.getElementById('closeRecoverModal')?.addEventListener('click', () => {
            recoverModal.classList.add('hidden');
        });

        // Modal Registro de Cliente (Botón Flotante)
        const registerModal = document.getElementById('registerModal');
        document.getElementById('openRegisterModal')?.addEventListener('click', () => {
            registerModal.classList.remove('hidden');
        });
        document.getElementById('closeRegisterModal')?.addEventListener('click', () => {
            registerModal.classList.add('hidden');
        });

        // Submit Formulario Login Cliente
        document.getElementById('customerLoginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = "panelprincipal.html"; 
        });

        // Submit Formulario Registro Cliente
        document.getElementById('customerRegisterForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Cuenta de cliente creada exitosamente. ¡Bienvenido a FAS Restaurant!");
            registerModal.classList.add('hidden');
        });
    }

    // ==========================================
    // LÓGICA DEL PANEL DE EMPLEADO
    // ==========================================
    if (document.getElementById('sidebar')) {
        
        // --- 1. BASE DE DATOS LOCAL ---
        window.tables = [
            { id: 1, number: "M1", capacity: "2", status: "available", waiter: null, location: "Salón", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80" },
            { id: 2, number: "M2", capacity: "4", status: "occupied", waiter: "Carlos López", location: "Salón", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80" },
            { id: 3, number: "M3", capacity: "2", status: "occupied", waiter: "Ana García", location: "Terraza", image: "https://images.unsplash.com/photo-1572116469696-ed7d9c661c47?w=400&q=80" },
            { id: 4, number: "M4", capacity: "6", status: "available", waiter: null, location: "Terraza", image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&q=80" },
            { id: 5, number: "M5", capacity: "4", status: "reserved", waiter: "María Rodríguez", location: "Entrada", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80" },
            { id: 6, number: "M6", capacity: "2", status: "available", waiter: null, location: "Salón VIP", image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=80" },
            { id: 7, number: "M7", capacity: "4", status: "available", waiter: null, location: "Terraza Borde", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80" }
        ];

        window.employees = [
            { id: 1, name: "Carlos López", role: "Mesero", email: "carlos.lopez@restaurante.com", phone: "+34 612 345 678", shift: "Mañana", schedule: "09:00 - 17:00", status: "Activo" },
            { id: 2, name: "Ana García", role: "Mesera", email: "ana.garcia@restaurante.com", phone: "+34 623 456 789", shift: "Tarde", schedule: "14:00 - 22:00", status: "Activo" },
            { id: 3, name: "María Rodríguez", role: "Mesera", email: "maria.rodriguez@restaurante.com", phone: "+34 634 567 890", shift: "Mañana", schedule: "09:00 - 17:00", status: "Descanso" }
        ];

        window.customers = [
            { id: 1, name: "Roberto Díaz", email: "roberto.diaz@email.com", phone: "+34 611 111 111", visits: 15, lastVisit: "10/03/2026", preferences: "Mesa junto a ventana", rating: 5, status: "Presente" },
            { id: 2, name: "Isabel Moreno", email: "isabel.moreno@email.com", phone: "+34 622 222 222", visits: 8, lastVisit: "08/03/2026", preferences: "Sin gluten", rating: 3, status: "Regular" }
        ];

        window.reservations = [
            { id: 1, customer: "Patricia Navarro", table: "M5", date: "2026-03-23", time: "20:00", guests: 4, status: "confirmada" },
            { id: 2, customer: "Alberto Méndez", table: "M2", date: "2026-03-23", time: "21:30", guests: 2, status: "pendiente" }
        ];

        window.currentPage = "mesas";

        // --- 2. RENDERIZADO DE VISTAS ---

        window.renderMesas = function() {
            const availableCount = tables.filter(t => t.status === "available").length;
            const occupiedCount = tables.filter(t => t.status === "occupied").length;
            const reservedCount = tables.filter(t => t.status === "reserved").length;

            return `
                <div class="top-bar">
                    <div class="page-title">
                        <h2>Gestión de Mesas y Zonas</h2>
                        <p>Plano interactivo y estado en tiempo real</p>
                    </div>
                    <div class="user-info" onclick="goToProfile()">
                        <div class="avatar">👤</div>
                        <span>Empleado: <strong>Carlos López</strong></span>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card"><div class="stat-title">Disponibles</div><div class="stat-number">${availableCount}</div><div class="stat-trend">✅ Libres</div></div>
                    <div class="stat-card"><div class="stat-title">Ocupadas</div><div class="stat-number">${occupiedCount}</div><div class="stat-trend">🔴 En servicio</div></div>
                    <div class="stat-card"><div class="stat-title">Reservadas</div><div class="stat-number">${reservedCount}</div><div class="stat-trend">🕐 Próximamente</div></div>
                </div>

                <div class="data-section">
                    <div class="section-header"><h3>🗺️ Plano General del Restaurante</h3></div>
                    <p style="font-size: 0.85rem; color: #737F03; margin-bottom: 1rem;">Toca las mesas circulares en el plano para actualizar su estado.</p>
                    
                    <div class="restaurant-map">
                        <div class="map-zone zone-cocina">🍳 Cocina</div>
                        <div class="map-zone zone-banos">🚻 Baños</div>
                        <div class="map-zone zone-entrada">🚪 Entrada</div>
                        <div class="map-zone zone-salon">🍽️ Salón</div>
                        <div class="map-zone zone-terraza">🌿 Terraza</div>
                        
                        ${tables.map(t => `
                            <div class="map-table map-${t.status} map-pos-${t.id}" onclick="changeTableStatus(${t.id})" title="Mesa ${t.number}">
                                ${t.number}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="tables-grid">
                    ${tables.map(table => `
                        <div class="table-card ${table.status}" onclick="changeTableStatus(${table.id})">
                            <img src="${table.image}" class="table-image" alt="Zona ${table.location}">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                                <h3 style="color:#640E09; font-size:1.3rem;">${table.number}</h3>
                                <span class="badge ${table.status === 'available' ? 'badge-active' : table.status === 'occupied' ? 'badge-ausente' : 'badge-descanso'}">${table.status.toUpperCase()}</span>
                            </div>
                            <p style="font-size:0.85rem; color:#737F03; font-weight:bold;">📍 ${table.location}</p>
                            <p style="font-size:0.8rem; color:#4B7001;">Capacidad: ${table.capacity} personas</p>
                        </div>
                    `).join('')}
                </div>
            `;
        };

        window.renderPerfil = function() {
            return `
                <div class="top-bar">
                    <div class="page-title"><h2>Mi Perfil</h2><p>Información de tu cuenta</p></div>
                </div>
                <div class="data-section profile-card">
                    <div class="avatar" style="width: 100px; height: 100px; font-size: 3rem; margin: 0 auto 1rem;">👨‍🍳</div>
                    <h2 style="color: #640E09; margin-bottom: 0.5rem; font-size: 1.8rem;">Carlos López</h2>
                    <p style="color: #EB6C0C; font-weight: bold; margin-bottom: 2rem; text-transform: uppercase;">Mesero Principal</p>

                    <div style="text-align: left; background: #f8faf0; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border-left: 4px solid #4B7001;">
                        <p style="margin-bottom: 0.8rem;"><strong>📧 Correo:</strong> carlos.lopez@restaurante.com</p>
                        <p style="margin-bottom: 0.8rem;"><strong>📞 Teléfono:</strong> +34 612 345 678</p>
                        <p style="margin-bottom: 0.8rem;"><strong>⏰ Turno actual:</strong> Mañana (09:00 - 17:00)</p>
                        <p><strong>⭐ Calificación:</strong> 4.8 / 5.0</p>
                    </div>

                    <button class="btn-danger" onclick="cerrarSesion()">🚪 Cerrar Sesión</button>
                </div>
            `;
        };

        window.renderEmpleados = function() {
            return `
                <div class="top-bar"><div class="page-title"><h2>Empleados</h2><p>Gestión de personal</p></div></div>
                <div class="data-section">
                    <div class="section-header"><h3>📋 Lista de Personal</h3><button class="btn btn-primary" onclick="openAddEmployeeModal()">+ Agregar Empleado</button></div>
                    <div style="overflow-x: auto;">
                        <table>
                            <thead><tr><th>EMPLEADO</th><th>CONTACTO</th><th>TURNO</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead>
                            <tbody>
                                ${employees.map(emp => `
                                    <tr>
                                        <td><strong>${emp.name}</strong><br><small>${emp.role}</small></td>
                                        <td>📧 ${emp.email}<br>📞 ${emp.phone}</td>
                                        <td>${emp.shift}</td>
                                        <td><span class="badge ${emp.status === 'Activo' ? 'badge-active' : 'badge-descanso'}">${emp.status}</span></td>
                                        <td><button class="btn btn-primary" onclick="toggleEmployeeStatus(${emp.id})">Cambiar</button></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        };

        window.renderClientes = function() {
            return `
                <div class="top-bar"><div class="page-title"><h2>Clientes</h2><p>Base de datos</p></div></div>
                <div class="data-section">
                    <div class="section-header"><h3>📋 Base de Datos de Clientes</h3><button class="btn btn-primary" onclick="openAddCustomerModal()">+ Agregar Cliente</button></div>
                    <div style="overflow-x: auto;">
                        <table>
                            <thead><tr><th>CLIENTE</th><th>CONTACTO</th><th>VISITAS</th><th>PREFERENCIAS</th></tr></thead>
                            <tbody>
                                ${customers.map(c => `
                                    <tr>
                                        <td><strong>${c.name}</strong></td>
                                        <td>📧 ${c.email}</td>
                                        <td>${c.visits} veces</td>
                                        <td>${c.preferences}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        };

        window.renderReservas = function() {
            return `
                <div class="top-bar"><div class="page-title"><h2>Reservas</h2><p>Gestión activa</p></div></div>
                <div class="data-section">
                    <div class="section-header"><h3>📅 Reservas Activas</h3><button class="btn btn-primary" onclick="openAddReservationModal()">+ Nueva Reserva</button></div>
                    <div style="overflow-x: auto;">
                        <table>
                            <thead><tr><th>Cliente</th><th>Mesa</th><th>Fecha</th><th>Hora</th><th>Acciones</th></tr></thead>
                            <tbody>
                                ${reservations.map(r => `
                                    <tr>
                                        <td>${r.customer}</td><td>${r.table}</td><td>${r.date}</td><td>${r.time}</td>
                                        <td><button class="btn btn-primary" onclick="confirmReservation(${r.id})">Confirmar</button></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        };

        // --- 3. FUNCIONES DE LÓGICA ---
        window.changeTableStatus = function(id) {
            const table = tables.find(t => t.id === id);
            const statuses = ['available', 'occupied', 'reserved'];
            table.status = statuses[(statuses.indexOf(table.status) + 1) % statuses.length];
            renderPage();
        };

        window.toggleEmployeeStatus = function(id) {
            const emp = employees.find(e => e.id === id);
            emp.status = emp.status === "Activo" ? "Descanso" : "Activo";
            renderPage();
        };

        window.confirmReservation = function(id) { alert("Reserva Confirmada"); };
        
        window.goToProfile = function() {
            currentPage = "perfil";
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            renderPage();
        };

        window.cerrarSesion = function() {
            if(confirm("¿Seguro que deseas cerrar sesión?")) { window.location.href = "login.html"; }
        };

        // --- 4. FUNCIONES DEL MODAL ORIGINAL ---
        window.showModal = function(title, fields, onSubmit) {
            const modal = document.getElementById('modal');
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalFields').innerHTML = fields.map(f => `
                <div class="form-group"><label>${f.label}</label><input type="${f.type}" name="${f.name}" required></div>
            `).join('');
            const form = document.getElementById('modalForm');
            form.onsubmit = (e) => {
                e.preventDefault();
                onSubmit();
                closeModal();
            };
            modal.style.display = 'flex';
        };

        window.closeModal = function() { document.getElementById('modal').style.display = 'none'; };

        window.openAddEmployeeModal = function() { showModal("Agregar Empleado", [{name:"name", label:"Nombre", type:"text"}, {name:"role", label:"Rol", type:"text"}], () => { alert("Empleado agregado"); renderPage(); }); };
        window.openAddCustomerModal = function() { showModal("Agregar Cliente", [{name:"name", label:"Nombre", type:"text"}], () => { alert("Cliente agregado"); renderPage(); }); };
        window.openAddReservationModal = function() { showModal("Nueva Reserva", [{name:"customer", label:"Cliente", type:"text"}], () => { alert("Reserva creada"); renderPage(); }); };

        // --- 5. CONTROLADOR DE VISTAS ---
        window.renderPage = function() {
            const container = document.getElementById('mainContent');
            if(currentPage === "mesas") container.innerHTML = renderMesas();
            else if(currentPage === "empleados") container.innerHTML = renderEmpleados();
            else if(currentPage === "clientes") container.innerHTML = renderClientes();
            else if(currentPage === "reservas") container.innerHTML = renderReservas();
            else if(currentPage === "perfil") container.innerHTML = renderPerfil();
        };

        // Navegación lateral
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = link.dataset.page;
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                renderPage();
            });
        });

        // Iniciar app
        renderPage();
    }
});