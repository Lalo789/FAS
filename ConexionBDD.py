import psycopg2

def conectar():
    try:
        conexion = psycopg2.connect(
            user="postgres",
            password="12345",  
            host="127.0.0.1",
            port="5432",
            database="FAS_DB",
            client_encoding='utf-8'
        )
        print("¡CONEXIÓN EXITOSA!.")
        conexion.close()
    except Exception as e:
        print(f"Error: {e}")

conectar()