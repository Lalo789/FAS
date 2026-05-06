#!/usr/bin/env python
"""
Script helper para FAS - Gestión de comandos comunes
"""

import os
import sys
import subprocess
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent
VENV_DIR = PROJECT_DIR / 'venv'
VENV_ACTIVATE = VENV_DIR / 'Scripts' / 'activate.bat'

def run_command(cmd, shell=False):
    """Ejecuta un comando y retorna el resultado"""
    try:
        result = subprocess.run(cmd, shell=shell, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✓ {cmd}")
            if result.stdout:
                print(result.stdout)
            return True
        else:
            print(f"✗ Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"✗ Error al ejecutar comando: {e}")
        return False

def install_dependencies():
    """Instala las dependencias del proyecto"""
    print("\n📦 Instalando dependencias...")
    return run_command("pip install -r requirements.txt")

def migrate():
    """Ejecuta migraciones de base de datos"""
    print("\n🔄 Ejecutando migraciones...")
    return run_command("python manage.py migrate")

def createsuperuser():
    """Crea un superusuario"""
    print("\n👤 Creando superusuario...")
    return run_command("python manage.py createsuperuser")

def runserver():
    """Inicia el servidor de desarrollo"""
    print("\n🚀 Iniciando servidor de desarrollo...")
    print("   Disponible en: http://127.0.0.1:8000/")
    print("   Panel admin: http://127.0.0.1:8000/admin/")
    return run_command("python manage.py runserver")

def makemigrations():
    """Crea nuevas migraciones"""
    print("\n🔨 Creando migraciones...")
    return run_command("python manage.py makemigrations")

def test():
    """Ejecuta las pruebas"""
    print("\n🧪 Ejecutando pruebas...")
    return run_command("python manage.py test")

def setup():
    """Setup inicial del proyecto"""
    print("\n=== FAS - Setup Inicial ===\n")
    
    steps = [
        ("Instalar dependencias", install_dependencies),
        ("Migrar base de datos", migrate),
    ]
    
    for step_name, step_func in steps:
        print(f"\n▶ {step_name}...")
        if not step_func():
            print(f"✗ Falló en: {step_name}")
            return False
    
    print("\n✅ Setup completado. Ahora crea un superusuario:")
    print("   python manage.py createsuperuser")
    print("\nLuego inicia el servidor:")
    print("   python manage.py runserver")
    return True

def main():
    """Menú principal"""
    if len(sys.argv) < 2:
        print("""
╔════════════════════════════════════════╗
║  FAS - Script de Gestión del Proyecto  ║
╚════════════════════════════════════════╝

Comandos disponibles:
  setup              - Configuración inicial del proyecto
  install            - Instala dependencias
  migrate            - Ejecuta migraciones
  migrations         - Crea nuevas migraciones
  superuser          - Crea un superusuario
  runserver          - Inicia el servidor de desarrollo
  test               - Ejecuta pruebas

Ejemplo:
  python helper.py setup
  python helper.py runserver
        """)
        return

    command = sys.argv[1].lower()
    
    commands = {
        'setup': setup,
        'install': install_dependencies,
        'migrate': migrate,
        'migrations': makemigrations,
        'superuser': createsuperuser,
        'runserver': runserver,
        'test': test,
    }
    
    if command in commands:
        commands[command]()
    else:
        print(f"❌ Comando no reconocido: {command}")
        print(f"Comandos disponibles: {', '.join(commands.keys())}")

if __name__ == '__main__':
    main()
