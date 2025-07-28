"use client";

import { useState } from "react";
import InvoicePreview from "@/components/invoice-preview";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import InvoiceForm from "@/components/invoice-form";

export default function Home() {
  const [showPreview, setShowPreview] = useState(false);
  if (showPreview) {
    return <InvoicePreview />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-bold text-2xl">فاکتور</h1>
            <p className="text-gray-600"></p>
          </div>
          <Button className="cursor-pointer" onClick={() => setShowPreview(true)}>
            <Eye className="size-4 ml-2"></Eye>
            پیشنمایش
          </Button>
        </div>
        <InvoiceForm></InvoiceForm>
      </div>
    </div>
  );
}
