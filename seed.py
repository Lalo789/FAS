import psycopg2

def poblar_sistema():
    try:
        conexion = psycopg2.connect(
            user="postgres",
            password="12345",
            host="127.0.0.1",
            port="5432",
            database="FAS_DB",
            client_encoding='utf-8'
        )
        cursor = conexion.cursor()

        # 1. Insertar ROLES (Administrador, Empleado, Cliente) [cite: 12, 27]
        roles = [('Administrador',), ('Empleado',), ('Cliente',)]
        cursor.executemany("INSERT INTO public.roles (nombre_rol) VALUES (%s) ON CONFLICT DO NOTHING", roles)

        # 2. Insertar MESAS iniciales [cite: 12, 39]
        mesas = [(1, 4, 'libre'), (2, 2, 'libre'), (3, 6, 'libre')]
        cursor.executemany("INSERT INTO public.mesas (numero_mesa, capacidad, estado) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING", mesas)

        # 3. Insertar PLATILLOS (Menú) [cite: 12, 49]
        platillos = [
            ('Tacos al Pastor', 18.50, 'Orden con piña y salsa'),
            ('Agua Fresca', 25.00, 'Sabor del día 500ml')
        ]
        cursor.executemany("INSERT INTO public.platillos (nombre, precio, descripcion) VALUES (%s, %s, %s)", platillos)

        conexion.commit()
        print("Catálogos base poblados exitosamente.")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if conexion:
            conexion.close()

if __name__ == "__main__":
    poblar_sistema()