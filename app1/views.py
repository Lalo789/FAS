from django.shortcuts import render, redirect
from django.db import connection
from django.contrib import messages
from django.contrib.auth import logout 
from django.shortcuts import redirect

def login_view(request):
    if request.method == 'POST':
        # 1. Capturamos los datos del formulario de login
        email = request.POST.get('email')
        password = request.POST.get('password')

        with connection.cursor() as cursor:
            # 2. Consultamos el usuario y su ROL en PostgreSQL
            query = "SELECT nombres, rol_id FROM usuarios WHERE LOWER(correo) = LOWER(%s) AND contrasena = %s;"
            cursor.execute(query, [email, password])
            usuario = cursor.fetchone()

        if usuario:
            nombre, rol_id = usuario
            
            
            if rol_id in [1, 2]: # Administrador 1 o Empleado 2
                return render(request, 'app1/empleado.html', {
                    'nombre': nombre,
                    'rol': 'Administrador' if rol_id == 1 else 'Empleado'
                })
            else: 
                return render(request, 'app1/dashboard_cliente.html', {
                    'nombre': nombre
                })
        else:
            messages.error(request, "Correo o contraseña incorrectos")
            
    # Si es una petición GET o hubo error, regresamos al login
    return render(request, 'app1/login.html')



def registro_cliente_view(request):
    if request.method == 'POST':
        # Capturamos datos del formulario de registro
        nombre = request.POST.get('full_name')
        email = request.POST.get('email')
        telefono = request.POST.get('phone')
        password = request.POST.get('password')
        
        # Rol 3 es asignado automáticamente para Clientes por seguridad
        rol_cliente = 3 

        try:
            with connection.cursor() as cursor:
                sql = """
                    INSERT INTO usuarios (nombres, correo, telefono, contrasena, rol_id)
                    VALUES (%s, %s, %s, %s, %s);
                """
                cursor.execute(sql, [nombre, email, telefono, password, rol_cliente])
            
            messages.success(request, "¡Cuenta creada exitosamente! Ya puedes iniciar sesión.")
            return redirect('login')
        except Exception as e:
            messages.error(request, f"Error al registrar: {e}")

    return render(request, 'app1/login.html')


# Vista para cerrar sesión
def logout_view(request):
    from django.contrib.auth import logout
    logout(request)
    return redirect('login')