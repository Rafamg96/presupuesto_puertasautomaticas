import { useState } from "react";
import {
  Calculator,
  Ruler,
  Package,
  Settings,
  MapPin,
  Clock,
} from "lucide-react";
import {
  DOOR_TYPES,
  MATERIALS,
  AUTOMATION_LEVELS,
  ACCESSORIES,
  calculateBudget,
} from "../utils/priceCalculator";

const BudgetForm = ({ onGenerateBudget }) => {
  const [formData, setFormData] = useState({
    clientName: "Juan Pérez García",
    clientEmail: "juan.perez@ejemplo.com",
    clientPhone: "612 345 678",
    doorType: "corredera",
    heightExterior: "1000",
    heightInterior: "2500",
    widthInterior: "4000",
    widthExterior: "1000",
    material: "aluminio",
    automationLevel: "intermedia",
    accessories: ["fotocélulas", "luz-intermitente"],
    urgent: false,
    location: "Madrid, España",
    observations:
      "Instalación en nave industrial. Acceso disponible de lunes a viernes de 8:00 a 18:00h.",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAccessoryToggle = (accessoryId) => {
    setFormData((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(accessoryId)
        ? prev.accessories.filter((id) => id !== accessoryId)
        : [...prev.accessories, accessoryId],
    }));
  };

  const saveBudgetToLocalStorage = (budgetData) => {
    try {
      const savedBudgets = JSON.parse(localStorage.getItem("budgets") || "[]");
      savedBudgets.push(budgetData);
      localStorage.setItem("budgets", JSON.stringify(savedBudgets.slice(-10)));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Para los cálculos usamos las medidas interiores (real de la puerta)
    const calcInput = {
      ...formData,
      height: formData.heightInterior || formData.height,
      width: formData.widthInterior || formData.width,
    };

    const budget = calculateBudget(calcInput);

    const completeData = {
      ...formData,
      // mantener las keys height/width para compatibilidad con otras partes
      height: calcInput.height,
      width: calcInput.width,
      ...budget,
      date: new Date().toLocaleDateString("es-ES"),
      budgetNumber: `PPA-${Date.now().toString().slice(-6)}`,
    };

    saveBudgetToLocalStorage(completeData);
    onGenerateBudget(completeData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ClientDataSection formData={formData} handleChange={handleChange} />

      <DoorSpecsSection
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
      />

      <AutomationSection formData={formData} setFormData={setFormData} />

      <AccessoriesSection
        formData={formData}
        handleAccessoryToggle={handleAccessoryToggle}
      />

      <LocationSection formData={formData} handleChange={handleChange} />

      <ObservationsSection formData={formData} handleChange={handleChange} />

      <div className="flex justify-center">
        <button
          type="submit"
          className="flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-bold text-lg rounded-xl hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
        >
          <Calculator className="h-6 w-6" />
          Generar Presupuesto
        </button>
      </div>
    </form>
  );
};

const ClientDataSection = ({ formData, handleChange }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <Package className="h-5 w-5 text-primary-500" />
      Datos del Cliente
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nombre completo *
        </label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Juan Pérez"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          name="clientEmail"
          value={formData.clientEmail}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="juan@ejemplo.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          name="clientPhone"
          value={formData.clientPhone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="612 345 678"
        />
      </div>
    </div>
  </div>
);

const DoorSpecsSection = ({ formData, handleChange, setFormData }) => {
  // Convertir mm a metros para mostrar equivalencias
  const heightExtM = (Number(formData.heightExterior) / 1000).toFixed(2);
  const heightIntM = (Number(formData.heightInterior) / 1000).toFixed(2);
  const widthIntM = (Number(formData.widthInterior) / 1000).toFixed(2);
  const widthExtM = (Number(formData.widthExterior) / 1000).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Ruler className="h-5 w-5 text-primary-500" />
        Características de la Puerta
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo de puerta *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {DOOR_TYPES.map((door) => (
              <button
                key={door.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, doorType: door.id }))
                }
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.doorType === door.id
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                }`}
              >
                <div className="text-sm font-medium">{door.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Base: {door.basePrice}€
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Diagrama Visual de Medidas */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
            ESQUEMA DE MEDIDAS
          </h3>
          <DoorDiagram
            dintelHeightMm={formData.heightExterior}
            pilarWidthMm={formData.widthExterior}
            widthIntMm={formData.widthInterior}
            heightIntMm={formData.heightInterior}
          />
        </div>

        {/* Sección de medidas exterior/interior */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Dintel (mm)
            </label>
            <input
              type="number"
              name="heightExterior"
              value={formData.heightExterior}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  heightExterior: e.target.value,
                }))
              }
              step="10"
              min="1000"
              max="10000"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Equivalente: {heightExtM} m
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Alto Interior (mm)
            </label>
            <input
              type="number"
              name="heightInterior"
              value={formData.heightInterior}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  heightInterior: e.target.value,
                  height: e.target.value,
                }))
              }
              step="10"
              min="1000"
              max="10000"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Equivalente: {heightIntM} m
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pilar (mm)
            </label>
            <input
              type="number"
              name="widthExterior"
              value={formData.widthExterior}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  widthExterior: e.target.value,
                }))
              }
              step="10"
              min="1000"
              max="20000"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Equivalente: {widthExtM} m
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ancho Interior (mm)
            </label>
            <input
              type="number"
              name="widthInterior"
              value={formData.widthInterior}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  widthInterior: e.target.value,
                  width: e.target.value,
                }))
              }
              step="10"
              min="1000"
              max="20000"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Equivalente: {widthIntM} m
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Material *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {MATERIALS.map((mat) => (
              <button
                key={mat.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, material: mat.id }))
                }
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.material === mat.id
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                }`}
              >
                <div className="text-sm font-medium">{mat.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AutomationSection = ({ formData, setFormData }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <Settings className="h-5 w-5 text-primary-500" />
      Nivel de Automatización
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {AUTOMATION_LEVELS.map((level) => (
        <button
          key={level.id}
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, automationLevel: level.id }))
          }
          className={`p-4 rounded-lg border-2 transition-all text-left ${
            formData.automationLevel === level.id
              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30"
              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700"
          }`}
        >
          <div className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
            {level.label}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {level.description}
          </div>
          <div className="text-primary-600 dark:text-primary-400 font-bold">
            +{level.price}€
          </div>
        </button>
      ))}
    </div>
  </div>
);

const AccessoriesSection = ({ formData, handleAccessoryToggle }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      Accesorios Adicionales
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {ACCESSORIES.map((accessory) => (
        <label
          key={accessory.id}
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer bg-white dark:bg-gray-700"
        >
          <input
            type="checkbox"
            checked={formData.accessories.includes(accessory.id)}
            onChange={() => handleAccessoryToggle(accessory.id)}
            className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {accessory.label}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              +{accessory.price}€
            </div>
          </div>
        </label>
      ))}
    </div>
  </div>
);

const LocationSection = ({ formData, handleChange }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <MapPin className="h-5 w-5 text-primary-500" />
      Ubicación y Entrega
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Ubicación de la instalación
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Madrid, España"
        />
      </div>

      <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer bg-white dark:bg-gray-700">
        <input
          type="checkbox"
          name="urgent"
          checked={formData.urgent}
          onChange={handleChange}
          className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
        />
        <div className="flex items-center gap-2 flex-1">
          <Clock className="h-5 w-5 text-orange-500" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              Instalación urgente
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Recargo de 200€ por instalación prioritaria (48-72h)
            </div>
          </div>
        </div>
      </label>
    </div>
  </div>
);

const ObservationsSection = ({ formData, handleChange }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      Observaciones Adicionales
    </h2>
    <textarea
      name="observations"
      value={formData.observations}
      onChange={handleChange}
      rows="4"
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      placeholder="Cualquier detalle adicional sobre la instalación..."
    />
  </div>
);

// Componente de diagrama visual de la puerta
const DoorDiagram = ({
  dintelHeightMm,
  pilarWidthMm,
  widthIntMm,
  heightIntMm,
}) => {
  // Convertir a números y aplicar valores por defecto
  const dintelHeight = parseInt(dintelHeightMm) || 250;
  const pilarWidth = parseInt(pilarWidthMm) || 450;
  const doorWidth = parseInt(widthIntMm) || 4000;
  const doorHeight = parseInt(heightIntMm) || 2500;

  // Escala para el SVG (reducida para diagrama más compacto)
  const scale = 0.015;
  const svgHeight = 180;
  const svgWidth = 280;

  // Cálculos de dimensiones escaladas
  const doorHeightScaled = doorHeight * scale;
  const doorWidthScaled = doorWidth * scale;

  // Dintel y Pilar son valores directos (no diferencias)
  const dintelScaled = dintelHeight * scale;
  const pilarScaled = pilarWidth * scale;

  // Dimensiones totales
  const totalWidthScaled = doorWidthScaled + pilarScaled * 2;
  const totalHeightScaled = doorHeightScaled + dintelScaled;

  // Posiciones para centrar todo en el SVG
  const overallStartX = (svgWidth - totalWidthScaled) / 2;
  const overallStartY = (svgHeight - totalHeightScaled) / 2;
  const doorStartX = overallStartX + pilarScaled;
  const doorStartY = overallStartY + dintelScaled;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="w-full h-auto"
      style={{ maxHeight: "250px" }}
    >
      {/* Gradientes */}
      <defs>
        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="lateralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Dintel superior (verde) */}
      <rect
        x={doorStartX}
        y={overallStartY}
        width={doorWidthScaled}
        height={dintelScaled}
        fill="#10b981"
        stroke="#059669"
        strokeWidth="2"
      />

      {/* Pilar izquierdo */}
      <rect
        x={overallStartX}
        y={doorStartY}
        width={pilarScaled}
        height={doorHeightScaled}
        fill="url(#lateralGradient)"
        stroke="#059669"
        strokeWidth="2"
      />

      {/* Puerta principal (interior) */}
      <rect
        x={doorStartX}
        y={doorStartY}
        width={doorWidthScaled}
        height={doorHeightScaled}
        fill="url(#doorGradient)"
        stroke="#1e40af"
        strokeWidth="2"
        rx="4"
      />

      {/* Pilar derecho */}
      <rect
        x={doorStartX + doorWidthScaled}
        y={doorStartY}
        width={pilarScaled}
        height={doorHeightScaled}
        fill="url(#lateralGradient)"
        stroke="#059669"
        strokeWidth="2"
      />

      {/* Línea de medida - Dintel (arriba izquierda) */}
      <g>
        <line
          x1={overallStartX - 25}
          y1={overallStartY}
          x2={overallStartX - 25}
          y2={doorStartY}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gray-700 dark:text-gray-400"
        />
        <polygon
          points={`${overallStartX - 25},${overallStartY} ${
            overallStartX - 29
          },${overallStartY + 6} ${overallStartX - 21},${overallStartY + 6}`}
          fill="currentColor"
          className="text-gray-700 dark:text-gray-400"
        />
        <polygon
          points={`${overallStartX - 25},${doorStartY} ${overallStartX - 29},${
            doorStartY - 6
          } ${overallStartX - 21},${doorStartY - 6}`}
          fill="currentColor"
          className="text-gray-700 dark:text-gray-400"
        />
        <text
          x={overallStartX - 32}
          y={(overallStartY + doorStartY) / 2}
          fill="currentColor"
          fontSize="10"
          fontWeight="bold"
          textAnchor="end"
          transform={`rotate(-90, ${overallStartX - 32}, ${
            (overallStartY + doorStartY) / 2
          })`}
          className="text-gray-900 dark:text-gray-100 select-text"
        >
          Dintel
        </text>
      </g>

      {/* Línea de medida - Alto Interior (lado izquierdo, debajo del dintel) */}
      <g>
        <line
          x1={overallStartX - 12}
          y1={doorStartY}
          x2={overallStartX - 12}
          y2={doorStartY + doorHeightScaled}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary-600 dark:text-primary-400"
        />
        <polygon
          points={`${overallStartX - 12},${doorStartY} ${overallStartX - 16},${
            doorStartY + 6
          } ${overallStartX - 8},${doorStartY + 6}`}
          fill="currentColor"
          className="text-primary-600 dark:text-primary-400"
        />
        <polygon
          points={`${overallStartX - 12},${doorStartY + doorHeightScaled} ${
            overallStartX - 16
          },${doorStartY + doorHeightScaled - 6} ${overallStartX - 8},${
            doorStartY + doorHeightScaled - 6
          }`}
          fill="currentColor"
          className="text-primary-600 dark:text-primary-400"
        />
        <text
          x={overallStartX - 18}
          y={doorStartY + doorHeightScaled / 2}
          fill="currentColor"
          fontSize="10"
          fontWeight="bold"
          textAnchor="end"
          transform={`rotate(-90, ${overallStartX - 18}, ${
            doorStartY + doorHeightScaled / 2
          })`}
          className="text-primary-700 dark:text-primary-300 select-text"
        >
          Alto interior
        </text>
      </g>

      {/* Línea de medida - Pilar (lateral izquierdo, parte superior) */}
      <g>
        <line
          x1={overallStartX}
          y1={overallStartY - 12}
          x2={doorStartX}
          y2={overallStartY - 12}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gray-700 dark:text-gray-400"
        />
        <polygon
          points={`${overallStartX},${overallStartY - 12} ${
            overallStartX + 6
          },${overallStartY - 16} ${overallStartX + 6},${overallStartY - 8}`}
          fill="currentColor"
          className="text-gray-700 dark:text-gray-400"
        />
        <polygon
          points={`${doorStartX},${overallStartY - 12} ${doorStartX - 6},${
            overallStartY - 16
          } ${doorStartX - 6},${overallStartY - 8}`}
          fill="currentColor"
          className="text-gray-700 dark:text-gray-400"
        />
        <text
          x={(overallStartX + doorStartX) / 2}
          y={overallStartY - 16}
          fill="currentColor"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          className="text-gray-900 dark:text-gray-100 select-text"
        >
          Pilar
        </text>
      </g>

      {/* Línea de medida - Ancho Interior (puerta, parte inferior) */}
      <g>
        <line
          x1={doorStartX}
          y1={doorStartY + doorHeightScaled + 20}
          x2={doorStartX + doorWidthScaled}
          y2={doorStartY + doorHeightScaled + 20}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary-600 dark:text-primary-400"
        />
        <polygon
          points={`${doorStartX},${doorStartY + doorHeightScaled + 20} ${
            doorStartX + 6
          },${doorStartY + doorHeightScaled + 16} ${doorStartX + 6},${
            doorStartY + doorHeightScaled + 24
          }`}
          fill="currentColor"
          className="text-primary-600 dark:text-primary-400"
        />
        <polygon
          points={`${doorStartX + doorWidthScaled},${
            doorStartY + doorHeightScaled + 20
          } ${doorStartX + doorWidthScaled - 6},${
            doorStartY + doorHeightScaled + 16
          } ${doorStartX + doorWidthScaled - 6},${
            doorStartY + doorHeightScaled + 24
          }`}
          fill="currentColor"
          className="text-primary-600 dark:text-primary-400"
        />
        <text
          x={doorStartX + doorWidthScaled / 2}
          y={doorStartY + doorHeightScaled + 32}
          fill="currentColor"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          className="text-primary-700 dark:text-primary-300 select-text"
        >
          Ancho interior
        </text>
      </g>

      {/* Etiquetas de secciones */}
      <text
        x={overallStartX + pilarScaled / 2}
        y={doorStartY + doorHeightScaled / 2}
        fill="white"
        fontSize="9"
        fontWeight="bold"
        textAnchor="middle"
        className="select-text"
      >
        Pilar
      </text>
      <text
        x={doorStartX + doorWidthScaled / 2}
        y={doorStartY + doorHeightScaled / 2}
        fill="white"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
        className="select-text"
      >
        Puerta
      </text>
      <text
        x={doorStartX + doorWidthScaled + pilarScaled / 2}
        y={doorStartY + doorHeightScaled / 2}
        fill="white"
        fontSize="9"
        fontWeight="bold"
        textAnchor="middle"
        className="select-text"
      >
        Pilar
      </text>
    </svg>
  );
};

export default BudgetForm;
