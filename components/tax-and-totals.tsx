import { useInvoice } from "@/context/invoice-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function TaxAndTotals() {
  const { invoice, updateInvoice } = useInvoice();
  return (
    <Card>
      <CardHeader>
        <CardTitle>مجموع قیمت</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1">
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-lg">
            <span>قیمت کل:</span>
            <span>{invoice.total.toLocaleString("fa-IR")} تومان</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
