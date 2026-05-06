from django.contrib import admin
from .models import Empleado, ItemInventario, Mesa, Reservacion

admin.site.register(Empleado)
admin.site.register(ItemInventario)
admin.site.register(Mesa)
admin.site.register(Reservacion)
