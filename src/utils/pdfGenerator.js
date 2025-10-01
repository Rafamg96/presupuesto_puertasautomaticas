import { jsPDF } from "jspdf";
import logoViped from "../support_files/logo_viped.png";

// Función para generar el PDF del presupuesto
export const generatePDF = (budgetData) => {
  const {
    budgetNumber,
    date,
    clientName,
    clientEmail,
    clientPhone,
    location,
    height,
    width,
    urgent,
    observations,
    breakdown,
    subtotal,
    iva,
    total,
    details,
  } = budgetData;

  // Crear nuevo documento PDF (A4)
  const doc = new jsPDF();

  let yPos = 20;
  const leftMargin = 20;
  const rightMargin = 190;
  const pageWidth = 210;

  // Función auxiliar para añadir texto
  const addText = (text, x, y, options = {}) => {
    const {
      align = "left",
      size = 10,
      style = "normal",
      color = [0, 0, 0],
    } = options;
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    doc.setTextColor(...color);
    doc.text(text, x, y, { align });
  };

  // Función auxiliar para añadir línea
  const addLine = (y, color = [0, 0, 0]) => {
    doc.setDrawColor(...color);
    doc.line(leftMargin, y, rightMargin, y);
  };

  // ========== ENCABEZADO ==========
  // Título
  addText("PRESUPUESTO", leftMargin, yPos, {
    size: 20,
    style: "bold",
    color: [34, 197, 94],
  });

  // Logo de Viped (derecha)
  try {
    doc.addImage(logoViped, "PNG", 150, 15, 35, 15);
  } catch (error) {
    console.error("Error al cargar el logo:", error);
  }

  yPos += 10;
  addText(`Nº: ${budgetNumber}`, leftMargin, yPos, { size: 10 });
  addText(`Fecha: ${date}`, leftMargin, yPos + 5, { size: 10 });

  // Datos de la empresa Viped (derecha)
  addText("AUTOMATISMOS VIPED SLL", 170, 35, {
    size: 9,
    style: "bold",
    align: "center",
    color: [50, 50, 50],
  });
  addText("Granada 1, 1 A", 170, 40, {
    size: 8,
    align: "center",
    color: [100, 100, 100],
  });
  addText("13600 Alcázar de San Juan", 170, 45, {
    size: 8,
    align: "center",
    color: [100, 100, 100],
  });
  addText("(Ciudad Real)", 170, 50, {
    size: 8,
    align: "center",
    color: [100, 100, 100],
  });
  addText("CIF: B13418074", 170, 55, {
    size: 8,
    align: "center",
    color: [100, 100, 100],
  });
  addText("Tel: 649166319", 170, 60, {
    size: 8,
    align: "center",
    color: [100, 100, 100],
  });

  yPos = 70;
  addLine(yPos, [34, 197, 94]);
  yPos += 10;

  // ========== DATOS DEL CLIENTE ==========
  addText("DATOS DEL CLIENTE", leftMargin, yPos, { size: 12, style: "bold" });
  yPos += 8;

  addText(`Nombre: ${clientName}`, leftMargin, yPos, { size: 10 });
  yPos += 5;
  if (clientEmail) {
    addText(`Email: ${clientEmail}`, leftMargin, yPos, { size: 10 });
    yPos += 5;
  }
  if (clientPhone) {
    addText(`Teléfono: ${clientPhone}`, leftMargin, yPos, { size: 10 });
    yPos += 5;
  }
  if (location) {
    addText(`Ubicación: ${location}`, leftMargin, yPos, { size: 10 });
    yPos += 5;
  }

  yPos += 5;
  addLine(yPos, [200, 200, 200]);
  yPos += 10;

  // ========== DESGLOSE DE COSTOS ==========
  addText("DESGLOSE DE COSTOS", leftMargin, yPos, { size: 12, style: "bold" });
  yPos += 8;

  // Encabezados de tabla
  doc.setFillColor(245, 245, 245);
  doc.rect(leftMargin, yPos - 5, 170, 8, "F");
  addText("Concepto", leftMargin + 2, yPos, { size: 9, style: "bold" });
  addText("Importe", rightMargin - 2, yPos, {
    size: 9,
    style: "bold",
    align: "right",
  });
  yPos += 8;

  // Líneas de la tabla
  const addTableRow = (concept, amount, bold = false) => {
    addText(concept, leftMargin + 2, yPos, {
      size: 9,
      style: bold ? "bold" : "normal",
    });
    addText(`${amount.toFixed(2)}€`, rightMargin - 2, yPos, {
      size: 9,
      style: bold ? "bold" : "normal",
      align: "right",
    });
    yPos += 6;
  };

  addTableRow(`Puerta base (${details.doorTypeName})`, breakdown.doorBasePrice);
  addTableRow(
    `Materiales (${details.materialName}, ${details.area}m²)`,
    breakdown.materialPrice
  );
  addTableRow(
    `Sistema de automatización (${details.automationName})`,
    breakdown.automationPrice
  );

  if (breakdown.accessoriesPrice > 0) {
    addTableRow("Accesorios adicionales", breakdown.accessoriesPrice);
  }

  addTableRow("Mano de obra e instalación", breakdown.laborCost);
  addTableRow(
    `Transporte y montaje${urgent ? " (urgente)" : ""}`,
    breakdown.transportCost
  );

  yPos += 2;
  addLine(yPos, [100, 100, 100]);
  yPos += 6;

  // Subtotal
  doc.setFillColor(245, 245, 245);
  doc.rect(leftMargin, yPos - 5, 170, 7, "F");
  addTableRow("Subtotal", subtotal, true);

  yPos += 1;
  addTableRow("IVA (21%)", iva);

  yPos += 2;
  addLine(yPos, [34, 197, 94]);
  yPos += 6;

  // Total
  doc.setFillColor(220, 252, 231);
  doc.rect(leftMargin, yPos - 5, 170, 10, "F");
  addText("TOTAL", leftMargin + 2, yPos, {
    size: 12,
    style: "bold",
    color: [34, 197, 94],
  });
  addText(`${total.toFixed(2)}€`, rightMargin - 2, yPos, {
    size: 14,
    style: "bold",
    align: "right",
    color: [34, 197, 94],
  });

  yPos += 15;

  // ========== CONDICIONES ==========
  addLine(yPos, [200, 200, 200]);
  yPos += 8;

  addText("CONDICIONES Y VALIDEZ", leftMargin, yPos, {
    size: 10,
    style: "bold",
  });
  yPos += 5;

  const conditions = [
    "• Presupuesto válido durante 30 días desde la fecha de emisión.",
    `• Plazo de entrega: ${
      urgent ? "48-72 horas" : "7-10 días laborables"
    } desde la confirmación del pedido.`,
    "• Forma de pago: 50% al confirmar pedido, 50% al finalizar la instalación.",
    "• Garantía: 2 años en materiales y mano de obra, 5 años en motor.",
    "• Los precios incluyen transporte dentro de un radio de 50km.",
    "• Se requiere visita técnica previa para confirmar medidas y viabilidad.",
  ];

  conditions.forEach((condition) => {
    addText(condition, leftMargin, yPos, { size: 8, color: [100, 100, 100] });
    yPos += 4;
  });

  // Guardar el PDF
  doc.save(
    `Presupuesto_${budgetNumber}_${clientName.replace(/\s+/g, "_")}.pdf`
  );
};
