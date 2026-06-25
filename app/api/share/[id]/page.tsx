"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { InvoiceData } from "@/types/invoice";
import { generatePDF } from "@/utils/pdf-generator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function SharedInvoicePage() {
  const params = useParams();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/share?id=${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setInvoice(data);
        setPdfUrl(generatePDF(data));
      })
      .catch(() => setError(true));
  }, [params.id]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-bold text-red-500">
        فاکتور پیدا نشد یا منقضی شده است
      </div>
    );
  }

  if (!invoice || !pdfUrl) {
    return (
      <div className="flex h-screen items-center justify-center font-medium">
        در حال بارگذاری فاکتور...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="max-w-4xl w-full flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">
          فاکتور: <span dir="ltr">#{invoice.invoiceNumber}</span>
        </h1>
        <a href={pdfUrl} download={`${invoice.invoiceNumber}.pdf`}>
          <Button className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" /> دانلود PDF
          </Button>
        </a>
      </div>
      <div className="w-full max-w-4xl border rounded-lg overflow-hidden shadow-xl bg-white">
        <iframe src={pdfUrl} width="100%" height="800px"></iframe>
      </div>
    </div>
  );
}
