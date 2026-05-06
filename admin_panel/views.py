from datetime import date

from django.contrib import messages
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404, redirect, render

from .forms import EmpleadoForm, ItemInventarioForm, MesaForm, ReservacionForm
from .models import Empleado, ItemInventario, Mesa, Reservacion


def _staff_required(request):
    if request.session.get("rol") not in ["Administrador", "Empleado"]:
        messages.error(request, "Inicia sesion con una cuenta de administrador o empleado.")
        return False
    return True


def _guard_staff(request):
    if not _staff_required(request):
        return redirect("login")
    return None


def dashboard(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    mesas_total = Mesa.objects.count()
    mesas_ocupadas = Mesa.objects.filter(estado=Mesa.OCUPADA).count()
    reservas_hoy = Reservacion.objects.filter(fecha=date.today()).exclude(
        estado_reserva=Reservacion.CANCELADA
    ).count()
    alertas_stock = ItemInventario.objects.filter(cantidad__lte=5).count()

    return render(
        request,
        "dashboard.html",
        {
            "mesas_total": mesas_total,
            "mesas_ocupadas": mesas_ocupadas,
            "reservas_hoy": reservas_hoy,
            "alertas_stock": alertas_stock,
        },
    )


def empleados(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    empleados_list = Empleado.objects.select_related("usuario").all()
    stats = empleados_list.aggregate(
        activos=Count("id", filter=Q(estado=Empleado.ACTIVO)),
        descanso=Count("id", filter=Q(estado=Empleado.DESCANSO)),
        ausentes=Count("id", filter=Q(estado=Empleado.AUSENTE)),
    )
    return render(request, "empleados.html", {"empleados": empleados_list, "stats": stats})


def agregarEmpleado(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    if request.method == "POST":
        form = EmpleadoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Empleado agregado correctamente.")
            return redirect("empleados")
    else:
        form = EmpleadoForm()

    return render(
        request,
        "form_general.html",
        {"form": form, "modo": "Agregar", "entidad": "empleado", "url_cancelar": "empleados"},
    )


def editarEmpleado(request, id):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    empleado = get_object_or_404(Empleado, pk=id)
    if request.method == "POST":
        form = EmpleadoForm(request.POST, instance=empleado)
        if form.is_valid():
            form.save()
            messages.success(request, "Empleado actualizado correctamente.")
            return redirect("empleados")
    else:
        form = EmpleadoForm(instance=empleado)

    return render(
        request,
        "form_general.html",
        {"form": form, "modo": "Editar", "entidad": "empleado", "url_cancelar": "empleados"},
    )


def eliminarEmpleado(request, id):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    empleado = get_object_or_404(Empleado, pk=id)
    if request.method == "POST":
        empleado.delete()
        messages.success(request, "Empleado eliminado correctamente.")
    return redirect("empleados")


def mesas(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    mesas_list = Mesa.objects.all().order_by("numero_mesa")
    stats = {
        "disponibles": mesas_list.filter(estado=Mesa.DISPONIBLE).count(),
        "ocupadas": mesas_list.filter(estado=Mesa.OCUPADA).count(),
        "reservadas": mesas_list.filter(estado=Mesa.RESERVADA).count(),
    }
    return render(request, "mesas.html", {"mesas": mesas_list, "stats": stats})


def agregarMesa(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    if request.method == "POST":
        form = MesaForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Mesa agregada correctamente.")
            return redirect("mesas")
    else:
        form = MesaForm()
    return render(
        request,
        "form_general.html",
        {"form": form, "modo": "Agregar", "entidad": "mesa", "url_cancelar": "mesas"},
    )


def editarMesa(request, id):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    mesa = get_object_or_404(Mesa, pk=id)
    if request.method == "POST":
        form = MesaForm(request.POST, instance=mesa)
        if form.is_valid():
            form.save()
            messages.success(request, "Mesa actualizada correctamente.")
            return redirect("mesas")
    else:
        form = MesaForm(instance=mesa)
    return render(
        request,
        "form_general.html",
        {"form": form, "modo": "Editar", "entidad": "mesa", "url_cancelar": "mesas"},
    )


def eliminarMesa(request, id):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    mesa = get_object_or_404(Mesa, pk=id)
    if request.method == "POST":
        mesa.delete()
        messages.success(request, "Mesa eliminada correctamente.")
    return redirect("mesas")


def reservaciones(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    reservaciones_list = Reservacion.objects.select_related("cliente", "mesa")
    stats = {
        "hoy": reservaciones_list.filter(fecha=date.today()).count(),
        "confirmadas": reservaciones_list.filter(estado_reserva=Reservacion.CONFIRMADA).count(),
        "pendientes": reservaciones_list.filter(estado_reserva=Reservacion.PENDIENTE).count(),
    }
    return render(request, "reservaciones.html", {"reservaciones": reservaciones_list, "stats": stats})


def agregarReservacion(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    if request.method == "POST":
        form = ReservacionForm(request.POST)
        if form.is_valid():
            reservacion = form.save()
            if reservacion.estado_reserva == Reservacion.CONFIRMADA:
                reservacion.mesa.estado = Mesa.RESERVADA
                reservacion.mesa.save(update_fields=["estado"])
            messages.success(request, "Reservacion agregada correctamente.")
            return redirect("reservaciones")
    else:
        form = ReservacionForm()
    return render(
        request,
        "form_general.html",
        {"form": form, "modo": "Agregar", "entidad": "reservacion", "url_cancelar": "reservaciones"},
    )


def editarReservacion(request, id):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    reservacion = get_object_or_404(Reservacion, pk=id)
    mesa_anterior = reservacion.mesa
    if request.method == "POST":
        form = ReservacionForm(request.POST, instance=reservacion)
        if form.is_valid():
            reservacion = form.save()
            if mesa_anterior != reservacion.mesa and not mesa_anterior.reservaciones.exclude(pk=reservacion.pk).exists():
                mesa_anterior.estado = Mesa.DISPONIBLE
                mesa_anterior.save(update_fields=["estado"])
            reservacion.mesa.estado = (
                Mesa.DISPONIBLE if reservacion.estado_reserva == Reservacion.CANCELADA else Mesa.RESERVADA
            )
            reservacion.mesa.save(update_fields=["estado"])
            messages.success(request, "Reservacion actualizada correctamente.")
            return redirect("reservaciones")
    else:
        form = ReservacionForm(instance=reservacion)
    return render(
        request,
        "form_general.html",
        {"form": form, "modo": "Editar", "entidad": "reservacion", "url_cancelar": "reservaciones"},
    )


def eliminarReservacion(request, id):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    reservacion = get_object_or_404(Reservacion, pk=id)
    if request.method == "POST":
        mesa = reservacion.mesa
        reservacion.delete()
        if not mesa.reservaciones.exclude(estado_reserva=Reservacion.CANCELADA).exists():
            mesa.estado = Mesa.DISPONIBLE
            mesa.save(update_fields=["estado"])
        messages.success(request, "Reservacion eliminada correctamente.")
    return redirect("reservaciones")


def inventario(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    inventario_list = ItemInventario.objects.all()
    return render(request, "inventario.html", {"inventario": inventario_list})


def agregarInventario(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    if request.method == "POST":
        form = ItemInventarioForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Insumo agregado correctamente.")
            return redirect("inventario")
    else:
        form = ItemInventarioForm()
    return render(
        request,
        "form_general.html",
        {"form": form, "modo": "Agregar", "entidad": "insumo", "url_cancelar": "inventario"},
    )


def editarInventario(request, id):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    item = get_object_or_404(ItemInventario, pk=id)
    if request.method == "POST":
        form = ItemInventarioForm(request.POST, instance=item)
        if form.is_valid():
            form.save()
            messages.success(request, "Insumo actualizado correctamente.")
            return redirect("inventario")
    else:
        form = ItemInventarioForm(instance=item)
    return render(
        request,
        "form_general.html",
        {"form": form, "modo": "Editar", "entidad": "insumo", "url_cancelar": "inventario"},
    )


def eliminarInventario(request, id):
    blocked = _guard_staff(request)
    if blocked:
        return blocked

    item = get_object_or_404(ItemInventario, pk=id)
    if request.method == "POST":
        item.delete()
        messages.success(request, "Insumo eliminado correctamente.")
    return redirect("inventario")


def reportes(request):
    blocked = _guard_staff(request)
    if blocked:
        return blocked
    return render(request, "reportes.html")
