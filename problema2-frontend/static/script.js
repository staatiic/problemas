const elements = {
    form: document.getElementById('evaluacionForm'),
    ingreso: document.getElementById('ingreso'),
    credito: document.getElementById('credito'),
    loading: document.getElementById('loading'),
    result: document.getElementById('result'),
    error: document.getElementById('error')
};

function toggleElement(element, show, text = '') {
    element.style.display = show ? 'block' : 'none';
    if (text) element.textContent = text;
}

function validateInput(ingreso, credito) {
    if (!ingreso || !credito) {
        return 'Por favor, completa ambos campos.';
    }
    if (isNaN(ingreso) || isNaN(credito)) {
        return 'Ambos campos deben ser números válidos.';
    }
    if (parseFloat(ingreso) < 0 || parseFloat(credito) < 0) {
        return 'Los valores no pueden ser negativos.';
    }
    return null;
}

async function sendEvaluation(data) {
    const response = await fetch('/evaluar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
}

function displayResult(result) {
    const riskText = result.riesgo;
    elements.result.innerHTML = `
        <strong>Puntuación:</strong> ${result.puntuacion}<br>
        <strong>Nivel de Riesgo:</strong> ${riskText}
    `;
    toggleElement(elements.result, true);
}

elements.form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const ingreso = elements.ingreso.value.trim();
    const credito = elements.credito.value.trim();
    
    const validationError = validateInput(ingreso, credito);
    if (validationError) {
        toggleElement(elements.error, true, validationError);
        return;
    }
    
    const data = {
        ingreso: parseFloat(ingreso),
        credito: parseFloat(credito)
    };

    toggleElement(elements.loading, true);
    toggleElement(elements.result, false);
    toggleElement(elements.error, false);

    try {
        const result = await sendEvaluation(data);
        displayResult(result);
    } catch (error) {
        console.error('Error en evaluación:', error);
        toggleElement(elements.error, true, 'Error al procesar la solicitud. Por favor, intenta de nuevo.');
    } finally {
        toggleElement(elements.loading, false);
    }
}); 