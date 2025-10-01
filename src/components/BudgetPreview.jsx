import { ArrowLeft, Download } from "lucide-react";
import { generatePDF } from "../utils/pdfGenerator";
import logo from "../support_files/logo_viped.png";

const BudgetPreview = ({ budgetData, onBack }) => {
  const {
    budgetNumber,
    date,
    clientName,
    clientEmail,
    clientPhone,
    location,
    doorType,
    height,
    width,
    material,
    automationLevel,
    urgent,
    observations,
    breakdown,
    subtotal,
    iva,
    total,
    details,
  } = budgetData;

  const handleDownloadPDF = () => {
    generatePDF(budgetData);
  };

  return (
    <div className="space-y-6">
      {/* Botones de acción */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al formulario
        </button>

        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors shadow-md"
        >
          <Download className="h-4 w-4" />
          Descargar PDF
        </button>
      </div>

      {/* Documento de presupuesto */}
      <div
        id="budget-document"
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12 max-w-4xl mx-auto print:shadow-none"
      >
        {/* Encabezado */}
        <div className="border-b-2 border-primary-500 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                PRESUPUESTO
              </h1>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>
                  <strong>Nº:</strong> {budgetNumber}
                </p>
                <p>
                  <strong>Fecha:</strong> {date}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex flex-col items-end">
                <img
                  src={logo}
                  alt="Logo Viped Automatismos"
                  className="h-16 w-auto object-contain mb-3"
                />
                <div className="text-xs text-gray-600 dark:text-gray-400 text-right">
                  <p className="font-bold text-sm">AUTOMATISMOS VIPED SLL</p>
                  <p>Granada 1, 1 A</p>
                  <p>13600 Alcázar de San Juan</p>
                  <p>(Ciudad Real)</p>
                  <p className="mt-1">CIF: B13418074</p>
                  <p>Tel: 649166319</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Datos del cliente */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
            DATOS DEL CLIENTE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Nombre:</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {clientName}
              </p>
            </div>
            {clientEmail && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">Email:</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {clientEmail}
                </p>
              </div>
            )}
            {clientPhone && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">Teléfono:</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {clientPhone}
                </p>
              </div>
            )}
            {location && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">Ubicación:</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {location}
                </p>
              </div>
            )}
          </div>
        </div>

        
        {/* Desglose de costos */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
            DESGLOSE DE COSTOS
          </h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-white">
                  Concepto
                </th>
                <th className="text-right py-2 px-4 font-semibold text-gray-900 dark:text-white">
                  Importe
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">
                  Puerta base ({details.doorTypeName})
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                  {breakdown.doorBasePrice.toFixed(2)}€
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">
                  Materiales ({details.materialName}, {details.area}m²)
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                  {breakdown.materialPrice.toFixed(2)}€
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">
                  Sistema de automatización ({details.automationName})
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                  {breakdown.automationPrice.toFixed(2)}€
                </td>
              </tr>
              {breakdown.accessoriesPrice > 0 && (
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    Accesorios adicionales
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                    {breakdown.accessoriesPrice.toFixed(2)}€
                  </td>
                </tr>
              )}
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">
                  Mano de obra e instalación
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                  {breakdown.laborCost.toFixed(2)}€
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">
                  Transporte y montaje{urgent ? " (urgente)" : ""}
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                  {breakdown.transportCost.toFixed(2)}€
                </td>
              </tr>
            </tbody>
            <tfoot className="border-t-2 border-gray-300 dark:border-gray-600">
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Subtotal
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-white">
                  {subtotal.toFixed(2)}€
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">
                  IVA (21%)
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                  {iva.toFixed(2)}€
                </td>
              </tr>
              <tr className="bg-primary-50 dark:bg-primary-900/30 border-t-2 border-primary-500">
                <td className="py-4 px-4 text-lg font-bold text-primary-900 dark:text-primary-400">
                  TOTAL
                </td>
                <td className="py-4 px-4 text-right text-xl font-bold text-primary-900 dark:text-primary-400">
                  {total.toFixed(2)}€
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Condiciones */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
            CONDICIONES Y VALIDEZ
          </h2>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>
              • Presupuesto válido durante 30 días desde la fecha de emisión.
            </p>
            <p>
              • Plazo de entrega:{" "}
              {urgent ? "48-72 horas" : "7-10 días laborables"} desde la
              confirmación del pedido.
            </p>
            <p>
              • Forma de pago: 50% al confirmar pedido, 50% al finalizar la
              instalación.
            </p>
            <p>
              • Garantía: 2 años en materiales y mano de obra, 5 años en motor.
            </p>
            <p>• Los precios incluyen transporte dentro de un radio de 50km.</p>
            <p>
              • Se requiere visita técnica previa para confirmar medidas y
              viabilidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPreview;
