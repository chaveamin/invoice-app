import { useInvoice } from "@/context/invoice-context";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export default function TaxAndTotals() {
  const { invoice, updateInvoice } = useInvoice();

  return (
    <Card>
      <CardContent className="grid grid-cols-1 pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="tax"
              checked={invoice.taxEnabled}
              onCheckedChange={(checked) =>
                updateInvoice({ taxEnabled: checked })
              }
            />
            <Label htmlFor="tax" className="cursor-pointer m-0">
              افزودن مالیات (10%)
            </Label>
          </div>
          {invoice.taxEnabled && (
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>مالیات (10%):</span>
              <span>
                {(invoice.taxAmount || 0).toLocaleString("fa-IR")} تومان
              </span>
            </div>
          )}
          <div className="flex justify-between text-muted-foreground text-sm">
            <span>جمع کل:</span>
            <span>{(invoice.subtotal || 0).toLocaleString("fa-IR")} تومان</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>مبلغ نهایی:</span>
            <span>{invoice.total.toLocaleString("fa-IR")} تومان</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
