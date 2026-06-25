"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Download, Eye, Share2, Copy, Check } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useInvoice } from "@/context/invoice-context";
import { generatePDF } from "@/utils/pdf-generator";

interface InvoicePreviewProps {
  onBack: () => void;
}

export default function InvoicePreview({ onBack }: InvoicePreviewProps) {
  const { invoice } = useInvoice();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handlePreviewPDF = () => {
    const url = generatePDF(invoice);
    setPdfUrl(url);
  };

  const handleDownloadPDF = () => {
    const url = pdfUrl || generatePDF(invoice);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoice.invoiceNumber || "invoice"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });
      const data = await res.json();

      if (data.url) {
        const fullUrl = `${window.location.origin}${data.url}`;
        setShareUrl(fullUrl);
      }
    } catch (error) {
      console.error("Failed to share", error);
      alert("خطا در ایجاد لینک");
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(invoice.date));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">فاکتور خرید</h1>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button onClick={handlePreviewPDF}>
              <Eye />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              disabled={isSharing}
            >
              <Share2 />
            </Button>

            <Button variant="outline" size="icon" onClick={handleDownloadPDF}>
              <Download />
            </Button>

            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={onBack}
            >
              بازگشت
            </Button>
          </div>
        </div>

        {/* SHARE URL BOX */}
        {shareUrl && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-1">
                لینک فاکتور شما آماده است
              </p>
              <p className="text-xs text-blue-600" dir="ltr">
                {shareUrl}
              </p>
            </div>
            <Button
              onClick={copyToClipboard}
              variant={copied ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${copied ? "bg-green-600 hover:bg-green-700 text-white border-none" : ""}`}
            >
              {copied ? (
                <Check className="size-4 mr-2" />
              ) : (
                <Copy className="size-4 mr-2" />
              )}
              {copied ? "کپی شد" : "کپی لینک"}
            </Button>
          </div>
        )}

        {/* PDF Iframe */}
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
                <p className="text-gray-600 text-sm font-medium">
                  تاریخ: {formattedDate}
                </p>
              </div>
            </div>

            {/* From/To */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-2">از:</h3>
                <p className="font-medium">{invoice.employeeName}</p>
                <p className="text-gray-600">{invoice.employeeWebsite}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">به:</h3>
                <p className="font-medium">{invoice.employerProjectName}</p>
                <p className="text-gray-600">{invoice.employerWebsite}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-16">
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
                      {typeof i.amount === "number"
                        ? i.amount.toLocaleString("fa-IR")
                        : "0"}{" "}
                      تومان
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Section */}
            <div className="flex justify-end">
              <div className="w-full space-y-3">
                {(invoice.taxEnabled ||
                  (invoice.discountAmount && invoice.discountAmount > 0)) && (
                  <>
                    <div className="flex justify-between text-muted-foreground text-sm">
                      <span>جمع کل:</span>
                      <span>
                        {(invoice.subtotal || 0).toLocaleString("fa-IR")} تومان
                      </span>
                    </div>

                    {invoice.discountAmount > 0 && (
                      <div className="flex justify-between text-muted-foreground text-sm">
                        <span>تخفیف:</span>
                        <span className="text-red-500">
                          {(invoice.discountAmount || 0).toLocaleString(
                            "fa-IR",
                          )}{" "}
                          - تومان
                        </span>
                      </div>
                    )}

                    {invoice.taxEnabled && (
                      <div className="flex justify-between text-muted-foreground text-sm">
                        <span>مالیات ({invoice.taxRate ?? 10}%):</span>
                        <span>
                          {(invoice.taxAmount || 0).toLocaleString("fa-IR")}{" "}
                          تومان
                        </span>
                      </div>
                    )}
                    <hr />
                  </>
                )}

                <div className="flex justify-between font-bold text-lg">
                  <span>مبلغ نهایی:</span>
                  <span>
                    {(invoice.total || 0).toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
