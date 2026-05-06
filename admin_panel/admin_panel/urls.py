from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    
    # Empleados
    path('empleados/', views.empleados, name='empleados'),
    path('empleados/agregar/', views.agregarEmpleado, name='agregar_empleado'),
    path('empleados/editar/<int:id>/', views.editarEmpleado, name='editar_empleado'),

    # Mesas
    path('mesas/', views.mesas, name='mesas'),
    path('mesas/agregar/', views.agregarMesa, name='agregar_mesa'),
    path('mesas/editar/<int:id>/', views.editarMesa, name='editar_mesa'),

    # Inventario
    path('inventario/', views.inventario, name='inventario'),
    path('inventario/agregar/', views.agregarInventario, name='agregar_inventario'),
    path('inventario/editar/<int:id>/', views.editarInventario, name='editar_inventario'),

    # Reservaciones y Reportes
    path('reservaciones/', views.reservaciones, name='reservaciones'),
    path('reservaciones/agregar/', views.agregarReservacion, name='agregar_reservacion'),
    path('reservaciones/editar/<int:id>/', views.editarReservacion, name='editar_reservacion'),
    
    path('reportes/', views.reportes, name='reportes'),
]