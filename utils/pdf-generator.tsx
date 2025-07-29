import { InvoiceData } from "@/types/invoice";
import { jsPDF } from "jspdf";
import "@/utils/YekanBakhFaNum-Bold-bold";

export const generatePDF = (invoice: InvoiceData) => {
  const doc = new jsPDF();
  const startY = 10;
  let y = startY;

  doc.setLanguage("fa-IR");
  doc.setFont("YekanBakhFaNum-Bold", "normal", "bold");

  let calculatedHeight = 63;

  invoice.items.forEach((item) => {
    const descriptionLines = doc.splitTextToSize(item.desc, 85);

    const textHeight = descriptionLines.length * 5;

    const rowHeight = Math.max(textHeight, 10) + 20;
    calculatedHeight += rowHeight;
  });

  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(10, y, 190, calculatedHeight, 6, 6, "FD");
  y += 10;

  doc.setDrawColor(255, 255, 255);
  doc.setFillColor(37, 99, 235);
  doc.roundedRect(20, y, 170, 20, 4, 4, "FD");
  doc.setTextColor(249, 250, 251);
  doc.setFontSize(14);

  doc.text(invoice.employerProjectName, 80, 29);
  doc.setFontSize(12);
  doc.text(new Date(invoice.date).toLocaleDateString(), 110, 37, { align: "center" });
  y += 30;

  doc.setDrawColor(209, 213, 219);

  doc.setDrawColor(255, 255, 255);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(20, 44, 170, 10, 2.5, 2.5, "FD");

  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128);
  doc.text("توضیحات", 170, y);
  doc.text("تعداد", 140, y);
  doc.text("قیمت واحد", 100, y);
  doc.text("قیمت", 25, y);
  y += 13;

  invoice.items.forEach((item) => {
    const startOfRowY = y;
    doc.setTextColor(17, 24, 39);

    const descriptionLines = doc.splitTextToSize(item.desc, 85);
    const textHeight = descriptionLines.length * 5;
    const rowHeight = Math.max(textHeight, 1);

    doc.text(descriptionLines, 187, startOfRowY, { align: "right" });
    doc.text(item.quantity.toString(), 145, startOfRowY);
    doc.text(`${Number(item.rate).toLocaleString("fa-IR")}`, 100, startOfRowY);
    doc.text(`${item.amount.toLocaleString("fa-IR")}`, 25, startOfRowY);

    y += rowHeight;

    y += 3;
    doc.setDrawColor(229, 231, 235);
    doc.line(20, y, 190, y);
    y += 7;
  });

  // Totals

  doc.setDrawColor(255, 255, 255);
  doc.setFillColor(37, 99, 235);
  doc.roundedRect(20, y, 170, 15, 2.5, 2.5, "FD");
  doc.setTextColor(249, 250, 251);

  y += 9;
  doc.setFontSize(14);
  doc.text(":مبلغ نهایی", 163, y);
  doc.text(`${invoice.total.toLocaleString("fa-IR")}`, 37, y);
  doc.text("تومان", 23, y);

  // Generate blob URL untuk preview
  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);

  // doc.save(`${invoice.invoiceNumber}.pdf`);
};
