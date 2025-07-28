import { InvoiceData } from "@/types/invoice";
import { jsPDF } from "jspdf";
import "@/utils/YekanBakhFaNum-Bold-bold";

export const generatePDF = (invoice: InvoiceData) => {
  const doc = new jsPDF();
  let y = 30;

  // Title
  doc.setLanguage("fa-IR");
  doc.setFont("YekanBakhFaNum-Bold", "normal", "bold");
  doc.setFontSize(24);
  doc.text("فاکتور", 150, y);
  doc.setFontSize(12);
  doc.text(`#${invoice.invoiceNumber}`, 20, y);
  y += 20;

  // Date
  doc.text(`تاریخ: ${new Date(invoice.date).toLocaleDateString()}`, 20, y);
  y += 20;
  y += 20;

  // From/To
  doc.setFontSize(14);
  doc.text("از طرف", 120, y);
  doc.text("به", 20, y);
  y += 20;

  // Generate blob URL untuk preview
  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);
};
