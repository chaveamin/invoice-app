import { useInvoice } from "@/context/invoice-context";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function TaxAndTotals() {
  const { invoice, updateInvoice, clearDraft } = useInvoice();

  return (
    <Card>
      <CardContent className="grid grid-cols-1 pt-6">
        <div className="space-y-4">
          {/* Discount Section */}
          <div className="space-y-2">
            <Label>تخفیف</Label>
            <div className="flex gap-2">
              <select
                className="flex h-10 w-1/2 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={invoice.discountType || "none"}
                onChange={(e) =>
                  updateInvoice({
                    discountType: e.target.value as any,
                    discountValue: 0,
                  })
                }
              >
                <option value="none">بدون تخفیف</option>
                <option value="percentage">درصدی</option>
                <option value="fixed">مبلغ ثابت</option>
              </select>
              {invoice.discountType && invoice.discountType !== "none" && (
                <Input
                  className="w-1/2"
                  type="number"
                  min="0"
                  value={invoice.discountValue || ""}
                  onChange={(e) =>
                    updateInvoice({
                      discountValue: Number(e.target.value) || 0,
                    })
                  }
                  placeholder={
                    invoice.discountType === "percentage" ? "درصد" : "مبلغ"
                  }
                />
              )}
            </div>
          </div>

          {/* Tax Section */}
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-2">
              <Switch
                id="tax"
                checked={invoice.taxEnabled}
                onCheckedChange={(checked) =>
                  updateInvoice({ taxEnabled: checked })
                }
              />
              <Label htmlFor="tax" className="cursor-pointer m-0 px-2">
                افزودن مالیات
              </Label>
            </div>

            {/* Custom Tax Rate Input */}
            {invoice.taxEnabled && (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  className="w-20 h-8 text-center"
                  value={invoice.taxRate ?? 10}
                  onChange={(e) =>
                    updateInvoice({ taxRate: Number(e.target.value) || 0 })
                  }
                />
                <span className="text-sm font-medium">%</span>
              </div>
            )}
          </div>

          {/* Breakdown Section */}
          <div className="flex justify-between text-muted-foreground text-sm mt-4">
            <span>جمع کل:</span>
            <span>{(invoice.subtotal || 0).toLocaleString("fa-IR")} تومان</span>
          </div>

          {invoice.discountAmount > 0 && (
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>تخفیف:</span>
              <span className="text-red-500">
                {(invoice.discountAmount || 0).toLocaleString("fa-IR")}- تومان
              </span>
            </div>
          )}

          {invoice.taxEnabled && (
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>مالیات ({invoice.taxRate ?? 10}%):</span>
              <span>
                {(invoice.taxAmount || 0).toLocaleString("fa-IR")} تومان
              </span>
            </div>
          )}

          <hr />

          <div className="flex justify-between font-bold text-xl">
            <span>مبلغ نهایی:</span>
            <span>{(invoice.total || 0).toLocaleString("fa-IR")} تومان</span>
          </div>

          <div className="pt-2">
            <Button
              className="w-full cursor-pointer bg-red-500/15 text-red-700 hover:bg-red-500/20"
              onClick={clearDraft}
            >
              پاکسازی پیش‌نویس
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
