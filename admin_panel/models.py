from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from app1.models import Usuario

class Mesa(models.Model):
    DISPONIBLE = 'Disponible'
    OCUPADA = 'Ocupada'
    RESERVADA = 'Reservada'
    MANTENIMIENTO = 'Mantenimiento'

    ESTADOS = [
        (DISPONIBLE, 'Disponible'),
        (OCUPADA, 'Ocupada'),
        (RESERVADA, 'Reservada'),
        (MANTENIMIENTO, 'Mantenimiento'),
    ]

    numero_mesa = models.PositiveIntegerField(unique=True)
    capacidad = models.IntegerField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default=DISPONIBLE)

    def __str__(self):
        return f"Mesa {self.numero_mesa}"

class Empleado(models.Model):
    ACTIVO = 'Activo'
    DESCANSO = 'Descanso'
    AUSENTE = 'Ausente'

    ESTADOS = [
        (ACTIVO, 'Activo'),
        (DESCANSO, 'Descanso'),
        (AUSENTE, 'Ausente'),
    ]

    usuario = models.OneToOneField(Usuario, on_delete=models.SET_NULL, null=True, blank=True)
    nombre = models.CharField(max_length=150)
    puesto = models.CharField(max_length=100)
    turno = models.CharField(max_length=50)
    horario = models.CharField(max_length=50)
    estado = models.CharField(max_length=20, choices=ESTADOS, default=ACTIVO)

    class Meta:
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre

class Reservacion(models.Model):
    CONFIRMADA = 'Confirmada'
    PENDIENTE = 'Pendiente'
    CANCELADA = 'Cancelada'

    ESTADOS = [
        (CONFIRMADA, 'Confirmada'),
        (PENDIENTE, 'Pendiente'),
        (CANCELADA, 'Cancelada'),
    ]

    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='reservaciones')
    mesa = models.ForeignKey(Mesa, on_delete=models.PROTECT, related_name='reservaciones')
    fecha = models.DateField()
    hora = models.TimeField()
    num_personas = models.PositiveIntegerField()
    estado_reserva = models.CharField(max_length=20, choices=ESTADOS, default=CONFIRMADA)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-fecha", "-hora"]

    def __str__(self):
        return f"{self.cliente.nombre_completo} - Mesa {self.mesa.numero_mesa}"

    def clean(self):
        errors = {}

        if self.fecha and self.fecha < timezone.localdate():
            errors["fecha"] = "No se puede reservar una fecha pasada."

        if self.mesa_id:
            if self.num_personas and self.num_personas > self.mesa.capacidad:
                errors["num_personas"] = "El numero de personas supera la capacidad de la mesa."

            if self.estado_reserva != self.CANCELADA and self.mesa.estado == Mesa.MANTENIMIENTO:
                errors["mesa"] = "No se puede reservar una mesa en mantenimiento."

            if self.fecha and self.hora and self.estado_reserva != self.CANCELADA:
                reserva_existente = Reservacion.objects.filter(
                    mesa=self.mesa,
                    fecha=self.fecha,
                    hora=self.hora,
                ).exclude(estado_reserva=self.CANCELADA)

                if self.pk:
                    reserva_existente = reserva_existente.exclude(pk=self.pk)

                if reserva_existente.exists():
                    errors["hora"] = "Ya existe una reservacion activa para esa mesa en esa fecha y hora."

        if errors:
            raise ValidationError(errors)

    @property
    def personas(self):
        return self.num_personas

    @property
    def estado(self):
        return self.estado_reserva

class ItemInventario(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    cantidad = models.PositiveIntegerField()
    unidad = models.CharField(max_length=20)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre
