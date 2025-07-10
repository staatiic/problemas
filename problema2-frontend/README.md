# Evaluador de Riesgo Crediticio

Aplicación web sencilla para calcular el riesgo crediticio de una persona en función de su ingreso mensual y el crédito solicitado.

## Instalación

1. Clona este repositorio o descarga los archivos.
2. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

## Uso

1. Ejecuta la aplicación:
   ```bash
   python app.py
   ```
2. Abre tu navegador en [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
3. Llena el formulario y consulta el resultado.

## Estructura del proyecto

- `app.py`: Backend principal con Flask.
- `static/`: Archivos del frontend (HTML, CSS, JS).
- `README.md`: Este archivo.
- `CHANGELOG.md`: Historial de cambios.
- `requirements.txt`: Dependencias del proyecto.

## Notas
- El frontend es responsivo y está separado en archivos HTML, CSS y JS.
- El backend expone una API `/evaluar` para calcular el riesgo. 