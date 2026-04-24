from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),
    path('registrar/', views.registro_cliente_view, name='registrar_cliente'),
    path('logout/', views.logout_view, name='logout'),
]