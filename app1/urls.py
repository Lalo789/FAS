from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),
    path('registrar/', views.registro_cliente_view, name='registrar_cliente'),
    path('logout/', views.logout_view, name='logout'),
    path('cliente/', views.cliente_inicio, name='cliente_inicio'),
    path('cliente/menu/', views.cliente_menu, name='cliente_menu'),
    path('cliente/reservar/', views.cliente_reservar, name='cliente_reservar'),
    path('cliente/perfil/', views.cliente_perfil, name='cliente_perfil'),
]
