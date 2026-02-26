import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoice } from "@/context/invoice-context";
import DatePicker from "./ui/DatePicker";

export default function BasicDetails() {
  const { invoice, updateInvoice } = useInvoice();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">جزئیات فاکتور</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-3" htmlFor="invoiceNumber">
            شماره فاکتور
          </Label>
          <Input
            value={invoice.invoiceNumber}
            onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
            id="invoiceNumber"
          />
        </div>
        <div>
          <Label className="mb-3" htmlFor="date">
            تاریخ
          </Label>
          <DatePicker
            value={invoice.date}
            onChange={(date) => {
              updateInvoice({ date: date ? date.toISOString() : undefined });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
