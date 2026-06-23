"use client";

import { useState } from "react";
import { useInvoice } from "@/context/invoice-context";
import { useTemplates } from "@/context/template-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Save, Download, Trash2 } from "lucide-react";
import { InvoiceData } from "@/types/invoice";

export default function TemplateManager() {
  const { invoice, updateInvoice } = useInvoice();
  const { templates, saveTemplate, deleteTemplate } = useTemplates();
  const [newTemplateName, setNewTemplateName] = useState("");

  const handleSave = () => {
    if (!newTemplateName.trim()) return;
    saveTemplate(newTemplateName, invoice);
    setNewTemplateName("");
  };

  const handleLoad = (templateData: InvoiceData) => {
    updateInvoice({
      ...templateData,
      date: invoice.date,
      invoiceNumber: invoice.invoiceNumber,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">قالب‌های فاکتور</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="نام قالب جدید (مثلاً: مشتری الف)..."
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            className="flex-1 bg-white"
          />
          <Button onClick={handleSave} disabled={!newTemplateName.trim()}>
            <Save className="size-4 ml-2" />
            ذخیره قالب
          </Button>
        </div>

        {templates.length > 0 && (
          <div className="space-y-2 mt-4 border-t border-zinc-100 pt-4">
            <p className="text-sm font-medium mb-2">قالب‌های ذخیره شده:</p>
            {templates.map((t) => (
              <div
                key={t.id}
                className="flex flex-wrap gap-2 items-center justify-between bg-white p-2 rounded-md border border-zinc-100"
              >
                <span className="font-medium text-sm text-gray-700">
                  {t.name}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleLoad(t.data)}
                  >
                    <Download className="size-4 ml-1" />
                    بارگذاری
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteTemplate(t.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
