# 🎨 Guía de Personalización

Esta guía te ayudará a personalizar la aplicación para tu negocio.

## 1. Datos de la Empresa

### Logo y nombre

**Archivo**: `src/components/BudgetPreview.jsx` y `src/utils/pdfGenerator.js`

Busca y reemplaza:

```javascript
// En BudgetPreview.jsx (línea ~50)
<div className="bg-primary-500 text-white px-6 py-3 rounded-lg">
  <div className="text-sm">Puertas Automáticas</div>
  <div className="text-xl font-bold">ProDoor</div> {/* CAMBIAR AQUÍ */}
</div>

// Dirección de la empresa (línea ~55)
<div className="text-xs text-gray-600 mt-2">
  <p>C/ Ejemplo, 123</p>           {/* CAMBIAR AQUÍ */}
  <p>28001 Madrid</p>               {/* CAMBIAR AQUÍ */}
  <p>Tel: 900 123 456</p>           {/* CAMBIAR AQUÍ */}
</div>
```

Haz lo mismo en `src/utils/pdfGenerator.js` (líneas 37-48).

### Logo personalizado

Para añadir tu logo real:

1. Añade tu logo en `public/logo.png`
2. En `BudgetPreview.jsx`, reemplaza el div del logo con:
   ```jsx
   <img src="/logo.png" alt="Logo" className="h-16" />
   ```

## 2. Precios Base

**Archivo**: `src/utils/priceCalculator.js`

### Tipos de puertas

```javascript
export const DOOR_TYPES = [
  { id: 'corredera', label: 'Corredera', basePrice: 1200 },    // Modificar precio
  { id: 'abatible', label: 'Abatible', basePrice: 1000 },
  // Añadir nuevos tipos:
  { id: 'nuevo_tipo', label: 'Nuevo Tipo', basePrice: 1500 },
]
```

### Materiales

```javascript
export const MATERIALS = [
  { id: 'aluminio', label: 'Aluminio', multiplier: 1.0 },      // Modificar multiplicador
  { id: 'acero', label: 'Acero', multiplier: 1.3 },
  // Añadir nuevos materiales:
  { id: 'nuevo_mat', label: 'Nuevo Material', multiplier: 1.2 },
]
```

### Niveles de automatización

```javascript
export const AUTOMATION_LEVELS = [
  { 
    id: 'basica', 
    label: 'Básica', 
    price: 300,                                                 // Modificar precio
    description: 'Motor estándar + mando a distancia'          // Modificar descripción
  },
  // Añadir nuevos niveles...
]
```

### Accesorios

```javascript
export const ACCESSORIES = [
  { id: 'mando_extra', label: 'Mando a distancia extra', price: 35 },
  // Añadir nuevos accesorios:
  { id: 'nuevo_acc', label: 'Nuevo Accesorio', price: 100 },
]
```

## 3. Cálculos Personalizados

### Precio por metro cuadrado

**Archivo**: `src/utils/priceCalculator.js` (línea 55)

```javascript
export const calculateMaterialPrice = (alto, ancho, material) => {
  const area = alto * ancho
  const materialData = MATERIALS.find(m => m.id === material)
  const pricePerSquareMeter = 150 // CAMBIAR AQUÍ - Precio base por m²
  
  return area * pricePerSquareMeter * (materialData?.multiplier || 1)
}
```

### Mano de obra

**Archivo**: `src/utils/priceCalculator.js` (línea 64)

```javascript
export const calculateLaborCost = (doorType, area) => {
  const baseLabor = 400 // CAMBIAR AQUÍ - Precio base de mano de obra
  const complexityMultiplier = {
    corredera: 1.2,      // CAMBIAR multiplicadores según complejidad
    abatible: 1.0,
    seccional: 1.5,
    // ...
  }
  
  const multiplier = complexityMultiplier[doorType] || 1.0
  const areaSurcharge = area > 10 ? (area - 10) * 30 : 0 // Recargo por área grande
  
  return baseLabor * multiplier + areaSurcharge
}
```

### Transporte

**Archivo**: `src/utils/priceCalculator.js` (línea 80)

```javascript
export const calculateTransportCost = (urgent) => {
  const baseTransport = 150        // CAMBIAR AQUÍ - Precio base de transporte
  const urgentSurcharge = urgent ? 200 : 0  // CAMBIAR - Recargo por urgencia
  
  return baseTransport + urgentSurcharge
}
```

### IVA

**Archivo**: `src/utils/priceCalculator.js` (línea 121)

```javascript
const iva = subtotal * 0.21 // CAMBIAR AQUÍ - IVA 21% (España)
```

## 4. Condiciones Comerciales

### Condiciones en la vista HTML

**Archivo**: `src/components/BudgetPreview.jsx` (línea ~260)

```javascript
<div className="text-xs text-gray-600 space-y-1">
  <p>• Presupuesto válido durante 30 días desde la fecha de emisión.</p>
  <p>• Plazo de entrega: 7-10 días laborables desde la confirmación del pedido.</p>
  <p>• Forma de pago: 50% al confirmar pedido, 50% al finalizar la instalación.</p>
  <p>• Garantía: 2 años en materiales y mano de obra, 5 años en motor.</p>
  <p>• Los precios incluyen transporte dentro de un radio de 50km.</p>
  <p>• Se requiere visita técnica previa para confirmar medidas y viabilidad.</p>
</div>
```

### Condiciones en el PDF

**Archivo**: `src/utils/pdfGenerator.js` (línea ~187)

```javascript
const conditions = [
  '• Presupuesto válido durante 30 días desde la fecha de emisión.',
  // ... modificar según tus condiciones
]
```

## 5. Colores y Tema

### Colores principales

**Archivo**: `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',  // Color principal - CAMBIAR AQUÍ
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      }
    },
  },
},
```

Puedes generar paletas de colores en: https://uicolors.app/create

## 6. Textos y Etiquetas

### Título de la aplicación

**Archivo**: `src/App.jsx` (línea 25)

```jsx
<h1 className="text-2xl font-bold text-gray-900">
  Presupuestos Puertas Automáticas  {/* CAMBIAR AQUÍ */}
</h1>
<p className="text-sm text-gray-600">
  Genera presupuestos profesionales en segundos  {/* CAMBIAR AQUÍ */}
</p>
```

**Archivo**: `index.html` (línea 7)

```html
<title>Presupuestos de Puertas Automáticas</title>  <!-- CAMBIAR AQUÍ -->
```

## 7. Formato de Número de Presupuesto

**Archivo**: `src/components/BudgetForm.jsx` (línea 61)

```javascript
budgetNumber: `PPA-${Date.now().toString().slice(-6)}`  // CAMBIAR prefijo "PPA"
```

Por ejemplo:
- `PRE-${Date.now().toString().slice(-6)}` → PRE-123456
- `2025-${Date.now().toString().slice(-6)}` → 2025-123456

## 8. Añadir Campos Personalizados

### Ejemplo: Añadir campo "Color"

1. **En el formulario** (`src/components/BudgetForm.jsx`):

```javascript
// En el estado inicial (línea 10)
const [formData, setFormData] = useState({
  // ...campos existentes
  color: 'blanco', // AÑADIR
})

// En el JSX, dentro de la sección de características (línea ~120)
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Color
  </label>
  <select
    name="color"
    value={formData.color}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
  >
    <option value="blanco">Blanco</option>
    <option value="gris">Gris</option>
    <option value="negro">Negro</option>
  </select>
</div>
```

2. **En la vista previa** (`src/components/BudgetPreview.jsx`):

```javascript
// Línea ~110, añade:
<p><strong>Color:</strong> {formData.color}</p>
```

3. **En el PDF** (`src/utils/pdfGenerator.js`):

```javascript
// Línea ~100, añade:
addText(`Color: ${formData.color}`, leftMargin + 3, yPos, { size: 9 })
yPos += 5
```

## 9. Testing Local

Después de cualquier cambio:

```bash
npm run dev
```

Prueba todos los flujos:
1. Completa el formulario
2. Genera un presupuesto
3. Descarga el PDF
4. Imprime el presupuesto

## 10. Build y Deploy

Una vez satisfecho con los cambios:

```bash
npm run build
npm run preview  # Para probar el build

# Si todo está bien
git add .
git commit -m "Personalización de precios y datos de empresa"
git push origin main
```

## 📋 Checklist de Personalización

- [ ] Cambiar nombre de empresa
- [ ] Cambiar dirección y contacto
- [ ] Actualizar logo
- [ ] Ajustar precios base
- [ ] Modificar multiplicadores de materiales
- [ ] Actualizar precios de automatización
- [ ] Ajustar precio de mano de obra
- [ ] Modificar coste de transporte
- [ ] Actualizar condiciones comerciales
- [ ] Cambiar colores principales
- [ ] Probar en local
- [ ] Hacer deployment

## 💡 Consejos

- **Backup**: Guarda una copia del `priceCalculator.js` original
- **Incremental**: Haz cambios pequeños y prueba frecuentemente
- **Git**: Haz commits después de cada cambio importante
- **Testing**: Prueba con diferentes combinaciones de opciones

¡Ya está todo listo para personalizar tu aplicación! 🎉
