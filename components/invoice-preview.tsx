import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export const items = [
  {
    id: "1",
    desc: "طراحی وبسایت",
    quantity: 1,
    rate: 500,
    amount: 500,
  },
  {
    id: "2",
    desc: "هاستینگ",
    quantity: 1,
    rate: 120,
    amount: 120,
  },
];

export default function InvoicePreview() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">فاکتور خرید</h1>
          <div className="space-x-2 flex items-center">
            <Button variant="outline">بازگشت</Button>
            <Button>
              <Download className="size-4"></Download>
              دانلود
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">فاکتور</h2>
                <p className="text-gray-600">#655d5322def</p>
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-sm font-medium">تاریخ: 1401/05/23</p>
              </div>
            </div>

            {/* From/To */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-2">از:</h3>
                <p className="font-medium">امین</p>
                <p className="text-gray-600">amin@gmail.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">به:</h3>
                <p className="font-medium">امین</p>
                <p className="text-gray-600">amin@gmail.com</p>
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
                {items.map((i) => (
                  <tr className="border-b" key={i.id}>
                    <td className="py-2">{i.desc}</td>
                    <td className="py-2 text-center">{i.quantity}</td>
                    <td className="py-2 text-left">
                      {typeof i.amount === "number" ? i.amount.toFixed(3) : "0"} تومان
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
                  <span>136,000 تومان</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
