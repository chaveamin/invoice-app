import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoice } from "@/context/invoice-context";

export default function ContactDetails() {
  const { invoice, updateInvoice } = useInvoice();
  return (
    <Card>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="space-y-4">
          <h3 className="font-bold text-xl">کارگزار</h3>
          <div>
            <Label className="text-base font-semibold" htmlFor="employeeName">
              نام
            </Label>
            <Input
              id="employeeName"
              placeholder="نام شرکت"
              type="name"
              value={invoice.employeeName}
              onChange={(e) => updateInvoice({ employeeName: e.target.value })}
              disabled
            />
          </div>
          <div>
            <Label
              className="text-base font-semibold"
              htmlFor="employeeWebsite"
            >
              آدرس وبسایت
            </Label>
            <Input
              value={invoice.employeeWebsite}
              onChange={(e) =>
                updateInvoice({ employeeWebsite: e.target.value })
              }
              id="employeeWebsite"
              placeholder="وبسایت"
              type="text"
              disabled
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-xl">کارفرما</h3>
          <div>
            <Label
              className="text-base font-semibold"
              htmlFor="employerProjectName"
            >
              عنوان پروژه
            </Label>
            <Input
              value={invoice.employerProjectName}
              onChange={(e) =>
                updateInvoice({ employerProjectName: e.target.value })
              }
              id="employerProjectName"
              type="name"
            />
          </div>
          <div>
            <Label
              className="text-base font-semibold"
              htmlFor="employerWebsite"
            >
              آدرس وبسایت
            </Label>
            <Input
              value={invoice.employerWebsite}
              onChange={(e) =>
                updateInvoice({ employerWebsite: e.target.value })
              }
              id="employerWebsite"
              type="email"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
