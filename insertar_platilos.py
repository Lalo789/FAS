import psycopg2

def insertar_primer_platillo():
    try:
        conexion = psycopg2.connect(
            user="postgres",
            password="12345",  
            host="127.0.0.1",
            port="5432",
            database="FAS_DB",
        )
        cursor = conexion.cursor()
        
        # Insertamos un platillo de prueba
        sql = "INSERT INTO public.platillos (nombre, precio, descripcion) VALUES (%s, %s, %s)"
        datos = ("Tacos de Pastor", 15, "Pastor en su forma tradicional, servido con piña y cilantro.")
        
        cursor.execute(sql, datos)
        conexion.commit() 
        
        print("Platillo insertado con éxito.")
        
        cursor.close()
        conexion.close()
    except Exception as e:
        print(f"Error: {e}")

insertar_primer_platillo()