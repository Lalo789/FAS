from django.contrib import admin
from .models import Producto, Rol, Usuario

admin.site.register(Rol)
admin.site.register(Usuario)
admin.site.register(Producto)
