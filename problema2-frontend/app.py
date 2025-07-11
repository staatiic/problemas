from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('static', path)

def calcular_riesgo(ingreso, credito):
    if credito == 0:
        puntuacion = 0
    else:
        puntuacion = ingreso / credito
    if puntuacion > 1:
        riesgo = "Bajo riesgo"
    elif puntuacion > 0.5:
        riesgo = "Riesgo moderado"
    else:
        riesgo = "Riesgo alto"

    return {"puntuacion": round(puntuacion, 2), "riesgo": riesgo}

# Endpoint para evaluar el riesgo
@app.route('/evaluar', methods=['POST'])
def evaluar():
    data = request.get_json()
    # Validación de campos requeridos
    if not data or 'ingreso' not in data or 'credito' not in data:
        return jsonify({"error": "Faltan campos 'ingreso' o 'credito'"}), 400
    try:
        ingreso = float(data['ingreso'])
        credito = float(data['credito'])
    except (ValueError, TypeError):
        return jsonify({"error": "Los campos deben ser numéricos"}), 400
    if ingreso < 0 or credito < 0:
        return jsonify({"error": "Los valores no pueden ser negativos"}), 400

    resultado = calcular_riesgo(ingreso, credito)
    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True)
