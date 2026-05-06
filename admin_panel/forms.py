from django import forms
from django.contrib.auth.hashers import make_password

from app1.models import Rol, Usuario
from .models import Empleado, ItemInventario, Mesa, Reservacion


class StyledModelForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs.setdefault("class", "input-field")


class MesaForm(StyledModelForm):
    class Meta:
        model = Mesa
        fields = ["numero_mesa", "capacidad", "estado"]
        labels = {
            "numero_mesa": "Numero de mesa",
            "capacidad": "Capacidad",
            "estado": "Estado",
        }


class EmpleadoForm(StyledModelForm):
    correo = forms.EmailField(label="Correo electronico", required=False)
    telefono = forms.CharField(label="Telefono", required=False)
    password = forms.CharField(
        label="Contrasena",
        required=False,
        widget=forms.PasswordInput(attrs={"class": "input-field"}),
        help_text="Solo llenala si quieres crear o cambiar el acceso del empleado.",
    )

    class Meta:
        model = Empleado
        fields = ["nombre", "puesto", "turno", "horario", "estado"]
        labels = {
            "nombre": "Nombre completo",
            "puesto": "Puesto",
            "turno": "Turno",
            "horario": "Horario",
            "estado": "Estado",
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        usuario = getattr(self.instance, "usuario", None)
        if usuario:
            self.fields["correo"].initial = usuario.correo
            self.fields["telefono"].initial = usuario.telefono

    def clean_correo(self):
        correo = self.cleaned_data.get("correo", "").strip().lower()
        if not correo:
            return correo

        usuario_id = self.instance.usuario_id if self.instance and self.instance.pk else None
        exists = Usuario.objects.filter(correo__iexact=correo).exclude(pk=usuario_id).exists()
        if exists:
            raise forms.ValidationError("Ya existe un usuario con este correo.")
        return correo

    def save(self, commit=True):
        empleado = super().save(commit=False)
        correo = self.cleaned_data.get("correo")
        telefono = self.cleaned_data.get("telefono", "")
        password = self.cleaned_data.get("password")

        if correo:
            rol, _ = Rol.objects.get_or_create(nombre=Rol.EMPLEADO)
            usuario = empleado.usuario or Usuario(rol=rol)
            usuario.nombre_completo = empleado.nombre
            usuario.correo = correo
            usuario.telefono = telefono
            usuario.rol = rol
            usuario.activo = empleado.estado != Empleado.AUSENTE
            if password:
                usuario.contrasena = make_password(password)
            elif not usuario.pk:
                usuario.contrasena = make_password("empleado123")
            if commit:
                usuario.save()
            empleado.usuario = usuario

        if commit:
            empleado.save()
        return empleado


class ReservacionForm(StyledModelForm):
    class Meta:
        model = Reservacion
        fields = ["cliente", "mesa", "fecha", "hora", "num_personas", "estado_reserva"]
        labels = {
            "cliente": "Cliente",
            "mesa": "Mesa",
            "fecha": "Fecha",
            "hora": "Hora",
            "num_personas": "Personas",
            "estado_reserva": "Estado",
        }
        widgets = {
            "fecha": forms.DateInput(attrs={"type": "date", "class": "input-field"}),
            "hora": forms.TimeInput(attrs={"type": "time", "class": "input-field"}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["cliente"].queryset = Usuario.objects.filter(rol__nombre=Rol.CLIENTE, activo=True)


class ItemInventarioForm(StyledModelForm):
    class Meta:
        model = ItemInventario
        fields = ["nombre", "categoria", "cantidad", "unidad", "precio"]
        labels = {
            "nombre": "Insumo",
            "categoria": "Categoria",
            "cantidad": "Cantidad",
            "unidad": "Unidad",
            "precio": "Precio unitario",
        }
