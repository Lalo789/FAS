import psycopg2

def conectar():
    try:
        conexion = psycopg2.connect(
            user="postgres",
            password="12345",  # <--- Usa la que acabas de resetear
            host="127.0.0.1",
            port="5432",
            database="FAS_DB",
            client_encoding='utf-8'
        )
        print("¡CONEXIÓN EXITOSA! Por fin entramos.")
        conexion.close()
    except Exception as e:
        # Si vuelve a fallar el decode, imprimimos el binario para leerlo
        print(f"Error: {e}")

conectar()