// Configuración de precios base

export const DOOR_TYPES = [
  { id: "corredera", label: "Corredera", basePrice: 1200 },
  { id: "abatible", label: "Abatible", basePrice: 1000 },
  { id: "seccional", label: "Seccional", basePrice: 1500 },
  { id: "enrollable", label: "Enrollable", basePrice: 1100 },
  { id: "batiente", label: "Batiente", basePrice: 900 },
  { id: "plegable", label: "Plegable", basePrice: 1300 },
];

export const MATERIALS = [
  { id: "aluminio", label: "Aluminio", multiplier: 1.0 },
  { id: "acero", label: "Acero", multiplier: 1.3 },
  { id: "cristal", label: "Cristal", multiplier: 1.5 },
  { id: "mixto", label: "Mixto (Aluminio + Cristal)", multiplier: 1.4 },
  { id: "pvc", label: "PVC", multiplier: 0.8 },
];

export const AUTOMATION_LEVELS = [
  {
    id: "basica",
    label: "Básica",
    price: 300,
    description: "Motor estándar + mando a distancia",
  },
  {
    id: "intermedia",
    label: "Intermedia",
    price: 600,
    description: "Motor + 2 mandos + fotocélulas",
  },
  {
    id: "avanzada",
    label: "Avanzada",
    price: 1000,
    description: "Motor premium + sensores + control app + luces LED",
  },
];

export const ACCESSORIES = [
  { id: "mando_extra", label: "Mando a distancia extra", price: 35 },
  { id: "fotocelulas", label: "Fotocélulas adicionales", price: 80 },
  { id: "lampara", label: "Lámpara de señalización", price: 45 },
  { id: "teclado", label: "Teclado de código", price: 120 },
  { id: "detector", label: "Detector de bucle magnético", price: 200 },
  { id: "bateria", label: "Batería de emergencia", price: 180 },
  { id: "cerradura", label: "Cerradura eléctrica", price: 150 },
];

const PRICE_PER_SQUARE_METER = 150;
const BASE_LABOR = 400;
const BASE_TRANSPORT = 150;
const URGENT_SURCHARGE = 200;
const IVA_RATE = 0.21;

const DOOR_COMPLEXITY = {
  corredera: 1.2,
  abatible: 1.0,
  seccional: 1.5,
  enrollable: 1.3,
  batiente: 1.0,
  plegable: 1.4,
};

export const calculateMaterialPrice = (height, width, material) => {
  // Convertir de mm a metros
  const heightM = height / 1000;
  const widthM = width / 1000;
  const area = heightM * widthM;
  const materialData = MATERIALS.find((m) => m.id === material);
  return area * PRICE_PER_SQUARE_METER * (materialData?.multiplier || 1);
};

export const calculateLaborCost = (doorType, area) => {
  const multiplier = DOOR_COMPLEXITY[doorType] || 1.0;
  const areaSurcharge = area > 10 ? (area - 10) * 30 : 0;
  return BASE_LABOR * multiplier + areaSurcharge;
};

export const calculateTransportCost = (urgent) => {
  return BASE_TRANSPORT + (urgent ? URGENT_SURCHARGE : 0);
};

// Función principal de cálculo de presupuesto
export const calculateBudget = (formData) => {
  const {
    doorType,
    height,
    width,
    material,
    automationLevel,
    accessories,
    urgent,
  } = formData;

  // Convertir de mm a metros para cálculos
  const heightM = parseFloat(height) / 1000;
  const widthM = parseFloat(width) / 1000;
  const area = heightM * widthM;

  const doorTypeData = DOOR_TYPES.find((d) => d.id === doorType);
  const doorBasePrice = doorTypeData?.basePrice || 1000;

  const materialPrice = calculateMaterialPrice(
    parseFloat(height),
    parseFloat(width),
    material
  );

  const automationData = AUTOMATION_LEVELS.find(
    (a) => a.id === automationLevel
  );
  const automationPrice = automationData?.price || 0;

  const accessoriesPrice = accessories.reduce((total, accId) => {
    const accessory = ACCESSORIES.find((a) => a.id === accId);
    return total + (accessory?.price || 0);
  }, 0);

  const laborCost = calculateLaborCost(doorType, area);
  const transportCost = calculateTransportCost(urgent);

  const subtotal =
    doorBasePrice +
    materialPrice +
    automationPrice +
    accessoriesPrice +
    laborCost +
    transportCost;
  const iva = subtotal * IVA_RATE;
  const total = subtotal + iva;

  return {
    breakdown: {
      doorBasePrice,
      materialPrice,
      automationPrice,
      accessoriesPrice,
      laborCost,
      transportCost,
    },
    subtotal,
    iva,
    total,
    details: {
      area: area.toFixed(2),
      doorTypeName: doorTypeData?.label,
      materialName: MATERIALS.find((m) => m.id === material)?.label,
      automationName: automationData?.label,
      accessoriesList: accessories
        .map((accId) => ACCESSORIES.find((a) => a.id === accId))
        .filter(Boolean),
    },
  };
};
