import { InvoiceData } from "@/types/invoice";
import { jsPDF } from "jspdf";
import { formatDate } from "@/utils/formatters";
import "@/utils/YekanBakhFaNum-Bold-bold";

export const generatePDF = (invoice: InvoiceData) => {
  const doc = new jsPDF("p", "mm", [210, 390]);
  let y = 10;

  doc.setLanguage("fa-IR");
  doc.setFont("YekanBakhFaNum-Bold", "normal", "bold");

  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(10, y, 190, 370, 6, 6, "FD");
  y += 10;

  doc.setDrawColor(255, 255, 255);
  doc.setFillColor(37, 99, 235);
  doc.roundedRect(20, y, 170, 20, 4, 4, "FD");
  doc.setTextColor(249, 250, 251);
  doc.setFontSize(13);

  doc.text(
    `${invoice.employerWebsite} / ${invoice.employerProjectName}`,
    105,
    29,
    {
      align: "center",
    },
  );
  doc.setFontSize(12);
  doc.text(formatDate(invoice.date), 110, 37, { align: "center" });
  y += 30;

  doc.setDrawColor(209, 213, 219);

  doc.setDrawColor(255, 255, 255);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(20, 44, 170, 10, 2.5, 2.5, "FD");

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

  doc.setDrawColor(255, 255, 255);
  doc.setFillColor(37, 99, 235);
  doc.roundedRect(20, y, 170, 15, 2.5, 2.5, "FD");
  doc.setTextColor(249, 250, 251);

  y += 9;
  doc.setFontSize(14);
  doc.text(":مبلغ نهایی", 163, y);
  doc.text(`${invoice.total.toLocaleString("fa-IR")}`, 37, y);
  doc.text("تومان", 23, y);

  y += 12;
  doc.setFontSize(10);
  doc.setLineWidth(0.35);
  doc.setDrawColor(37, 99, 235);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, y, 170, 50, 3, 3, "FD");
  doc.setTextColor(107, 114, 128);
  y += 10;
  doc.text("قبل از شروع کار 50 درصدر از کل مبلغ فاکتور پرداخت میشود", 185, y, {
    align: "right",
  });
  y += 10;
  doc.text("جهت مشاهده پیشرفت پروژه; کار در ورسل آپلود میشود", 185, y, {
    align: "right",
  });
  y += 10;
  doc.setLineHeightFactor(2);
  const textContent =
    "اولین ویرایش رایگان است: بعد از تحویل; کار توسط کارفرما بررسی میشود و در صورت هر گونه اصلاحات همه آنها را در یک پیام به طراح گزارش میدهد. بعد از اصلاح موارد هرگونه ویرایشات بعدی با هزینه انجام میشود";
  const maxWidth = 190;
  const splitText = doc.splitTextToSize(textContent, maxWidth);
  doc.text(splitText, 185, y, { align: "right" });

  // Generate blob URL untuk preview
  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);

  // doc.save(`${invoice.invoiceNumber}.pdf`);
};
