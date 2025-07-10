document.getElementById('evaluacionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        ingreso: parseFloat(formData.get('ingreso')),
        credito: parseFloat(formData.get('credito'))
    };

    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('error').style.display = 'none';

    try {
        const response = await fetch('/evaluar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            displayResult(result);
        } else {
            throw new Error('Error en la evaluación');
        }
    } catch (error) {
        document.getElementById('error').textContent = 'Error al procesar la solicitud. Por favor, intenta de nuevo.';
        document.getElementById('error').style.display = 'block';
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    let riskText = '';
    if (result.riesgo === 'Bajo riesgo') {
        riskText = 'Bajo riesgo';
    } else if (result.riesgo === 'Riesgo moderado') {
        riskText = 'Riesgo moderado';
    } else {
        riskText = 'Riesgo alto';
    }
    resultDiv.innerHTML =
        `<strong>Puntuación:</strong> ${result.puntuacion}<br>` +
        `<strong>Nivel de Riesgo:</strong> ${riskText}`;
    resultDiv.style.display = 'block';
} 