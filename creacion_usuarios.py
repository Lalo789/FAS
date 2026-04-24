import psycopg2
import os
import getpass 

os.environ['PGMESSAGES'] = 'en_US.UTF-8'

def validar_admin(correo_admin, pass_admin):
    conexion = None
    try:
        conexion = psycopg2.connect(
            user="postgres", 
            password="12345", 
            database="FAS_DB", 
            host="127.0.0.1"
        )
        cursor = conexion.cursor()
        query = "SELECT rol_id FROM usuarios WHERE LOWER(correo) = LOWER(%s) AND contrasena = %s;"
        cursor.execute(query, (correo_admin, pass_admin))
        resultado = cursor.fetchone()
        return resultado is not None and resultado[0] == 1
    except Exception:
        return False
    finally:
        if conexion is not None:
            conexion.close()

def registrar_nuevo_usuario():
    while True:
        print("\n" + "="*45)
        print("--- ACCESO RESTRINGIDO (SOLO ADMINISTRADORES) ---")
        print("="*45)
        
        admin_user = input("Tu correo de Admin: ").strip()
        if admin_user.lower() == 'salir': break
        
        admin_pass = getpass.getpass("Tu contraseña de Admin: ").strip()

        if validar_admin(admin_user, admin_pass):
            print("\n Acceso concedido.")
            nombres = input("Nombre(s): ")
            ap_paterno = input("Apellido Paterno: ")
            ap_materno = input("Apellido Materno: ")
            correo = input("Correo electrónico: ")
            tel = input("Teléfono: ")
            
            password = getpass.getpass("Contraseña para el nuevo usuario: ")
            
            print("Roles: 1: Admin, 2: Empleado, 3: Cliente")
            rol = input("Asignar Rol (ID): ")

            conexion_reg = None
            try:
                conexion_reg = psycopg2.connect(
                    user="postgres", 
                    password="12345", 
                    database="FAS_DB",
                    client_encoding='utf-8'
                )
                cursor = conexion_reg.cursor()
                sql = """
                    INSERT INTO public.usuarios (nombres, apellido_paterno, apellido_materno, correo, telefono, contrasena, rol_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s);
                """
                cursor.execute(sql, (nombres, ap_paterno, ap_materno, correo, tel, password, rol))
                conexion_reg.commit()
                print(f"\n Registro exitoso de: {nombres} {ap_paterno}")
                break 

            except Exception as e:
                error_limpio = str(e).encode('ascii', 'replace').decode('ascii')
                print(f"\n Error al insertar: {error_limpio}")
            finally:
                if conexion_reg is not None: 
                    conexion_reg.close()
        else:
            print("\n Credenciales de Admin incorrectas.")

if __name__ == "__main__":
    registrar_nuevo_usuario()