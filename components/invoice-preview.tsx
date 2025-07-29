"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useInvoice } from "@/context/invoice-context";
import { generatePDF } from "@/utils/pdf-generator";

interface InvoicePreviewProps {
  onBack: () => void;
}

export default function InvoicePreview({ onBack }: InvoicePreviewProps) {
  const { invoice } = useInvoice();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleDownloadPDF = () => {
    const url = generatePDF(invoice);
    setPdfUrl(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">فاکتور خرید</h1>
          <div className="space-x-2 flex items-center">
            <Button className="cursor-pointer" variant="outline" onClick={onBack}>
              بازگشت
            </Button>
            <Button className="cursor-pointer" onClick={handleDownloadPDF}>
              <Download className="size-4 "></Download>
              دانلود
            </Button>
          </div>
        </div>

        {pdfUrl && (
          <div className="my-4 border rounded-lg overflow-hidden">
            <iframe src={pdfUrl} width="100%" height="600px"></iframe>
          </div>
        )}

        <Card>
          <CardContent className="p-8">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">فاکتور</h2>
                <p dir="ltr" className="text-gray-600">
                  #{invoice.invoiceNumber}
                </p>
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-sm font-medium">تاریخ: {invoice.date}</p>
              </div>
            </div>

            {/* From/To */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-2">از:</h3>
                <p className="font-medium">{invoice.fromName}</p>
                <p className="text-gray-600">{invoice.fromEmail}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">به:</h3>
                <p className="font-medium">{invoice.toName}</p>
                <p className="text-gray-600">{invoice.toEmail}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2">
                  <th className="text-right py-2">توضیحات</th>
                  <th className="text-center py-2">تعداد</th>
                  <th className="text-left py-2">قیمت</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((i) => (
                  <tr className="border-b" key={i.id}>
                    <td className="py-2">{i.desc}</td>
                    <td className="py-2 text-center">{i.quantity}</td>
                    <td className="py-2 text-left">
                      {typeof i.amount === "number" ? i.amount.toLocaleString("fa-IR") : "0"} تومان
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="flex justify-start">
              <div className="w-full space-y-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>قیمت کل:</span>
                  <span>{invoice.total.toLocaleString("fa-IR")}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
