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

  // From/To
  doc.setFontSize(14);
  doc.text("از طرف", 120, y);
  doc.text("به", 20, y);
  y += 20;

  doc.setFontSize(10);
  doc.text(invoice.fromName, 20, y);
  doc.text(invoice.toName, 120, y);
  y += 6;
  doc.text(invoice.fromEmail, 20, y);
  doc.text(invoice.toEmail, 120, y);
  y += 20;

  // Items Header
  doc.setFontSize(10);
  doc.text("توضیحات", 176, y);
  doc.text("تعداد", 140, y);
  doc.text("قیمت واحد", 120, y);
  doc.text("قیمت", 20, y);
  y += 5;
  doc.line(20, y, 190, y);
  y += 10;

  // Items
  invoice.items.forEach((i) => {
    doc.text(i.desc, 176, y);
    doc.text(i.quantity.toString(), 140, y);
    doc.text(`${Number(i.rate).toLocaleString("fa-IR")}`, 120, y);
    doc.text(`${i.amount.toLocaleString("fa-IR")}`, 20, y);
    y += 8;
  });

  y += 10;
  doc.line(140, y, 190, y);
  y += 10;

  // Totals
  doc.setFontSize(12);
  doc.text(":مبلغ نهایی", 170, y);
  doc.text(`${invoice.total.toLocaleString("fa-IR")}`, 153, y);
  doc.text("تومان", 141, y);

  // Generate blob URL untuk preview
  //   const pdfBlob = doc.output("blob");
  //   return URL.createObjectURL(pdfBlob);

  doc.save(`${invoice.invoiceNumber}.pdf`);
};
