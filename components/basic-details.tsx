import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoice } from "@/context/invoice-context";
import DatePicker from "./ui/DatePicker";

export default function BasicDetails() {
  const { invoice, updateInvoice } = useInvoice();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = event.target?.result as string;

        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const pngBase64 = canvas.toDataURL("image/png");
            updateInvoice({ logo: pngBase64 });
          } else {
            updateInvoice({ logo: imgUrl }); // Fallback
          }
        };
        img.src = imgUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => updateInvoice({ logo: null });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-xl">جزئیات فاکتور</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            className="mb-3 text-base font-semibold"
            htmlFor="invoiceNumber"
          >
            شماره فاکتور
          </Label>
          <Input
            value={invoice.invoiceNumber}
            onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
            id="invoiceNumber"
          />
        </div>
        <div>
          <Label className="mb-3 text-base font-semibold" htmlFor="date">
            تاریخ
          </Label>
          <DatePicker
            value={invoice.date}
            onChange={(date) => {
              updateInvoice({ date: date ? date.toISOString() : undefined });
            }}
          />
        </div>

        {/* LOGO UPLOAD */}
        <div className="md:col-span-2">
          <Label className="mb-3 text-base font-semibold" htmlFor="logo">
            لوگو (PNG/SVG)
          </Label>
          <div className="flex items-center gap-4 mt-2">
            <Input
              id="logo"
              type="file"
              accept="image/png, image/svg+xml, image/jpeg"
              onChange={handleLogoUpload}
              className="w-full md:w-1/2"
            />
            {invoice.logo && (
              <div className="flex items-center gap-3">
                <img
                  src={invoice.logo}
                  alt="Logo preview"
                  className="size-10 object-contain rounded"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="text-base text-red-500 font-medium"
                >
                  حذف
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
