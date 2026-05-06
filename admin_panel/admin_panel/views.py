from django.shortcuts import render

def dashboard(request):
    return render(request, 'dashboard.html')

def empleados(request):
    empleados_list = []
    return render(request, 'empleados.html', {'empleados': empleados_list} )

def mesas(request):
    return render(request, 'mesas.html')

def agregarEmpleado(request):
    return render(request, 'empleado_form.html')

def editarEmpleado(request, id):
    return render(request, 'empleado_form.html')

def agregarMesa(request):
    return render(request, 'mesa_form.html')

def editarMesa(request, id):
    return render(request, 'mesa_form.html')

def reservaciones(request):
    return render(request, 'reservaciones.html')

def agregarReservacion(request):
    return render(request, 'reservacion_form.html')

def inventario(request):
    return render(request, 'inventario.html')

def agregarInventario(request):
    return render(request, 'inventario_form.html')

def editarReservacion(request, id):
    return render(request, 'reservacion_form.html')

def editarInventario(request, id):
    return render(request, 'inventario_form.html')

def reportes(request):
    return render(request, 'reportes.html')