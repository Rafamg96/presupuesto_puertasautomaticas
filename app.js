// Precios base por tipo de puerta (precio por m²)
const doorTypePrices = {
    corredera: 450,
    batiente: 380,
    seccional: 520,
    enrollable: 480,
    plegable: 410
};

// Precios por material (multiplicador del precio base)
const materialMultipliers = {
    aluminio: 1.0,
    acero: 1.15,
    cristal: 1.4,
    pvc: 0.85,
    madera: 1.25
};

// Precios de motores
const motorPrices = {
    basico: 350,
    intermedio: 650,
    premium: 1200
};

// Precios de extras
const extraPrices = {
    sensor: 150,
    remote: 80,
    emergency: 200,
    wifi: 120
};

// Precio base de instalación
const installationBasePrice = 300;

// Precios de garantía extendida
const warrantyPrices = {
    1: 0,
    2: 100,
    3: 200,
    5: 350
};

// Nombres descriptivos
const doorTypeNames = {
    corredera: 'Puerta Corredera',
    batiente: 'Puerta Batiente',
    seccional: 'Puerta Seccional',
    enrollable: 'Puerta Enrollable',
    plegable: 'Puerta Plegable'
};

const materialNames = {
    aluminio: 'Aluminio',
    acero: 'Acero',
    cristal: 'Cristal Templado',
    pvc: 'PVC',
    madera: 'Madera'
};

const motorNames = {
    basico: 'Motor Básico',
    intermedio: 'Motor Intermedio',
    premium: 'Motor Premium Industrial'
};

// Manejar el envío del formulario
document.getElementById('budgetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateBudget();
});

function calculateBudget() {
    // Obtener valores del formulario
    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const clientPhone = document.getElementById('clientPhone').value;
    
    const doorType = document.getElementById('doorType').value;
    const doorWidth = parseFloat(document.getElementById('doorWidth').value);
    const doorHeight = parseFloat(document.getElementById('doorHeight').value);
    const material = document.getElementById('material').value;
    const motorType = document.getElementById('motorType').value;
    const installation = document.getElementById('installation').value;
    const warranty = parseInt(document.getElementById('warranty').value);
    
    // Calcular área
    const area = doorWidth * doorHeight;
    
    // Calcular precio base de la puerta
    const baseDoorPrice = doorTypePrices[doorType] * area;
    const materialAdjustedPrice = baseDoorPrice * materialMultipliers[material];
    
    // Obtener precio del motor
    const motorPrice = motorPrices[motorType];
    
    // Calcular extras
    let extrasTotal = 0;
    const selectedExtras = [];
    
    if (document.getElementById('sensor').checked) {
        extrasTotal += extraPrices.sensor;
        selectedExtras.push('Sensores de Seguridad');
    }
    if (document.getElementById('remote').checked) {
        extrasTotal += extraPrices.remote;
        selectedExtras.push('Control Remoto');
    }
    if (document.getElementById('emergency').checked) {
        extrasTotal += extraPrices.emergency;
        selectedExtras.push('Sistema de Emergencia');
    }
    if (document.getElementById('wifi').checked) {
        extrasTotal += extraPrices.wifi;
        selectedExtras.push('Control WiFi/App');
    }
    
    // Calcular instalación
    let installationPrice = 0;
    if (installation === 'si') {
        installationPrice = installationBasePrice + (area * 50);
    }
    
    // Calcular garantía
    const warrantyPrice = warrantyPrices[warranty];
    
    // Calcular total
    const total = materialAdjustedPrice + motorPrice + extrasTotal + installationPrice + warrantyPrice;
    
    // Mostrar resumen
    displayBudgetSummary({
        clientName,
        clientEmail,
        clientPhone,
        doorType,
        doorWidth,
        doorHeight,
        area,
        material,
        motorType,
        installation,
        warranty,
        selectedExtras,
        costs: {
            door: materialAdjustedPrice,
            motor: motorPrice,
            extras: extrasTotal,
            installation: installationPrice,
            warranty: warrantyPrice,
            total: total
        }
    });
}

function displayBudgetSummary(data) {
    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber();
    document.getElementById('invoiceNumber').textContent = invoiceNumber;
    
    // Set dates
    const today = new Date();
    const validUntilDate = new Date(today);
    validUntilDate.setDate(validUntilDate.getDate() + 30);
    
    document.getElementById('invoiceDate').textContent = formatDate(today);
    document.getElementById('validUntil').textContent = formatDate(validUntilDate);
    
    // Mostrar información del cliente
    const clientInfo = document.getElementById('clientInfo');
    clientInfo.innerHTML = `
        <p><strong>Nombre/Razón Social:</strong> ${data.clientName}</p>
        ${data.clientEmail ? `<p><strong>Email:</strong> ${data.clientEmail}</p>` : ''}
        ${data.clientPhone ? `<p><strong>Teléfono:</strong> ${data.clientPhone}</p>` : ''}
    `;
    
    // Mostrar detalles del proyecto
    const projectDetails = document.getElementById('projectDetails');
    projectDetails.innerHTML = `
        <p><strong>Tipo:</strong> ${doorTypeNames[data.doorType]} en ${materialNames[data.material]}</p>
        <p><strong>Dimensiones:</strong> ${data.doorWidth}m × ${data.doorHeight}m (${data.area.toFixed(2)} m²)</p>
        <p><strong>Motor:</strong> ${motorNames[data.motorType]}</p>
        ${data.selectedExtras.length > 0 ? `<p><strong>Extras:</strong> ${data.selectedExtras.join(', ')}</p>` : ''}
        <p><strong>Instalación:</strong> ${data.installation === 'si' ? 'Incluida' : 'No incluida'}</p>
        <p><strong>Garantía:</strong> ${data.warranty} año${data.warranty > 1 ? 's' : ''}</p>
    `;
    
    // Mostrar desglose de costos con formato de factura
    const costBody = document.getElementById('costBody');
    let costRows = '';
    
    costRows += `<tr>
        <td>1</td>
        <td>Puerta ${doorTypeNames[data.doorType]} en ${materialNames[data.material]}<br>
            <small>Dimensiones: ${data.doorWidth}m × ${data.doorHeight}m (${data.area.toFixed(2)} m²)</small></td>
        <td>${formatCurrency(data.costs.door)}</td>
        <td>${formatCurrency(data.costs.door)}</td>
    </tr>`;
    
    costRows += `<tr>
        <td>1</td>
        <td>Sistema de Automatización ${motorNames[data.motorType]}</td>
        <td>${formatCurrency(data.costs.motor)}</td>
        <td>${formatCurrency(data.costs.motor)}</td>
    </tr>`;
    
    if (data.costs.extras > 0) {
        costRows += `<tr>
            <td>1</td>
            <td>Accesorios y Extras<br><small>${data.selectedExtras.join(', ')}</small></td>
            <td>${formatCurrency(data.costs.extras)}</td>
            <td>${formatCurrency(data.costs.extras)}</td>
        </tr>`;
    }
    
    if (data.costs.installation > 0) {
        costRows += `<tr>
            <td>1</td>
            <td>Instalación Profesional</td>
            <td>${formatCurrency(data.costs.installation)}</td>
            <td>${formatCurrency(data.costs.installation)}</td>
        </tr>`;
    }
    
    if (data.costs.warranty > 0) {
        costRows += `<tr>
            <td>1</td>
            <td>Garantía Extendida (${data.warranty} años)</td>
            <td>${formatCurrency(data.costs.warranty)}</td>
            <td>${formatCurrency(data.costs.warranty)}</td>
        </tr>`;
    }
    
    costBody.innerHTML = costRows;
    
    // Calculate and show tax breakdown
    const subtotal = data.costs.total;
    const tax = subtotal * 0.21; // 21% IVA
    const total = subtotal + tax;
    
    document.getElementById('subtotalCost').textContent = formatCurrency(subtotal);
    document.getElementById('taxCost').textContent = formatCurrency(tax);
    document.getElementById('totalCost').textContent = formatCurrency(total);
    
    // Ocultar formulario y mostrar resumen
    document.getElementById('budgetForm').style.display = 'none';
    document.getElementById('budgetSummary').classList.remove('hidden');
    
    // Scroll al resumen
    document.getElementById('budgetSummary').scrollIntoView({ behavior: 'smooth' });
}

function generateInvoiceNumber() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 900000) + 100000;
    return `${year}-${random}`;
}

function formatDate(date) {
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

function printBudget() {
    window.print();
}

function newBudget() {
    // Resetear formulario
    document.getElementById('budgetForm').reset();
    
    // Ocultar resumen y mostrar formulario
    document.getElementById('budgetSummary').classList.add('hidden');
    document.getElementById('budgetForm').style.display = 'block';
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validación adicional para dimensiones razonables
document.getElementById('doorWidth').addEventListener('input', function() {
    if (this.value > 10) {
        alert('El ancho parece ser demasiado grande. Por favor, verifica las dimensiones.');
    }
});

document.getElementById('doorHeight').addEventListener('input', function() {
    if (this.value > 10) {
        alert('La altura parece ser demasiado grande. Por favor, verifica las dimensiones.');
    }
});

// Añadir animación al scroll
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para todos los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
