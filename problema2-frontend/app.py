from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('static', path)

@app.route('/evaluar', methods=['POST'])
def evaluar():
    data = request.json
    ingreso = data['ingreso']
    credito = data['credito']

    puntuacion = ingreso / credito if credito != 0 else 0

    if puntuacion > 1:
        riesgo = "Bajo riesgo"
    elif puntuacion > 0.5:
        riesgo = "Riesgo moderado"
    else:
        riesgo = "Riesgo alto"

    return jsonify({
        "puntuacion": round(puntuacion, 2),
        "riesgo": riesgo
    })

if __name__ == '__main__':
    app.run(debug=True)
