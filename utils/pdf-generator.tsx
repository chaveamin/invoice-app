// utils/pdf-generator.tsx

import { InvoiceData } from "@/types/invoice";
import { jsPDF } from "jspdf";
import { formatDate } from "@/utils/formatters";
import "@/utils/YekanBakhFaNum-Bold-bold";

export const generatePDF = (invoice: InvoiceData) => {
  const themeColor = invoice.colorTheme || "#2563eb";

  // CALCULATE DYNAMIC HEIGHT
  const calculatePageHeight = () => {
    // Temporary instance just to measure text wrapping and heights
    const tempDoc = new jsPDF("p", "mm", "a4");
    tempDoc.setFont("YekanBakhFaNum-Bold", "normal", "bold");

    let cy = 20; // 10mm top margin + 10mm initial padding

    if (invoice.logo) {
      try {
        const props = tempDoc.getImageProperties(invoice.logo);
        const targetHeight = (props.height * 25) / props.width;
        cy += targetHeight + 8;
      } catch (e) {
        console.error("Failed to measure logo:", e);
      }
    }

    cy += 30; // Header Area
    cy += 13; // Table Columns Header

    // Add height for each item row
    cy += invoice.items.length * 14;

    // Add height for Totals section
    if (
      invoice.taxEnabled ||
      (invoice.discountAmount && invoice.discountAmount > 0)
    ) {
      cy += 7; // Subtotal
      if (invoice.discountAmount > 0) cy += 7;
      if (invoice.taxEnabled) cy += 7;
    }

    cy += 9; // Space moving inside final amount box
    cy += 12; // Space below final amount box

    if (invoice.notes && invoice.notes.trim() !== "") {
      tempDoc.setFontSize(10);
      const splitText = tempDoc.splitTextToSize(invoice.notes, 160);
      const rectHeight = Math.max(30, splitText.length * 7 + 10);
      cy += rectHeight;
    }

    return cy + 10;
  };

  // Generate the required height (with a safety minimum of 150mm)
  const dynamicPageHeight = Math.max(calculatePageHeight(), 150);

  // RENDER THE ACTUAL PDF
  const doc = new jsPDF("p", "mm", [210, dynamicPageHeight]);
  let y = 10;

  doc.setLanguage("fa-IR");
  doc.setFont("YekanBakhFaNum-Bold", "normal", "bold");

  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(10, y, 190, dynamicPageHeight - 20, 6, 6, "FD");
  y += 10;

  // Logo
  if (invoice.logo) {
    try {
      const props = doc.getImageProperties(invoice.logo);
      const targetWidth = 8;
      const targetHeight = (props.height * targetWidth) / props.width;

      doc.addImage(invoice.logo, 92.5, y, targetWidth, targetHeight);
      y += targetHeight + 8;
    } catch (e) {
      console.error("Failed to add logo:", e);
    }
  }

  doc.setDrawColor(255, 255, 255);
  doc.setFillColor(themeColor);
  doc.roundedRect(20, y, 170, 20, 4, 4, "FD");
  doc.setTextColor(249, 250, 251);
  doc.setFontSize(13);

  doc.text(
    `${invoice.employerWebsite} / ${invoice.employerProjectName}`,
    105,
    y + 9,
    {
      align: "center",
    },
  );
  doc.setFontSize(12);
  doc.text(formatDate(invoice.date), 110, y + 17, { align: "center" });
  y += 30;

  doc.setDrawColor(209, 213, 219);

  doc.setDrawColor(255, 255, 255);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(20, y - 6, 170, 10, 2.5, 2.5, "FD");

  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128);
  doc.text("توضیحات", 170, y);
  doc.text("تعداد", 120, y);
  doc.text("قیمت واحد", 70, y);
  doc.text("قیمت", 25, y);
  y += 13;

  invoice.items.forEach((item) => {
    doc.setTextColor(17, 24, 39);

    doc.text(item.desc, 187, y, { align: "right" });
    doc.text(item.quantity.toString(), 125, y);
    doc.text(`${Number(item.rate).toLocaleString("fa-IR")}`, 70, y);
    doc.text(`${item.amount.toLocaleString("fa-IR")}`, 25, y);

    y += 7;
    doc.setDrawColor(229, 231, 235);
    doc.line(20, y, 190, y);
    y += 7;
  });

  if (
    invoice.taxEnabled ||
    (invoice.discountAmount && invoice.discountAmount > 0)
  ) {
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(11);

    doc.text(":جمع کل", 190, y, { align: "right" });
    doc.text(`${(invoice.subtotal || 0).toLocaleString("fa-IR")}`, 37, y);
    doc.text("تومان", 23, y);
    y += 7;

    if (invoice.discountAmount > 0) {
      doc.text(":تخفیف", 190, y, { align: "right" });
      doc.text(
        `${(invoice.discountAmount || 0).toLocaleString("fa-IR")}`,
        37,
        y,
      );
      doc.text("تومان", 23, y);
      y += 7;
    }

    if (invoice.taxEnabled) {
      doc.text(`:مالیات (${invoice.taxRate ?? 10}%)`, 190, y, {
        align: "right",
      });
      doc.text(`${(invoice.taxAmount || 0).toLocaleString("fa-IR")}`, 37, y);
      doc.text("تومان", 23, y);
      y += 7;
    }
  }

  doc.setDrawColor(255, 255, 255);
  doc.setFillColor(themeColor);
  doc.roundedRect(20, y, 170, 15, 2.5, 2.5, "FD");
  doc.setTextColor(249, 250, 251);

  y += 9;
  doc.setFontSize(14);
  doc.text(":مبلغ نهایی", 163, y);
  doc.text(`${invoice.total.toLocaleString("fa-IR")}`, 37, y);
  doc.text("تومان", 23, y);

  y += 12;

  // Notes
  if (invoice.notes && invoice.notes.trim() !== "") {
    doc.setFontSize(10);
    doc.setLineWidth(0.35);
    doc.setDrawColor(themeColor);
    doc.setFillColor(255, 255, 255);

    doc.setLineHeightFactor(2);
    const maxWidth = 160;

    const splitText = doc.splitTextToSize(invoice.notes, maxWidth);

    const rectHeight = Math.max(30, splitText.length * 7 + 10);

    doc.roundedRect(20, y, 170, rectHeight, 3, 3, "FD");
    doc.setTextColor(107, 114, 128);
    y += 10;

    doc.text(splitText, 185, y, { align: "right" });
  }

  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);
};
