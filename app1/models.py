from django.db import models


class Rol(models.Model):
    ADMIN = "Administrador"
    EMPLEADO = "Empleado"
    CLIENTE = "Cliente"

    nombre = models.CharField(max_length=50, unique=True)

    class Meta:
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Usuario(models.Model):
    nombre_completo = models.CharField(max_length=150)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True)
    contrasena = models.CharField(max_length=128)
    rol = models.ForeignKey(Rol, on_delete=models.PROTECT)
    activo = models.BooleanField(default=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["nombre_completo"]

    def __str__(self):
        return f"{self.nombre_completo} ({self.rol.nombre})"


class Producto(models.Model):
    PLATILLO = "platillo"
    BEBIDA = "bebida"
    POSTRE = "postre"

    CATEGORIAS = [
        (PLATILLO, "Platillo"),
        (BEBIDA, "Bebida"),
        (POSTRE, "Postre"),
    ]

    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.CharField(max_length=20, choices=CATEGORIAS, default=PLATILLO)
    disponible = models.BooleanField(default=True)
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True, verbose_name='Imagen del producto')

    class Meta:
        ordering = ["categoria", "nombre"]

    def __str__(self):
        return self.nombre
