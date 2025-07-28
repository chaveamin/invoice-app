import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoice } from "@/context/invoice-context";

export default function ContactDetails() {
  const { invoice, updateInvoice } = useInvoice();
  return (
    <Card>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="space-y-4">
          <h3 className="font-medium">فاکتور از طرف</h3>
          <div>
            <Label htmlFor="fromName">نام</Label>
            <Input
              id="fromName"
              placeholder="نام شرکت"
              type="name"
              value={invoice.fromName}
              onChange={(e) => updateInvoice({ fromName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="fromEmail">آدرس ایمیل</Label>
            <Input
              value={invoice.fromEmail}
              onChange={(e) => updateInvoice({ fromEmail: e.target.value })}
              id="fromEmail"
              placeholder="ایمیل شرکت"
              type="email"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">فاکتور به</h3>
          <div>
            <Label htmlFor="toName">نام مشتری</Label>
            <Input
              value={invoice.toName}
              onChange={(e) => updateInvoice({ toName: e.target.value })}
              id="toName"
              placeholder="نام مشتری"
              type="name"
            />
          </div>
          <div>
            <Label htmlFor="toEmail">آدرس ایمیل</Label>
            <Input
              value={invoice.toEmail}
              onChange={(e) => updateInvoice({ toEmail: e.target.value })}
              id="toEmail"
              placeholder="ایمیل مشتری"
              type="email"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
