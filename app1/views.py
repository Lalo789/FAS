from django.contrib import messages
from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone

from admin_panel.models import Mesa, Reservacion
from .models import Producto, Rol, Usuario


def _set_session(request, usuario):
    request.session["usuario_id"] = usuario.id
    request.session["usuario_nombre"] = usuario.nombre_completo
    request.session["rol"] = usuario.rol.nombre


def _cliente_actual(request):
    usuario_id = request.session.get("usuario_id")
    if not usuario_id or request.session.get("rol") != Rol.CLIENTE:
        return None
    return Usuario.objects.filter(pk=usuario_id, activo=True, rol__nombre=Rol.CLIENTE).first()


def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email", "").strip().lower()
        password = request.POST.get("password", "")
        usuario = Usuario.objects.select_related("rol").filter(correo__iexact=email, activo=True).first()

        if usuario and check_password(password, usuario.contrasena):
            _set_session(request, usuario)
            if usuario.rol.nombre in [Rol.ADMIN, Rol.EMPLEADO]:
                return redirect("dashboard")
            return redirect("cliente_inicio")

        messages.error(request, "Correo o contrasena incorrectos.")

    return render(request, "app1/login.html")


def registro_cliente_view(request):
    if request.method == "POST":
        nombre = request.POST.get("full_name", "").strip()
        email = request.POST.get("email", "").strip().lower()
        telefono = request.POST.get("phone", "").strip()
        password = request.POST.get("password", "")

        if Usuario.objects.filter(correo__iexact=email).exists():
            messages.error(request, "Ya existe una cuenta con ese correo.")
            return render(request, "app1/login.html")

        rol_cliente, _ = Rol.objects.get_or_create(nombre=Rol.CLIENTE)
        Usuario.objects.create(
            nombre_completo=nombre,
            correo=email,
            telefono=telefono,
            contrasena=make_password(password),
            rol=rol_cliente,
        )
        messages.success(request, "Cuenta creada exitosamente. Ya puedes iniciar sesion.")
        return redirect("login")

    return render(request, "app1/login.html")


def logout_view(request):
    request.session.flush()
    return redirect("login")


def cliente_inicio(request):
    cliente = _cliente_actual(request)
    if not cliente:
        messages.error(request, "Inicia sesion con una cuenta de cliente.")
        return redirect("login")
    reservaciones = Reservacion.objects.filter(cliente=cliente).select_related("mesa")[:3]
    return render(request, "app1/cliente_inicio.html", {"cliente": cliente, "reservaciones": reservaciones})


def cliente_menu(request):
    cliente = _cliente_actual(request)
    if not cliente:
        messages.error(request, "Inicia sesion con una cuenta de cliente.")
        return redirect("login")
    productos = Producto.objects.filter(disponible=True)
    return render(request, "app1/cliente_menu.html", {"cliente": cliente, "productos": productos})


def cliente_reservar(request):
    cliente = _cliente_actual(request)
    if not cliente:
        messages.error(request, "Inicia sesion con una cuenta de cliente.")
        return redirect("login")

    mesas = Mesa.objects.filter(estado=Mesa.DISPONIBLE).order_by("numero_mesa")
    if request.method == "POST":
        mesa = get_object_or_404(Mesa, pk=request.POST.get("mesa_id"), estado=Mesa.DISPONIBLE)
        fecha = request.POST.get("fecha")
        hora = request.POST.get("hora")
        personas = request.POST.get("personas") or mesa.capacidad

        reservacion = Reservacion(
            cliente=cliente,
            mesa=mesa,
            fecha=fecha,
            hora=hora,
            num_personas=personas,
            estado_reserva=Reservacion.CONFIRMADA,
        )
        try:
            reservacion.full_clean()
        except ValidationError as exc:
            for error_list in exc.message_dict.values():
                for error in error_list:
                    messages.error(request, error)
            return render(
                request,
                "app1/cliente_reservar.html",
                {"cliente": cliente, "mesas": mesas, "fecha_minima": timezone.localdate()},
            )

        reservacion.save()
        mesa.estado = Mesa.RESERVADA
        mesa.save(update_fields=["estado"])
        messages.success(request, "Reservacion confirmada correctamente.")
        return redirect("cliente_perfil")

    return render(
        request,
        "app1/cliente_reservar.html",
        {"cliente": cliente, "mesas": mesas, "fecha_minima": timezone.localdate()},
    )


def cliente_perfil(request):
    cliente = _cliente_actual(request)
    if not cliente:
        messages.error(request, "Inicia sesion con una cuenta de cliente.")
        return redirect("login")

    reservaciones = Reservacion.objects.filter(cliente=cliente).select_related("mesa")
    return render(request, "app1/cliente_perfil.html", {"cliente": cliente, "reservaciones": reservaciones})
