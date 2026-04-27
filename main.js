document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // LÓGICA DE LOGIN (CLIENTES Y REGISTRO) - INTACTA
    // ==========================================
    const loginBody = document.querySelector('.login-body');
    if (loginBody) {
        const recoverModal = document.getElementById('recoverModal');
        document.getElementById('openRecoverModal')?.addEventListener('click', (e) => {
            e.preventDefault(); recoverModal.classList.remove('hidden');
        });
        document.getElementById('closeRecoverModal')?.addEventListener('click', () => {
            recoverModal.classList.add('hidden');
        });

        const registerModal = document.getElementById('registerModal');
        document.getElementById('openRegisterModal')?.addEventListener('click', () => {
            registerModal.classList.remove('hidden');
        });
        document.getElementById('closeRegisterModal')?.addEventListener('click', () => {
            registerModal.classList.add('hidden');
        });

        document.getElementById('customerLoginForm')?.addEventListener('submit', (e) => {
            e.preventDefault(); window.location.href = "panelprincipal.html"; 
        });

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
            { id: 1, number: "M1", capacity: 2, status: "available", waiter: null, location: "Salón Principal" },
            { id: 2, number: "M2", capacity: 4, status: "occupied", waiter: "Carlos López", location: "Salón Principal" },
            { id: 3, number: "M3", capacity: 2, status: "occupied", waiter: "Ana García", location: "Terraza Exterior" },
            { id: 4, number: "M4", capacity: 6, status: "available", waiter: null, location: "Terraza Exterior" },
            { id: 5, number: "M5", capacity: 4, status: "reserved", waiter: "María Rodríguez", location: "Área de Recepción" },
            { id: 6, number: "M6", capacity: 2, status: "available", waiter: null, location: "Salón VIP" },
            { id: 7, number: "M7", capacity: 4, status: "available", waiter: null, location: "Terraza Borde" }
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

        // --- FUNCIÓN GENERADORA DE ICONOS SEGÚN CAPACIDAD ---
        window.getTableSVG = function(capacity) {
            // Mesa redonda para 2 personas (Silla arriba y abajo)
            if(capacity <= 2) {
                return `<svg viewBox="0 0 100 100">
                    <rect x="35" y="15" width="30" height="12" rx="4" fill="currentColor"/>
                    <rect x="35" y="73" width="30" height="12" rx="4" fill="currentColor"/>
                    <circle cx="50" cy="50" r="22" fill="currentColor" opacity="0.85"/>
                </svg>`;
            } 
            // Mesa cuadrada para 4 personas (4 Sillas)
            else if(capacity <= 4) {
                return `<svg viewBox="0 0 100 100">
                    <rect x="35" y="10" width="30" height="12" rx="4" fill="currentColor"/>
                    <rect x="35" y="78" width="30" height="12" rx="4" fill="currentColor"/>
                    <rect x="10" y="35" width="12" height="30" rx="4" fill="currentColor"/>
                    <rect x="78" y="35" width="12" height="30" rx="4" fill="currentColor"/>
                    <rect x="28" y="28" width="44" height="44" rx="8" fill="currentColor" opacity="0.85"/>
                </svg>`;
            } 
            // Mesa rectangular grande para 6 o más personas (6 sillas)
            else { 
                return `<svg viewBox="0 0 100 100">
                    <rect x="25" y="10" width="20" height="12" rx="4" fill="currentColor"/>
                    <rect x="55" y="10" width="20" height="12" rx="4" fill="currentColor"/>
                    <rect x="25" y="78" width="20" height="12" rx="4" fill="currentColor"/>
                    <rect x="55" y="78" width="20" height="12" rx="4" fill="currentColor"/>
                    <rect x="10" y="35" width="12" height="30" rx="4" fill="currentColor"/>
                    <rect x="78" y="35" width="12" height="30" rx="4" fill="currentColor"/>
                    <rect x="28" y="28" width="44" height="44" rx="8" fill="currentColor" opacity="0.85"/>
                </svg>`;
            }
        };

        // --- 2. RENDERIZADO DE VISTAS ---

        window.renderMesas = function() {
            const availableCount = tables.filter(t => t.status === "available").length;
            const occupiedCount = tables.filter(t => t.status === "occupied").length;
            const reservedCount = tables.filter(t => t.status === "reserved").length;

            return `
                <div class="top-bar">
                    <div class="page-title">
                        <h2>Gestión de Mesas y Zonas</h2>
                        <p>Plano interactivo con distribución por capacidad</p>
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
                    <p style="font-size: 0.85rem; color: #737F03; margin-bottom: 1rem;">La forma de la mesa indica su capacidad (2, 4 o 6 personas). Tócalas para cambiar su estado.</p>
                    
                    <div class="restaurant-map">
                        <div class="map-zone zone-cocina">🍳 Cocina</div>
                        <div class="map-zone zone-banos">🚻 Baños</div>
                        <div class="map-zone zone-entrada">🚪 Entrada</div>
                        <div class="map-zone zone-salon">🍽️ Salón</div>
                        <div class="map-zone zone-terraza">🌿 Terraza</div>
                        
                        ${tables.map(t => `
                            <div class="map-table color-${t.status} map-pos-${t.id}" onclick="changeTableStatus(${t.id})" title="Mesa ${t.number}">
                                ${getTableSVG(t.capacity)}
                                <span class="map-table-label">${t.number}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="tables-grid">
                    ${tables.map(table => `
                        <div class="table-card color-${table.status}" onclick="changeTableStatus(${table.id})">
                            
                            <div class="table-icon-container color-${table.status}">
                                ${getTableSVG(table.capacity)}
                            </div>

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

        // --- 4. FUNCIONES DEL MODAL ---
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

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // LÓGICA DEL PANEL DE CLIENTE (NUEVA RAMA)
    // ==========================================
    if (document.getElementById('sidebar-cliente')) {
        
        // --- 1. DATOS SIMULADOS DEL CLIENTE Y COPIA DE VARIABLES GLOBALES ---
        window.currentClientPage = "bienvenida";
        
        // Inicializamos las mesas y SVGs si no existen (porque no se cargó el sidebar de empleado)
        if (!window.tables) {
            window.tables = [
                { id: 1, number: "M1", capacity: 2, status: "available", location: "Salón Principal" },
                { id: 2, number: "M2", capacity: 4, status: "occupied", location: "Salón Principal" },
                { id: 3, number: "M3", capacity: 2, status: "occupied", location: "Terraza Exterior" },
                { id: 4, number: "M4", capacity: 6, status: "available", location: "Terraza Exterior" },
                { id: 5, number: "M5", capacity: 4, status: "reserved", location: "Área de Recepción" },
                { id: 6, number: "M6", capacity: 2, status: "available", location: "Salón VIP" },
                { id: 7, number: "M7", capacity: 4, status: "available", location: "Terraza Borde" }
            ];
            
            window.customers = [{ id: 1, name: "Roberto Díaz", email: "roberto.diaz@email.com", phone: "+34 611 111 111" }];
            window.reservations = [{ id: 1, customer: "Roberto Díaz", table: "M5", date: "2026-03-23", time: "20:00", guests: 4, status: "confirmada" }];
            
            window.getTableSVG = function(capacity) {
                if(capacity <= 2) {
                    return `<svg viewBox="0 0 100 100"><rect x="35" y="15" width="30" height="12" rx="4" fill="currentColor"/><rect x="35" y="73" width="30" height="12" rx="4" fill="currentColor"/><circle cx="50" cy="50" r="22" fill="currentColor" opacity="0.85"/></svg>`;
                } else if(capacity <= 4) {
                    return `<svg viewBox="0 0 100 100"><rect x="35" y="10" width="30" height="12" rx="4" fill="currentColor"/><rect x="35" y="78" width="30" height="12" rx="4" fill="currentColor"/><rect x="10" y="35" width="12" height="30" rx="4" fill="currentColor"/><rect x="78" y="35" width="12" height="30" rx="4" fill="currentColor"/><rect x="28" y="28" width="44" height="44" rx="8" fill="currentColor" opacity="0.85"/></svg>`;
                } else { 
                    return `<svg viewBox="0 0 100 100"><rect x="25" y="10" width="20" height="12" rx="4" fill="currentColor"/><rect x="55" y="10" width="20" height="12" rx="4" fill="currentColor"/><rect x="25" y="78" width="20" height="12" rx="4" fill="currentColor"/><rect x="55" y="78" width="20" height="12" rx="4" fill="currentColor"/><rect x="10" y="35" width="12" height="30" rx="4" fill="currentColor"/><rect x="78" y="35" width="12" height="30" rx="4" fill="currentColor"/><rect x="28" y="28" width="44" height="44" rx="8" fill="currentColor" opacity="0.85"/></svg>`;
                }
            };
        }

        window.menuItems = [
            { id: 1, name: "Corte Ribeye", type: "platillo", price: "$350", desc: "300g de carne jugosa con guarnición y salsa de la casa." },
            { id: 2, name: "Salmón a la Parrilla", type: "platillo", price: "$280", desc: "Acompañado de espárragos frescos y puré de papa." },
            { id: 3, name: "Limonada con Menta", type: "bebida", price: "$45", desc: "Bebida refrescante natural con un toque de menta." },
            { id: 4, name: "Vino Tinto", type: "bebida", price: "$120", desc: "Copa de la casa, selección especial." },
            { id: 5, name: "Pastel de Chocolate", type: "postre", price: "$85", desc: "Relleno fundido acompañado de helado de vainilla." }
        ];

        // --- 2. RENDERIZADO DE VISTAS DEL CLIENTE ---
        window.renderBienvenida = function() {
            return `
                <div class="top-bar">
                    <div class="page-title">
                        <h2>FAS Restaurant</h2>
                        <p>Tu experiencia culinaria comienza aquí</p>
                    </div>
                </div>
                <div class="data-section" style="background: linear-gradient(rgba(43, 59, 0, 0.7), rgba(100, 14, 9, 0.7)), url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') center/cover; color: white; padding: 5rem 2rem; border-radius: 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    <h1 style="font-size: 3rem; margin-bottom: 1rem; color: #F7B91A; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">¡Bienvenido a FAS Restaurant!</h1>
                    <p style="font-size: 1.2rem; font-weight: 500; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">Disfruta de los mejores platillos en un ambiente inigualable. Explora nuestro menú y reserva tu mesa favorita hoy mismo.</p>
                    <button class="btn btn-primary" onclick="goToClientPage('reservacion')" style="font-size: 1.1rem; padding: 0.8rem 2rem;">Reservar una Mesa</button>
                </div>
            `;
        };

        window.renderMenu = function() {
            const platillos = menuItems.filter(m => m.type === 'platillo');
            const bebidas = menuItems.filter(m => m.type === 'bebida');
            const postres = menuItems.filter(m => m.type === 'postre');

            const renderCategory = (title, items, icon) => `
                <h3 style="color: #640E09; margin: 1.5rem 0 1rem; border-bottom: 2px solid #F7B91A; padding-bottom: 0.5rem;">${icon} ${title}</h3>
                <div class="tables-grid">
                    ${items.map(item => `
                        <div class="table-card" style="border-left-color: #EB6C0C; transition: transform 0.3s;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                                <h4 style="color:#2B3B00; font-size:1.1rem;">${item.name}</h4>
                                <span class="badge badge-active" style="background: #fff3e0; color: #EB6C0C; font-size: 1rem;">${item.price}</span>
                            </div>
                            <p style="font-size:0.85rem; color:#737F03;">${item.desc}</p>
                        </div>
                    `).join('')}
                </div>
            `;

            return `
                <div class="top-bar"><div class="page-title"><h2>Nuestro Menú</h2><p>Explora nuestras delicias</p></div></div>
                <div class="data-section">
                    ${renderCategory('Platillos Principales', platillos, '🍲')}
                    ${renderCategory('Bebidas', bebidas, '🍹')}
                    ${renderCategory('Postres', postres, '🍰')}
                </div>
            `;
        };

        window.renderPerfilCliente = function() {
            const cliente = window.customers[0];
            const misReservas = window.reservations.filter(r => r.customer === cliente.name);

            return `
                <div class="top-bar"><div class="page-title"><h2>Mi Perfil</h2><p>Información de cuenta y reservaciones</p></div></div>
                <div class="stats-grid">
                    <div class="profile-card data-section" style="margin: 0; text-align: left; border-top: 5px solid #EB6C0C;">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                            <div class="avatar" style="width: 70px; height: 70px; font-size: 2rem;">👤</div>
                            <div>
                                <h3 style="color: #640E09; font-size: 1.5rem;">${cliente.name}</h3>
                                <p style="color: #737F03;">Cliente Registrado</p>
                            </div>
                        </div>
                        <p style="margin-bottom: 0.8rem;"><strong>📧 Correo:</strong> ${cliente.email}</p>
                        <p style="margin-bottom: 0.8rem;"><strong>📞 Teléfono:</strong> ${cliente.phone}</p>
                        <button class="btn-danger" style="margin-top: 1.5rem;" onclick="cerrarSesion()">🚪 Cerrar Sesión</button>
                    </div>

                    <div class="data-section" style="margin: 0; grid-column: span 2;">
                        <div class="section-header"><h3>📅 Mis Reservas de Mesas</h3></div>
                        ${misReservas.length > 0 ? `
                        <div style="overflow-x: auto;">
                            <table>
                                <thead><tr><th>Mesa</th><th>Fecha</th><th>Hora</th><th>Invitados</th><th>Estado</th></tr></thead>
                                <tbody>
                                    ${misReservas.map(r => `
                                        <tr>
                                            <td><strong>${r.table}</strong></td><td>${r.date}</td><td>${r.time}</td><td>${r.guests} personas</td>
                                            <td><span class="badge ${r.status === 'confirmada' ? 'badge-active' : 'badge-descanso'}">${r.status.toUpperCase()}</span></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>` : `<p style="color: #737F03;">No tienes reservaciones activas en este momento.</p>`}
                    </div>
                </div>
            `;
        };

        window.renderReservacion = function() {
            return `
                <div class="top-bar">
                    <div class="page-title">
                        <h2>Reservar Mesa</h2>
                        <p>Selecciona una mesa disponible en el plano para agendar</p>
                    </div>
                </div>

                <div class="data-section">
                    <div class="section-header"><h3>🗺️ Plano General del Restaurante</h3></div>
                    <p style="font-size: 0.85rem; color: #737F03; margin-bottom: 1rem;">Solo puedes seleccionar las mesas en color <strong>verde (Disponibles)</strong>.</p>
                    
                    <div class="restaurant-map">
                        <div class="map-zone zone-cocina">🍳 Cocina</div>
                        <div class="map-zone zone-banos">🚻 Baños</div>
                        <div class="map-zone zone-entrada">🚪 Entrada</div>
                        <div class="map-zone zone-salon">🍽️ Salón</div>
                        <div class="map-zone zone-terraza">🌿 Terraza</div>
                        
                        ${window.tables.map(t => `
                            <div class="map-table color-${t.status} map-pos-${t.id}" 
                                 onclick="${t.status === 'available' ? `abrirModalReservaCliente(${t.id})` : `alert('Lo sentimos, la mesa ${t.number} ya está ocupada o reservada.')`}" 
                                 title="Mesa ${t.number}">
                                ${window.getTableSVG(t.capacity)}
                                <span class="map-table-label">${t.number}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="tables-grid">
                    ${window.tables.filter(t => t.status === 'available').map(table => `
                        <div class="table-card color-${table.status}" onclick="abrirModalReservaCliente(${table.id})">
                            <div class="table-icon-container color-${table.status}">
                                ${window.getTableSVG(table.capacity)}
                            </div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                                <h3 style="color:#640E09; font-size:1.3rem;">${table.number}</h3>
                                <span class="badge badge-active">DISPONIBLE</span>
                            </div>
                            <p style="font-size:0.85rem; color:#737F03; font-weight:bold;">📍 ${table.location}</p>
                            <p style="font-size:0.8rem; color:#4B7001;">Capacidad ideal: ${table.capacity} personas</p>
                            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem; pointer-events: none;">Reservar Esta Mesa</button>
                        </div>
                    `).join('')}
                </div>
            `;
        };

        // --- 3. FUNCIONES DE LÓGICA Y CONTROL ---
        window.abrirModalReservaCliente = function(mesaId) {
            const mesa = window.tables.find(t => t.id === mesaId);
            showModalCliente(`Reservar ${mesa.number} (${mesa.capacity} lugares)`, [
                {name: "date", label: "Fecha de Reservación", type: "date"},
                {name: "time", label: "Hora de Llegada", type: "time"},
                {name: "guests", label: "Número Exacto de Personas", type: "number"}
            ], () => {
                alert(`¡Excelente! Tu solicitud de reserva para la mesa ${mesa.number} ha sido enviada.`);
                goToClientPage('perfil');
            });
        };

        window.goToClientPage = function(page) {
            window.currentClientPage = page;
            document.querySelectorAll('#sidebar-cliente .nav-link').forEach(l => l.classList.remove('active'));
            const activeLink = document.querySelector(`#sidebar-cliente .nav-link[data-page="${page}"]`);
            if(activeLink) activeLink.classList.add('active');
            renderClientPage();
        };

        window.renderClientPage = function() {
            const container = document.getElementById('mainContentCliente');
            if(window.currentClientPage === "bienvenida") container.innerHTML = renderBienvenida();
            else if(window.currentClientPage === "menu") container.innerHTML = renderMenu();
            else if(window.currentClientPage === "reservacion") container.innerHTML = renderReservacion();
            else if(window.currentClientPage === "perfil") container.innerHTML = renderPerfilCliente();
        };

        window.showModalCliente = function(title, fields, onSubmit) {
            const modal = document.getElementById('modal-cliente');
            document.getElementById('modalTitleCliente').textContent = title;
            document.getElementById('modalFieldsCliente').innerHTML = fields.map(f => `
                <div class="form-group"><label>${f.label}</label><input type="${f.type}" name="${f.name}" required></div>
            `).join('');
            const form = document.getElementById('modalFormCliente');
            form.onsubmit = (e) => {
                e.preventDefault();
                onSubmit();
                closeModalCliente();
            };
            modal.style.display = 'flex';
        };

        window.closeModalCliente = function() { 
            document.getElementById('modal-cliente').style.display = 'none'; 
        };

        document.querySelectorAll('#sidebar-cliente .nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                goToClientPage(link.dataset.page);
            });
        });

        renderClientPage();
    }
});