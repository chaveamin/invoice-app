import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { InvoiceItem as InvoiceItemType } from "@/types/invoice";
import { useInvoice } from "@/context/invoice-context";

interface InvoiceItemProps {
  item: InvoiceItemType;
  index: number;
  canRemove: boolean;
}

export default function InvoiceItem({ item, index, canRemove }: InvoiceItemProps) {
  const { removeItem, updateItem } = useInvoice();

  const handleQuantityChange = (value: string) => {
    // Allow empty string temporarily, but conver to number for calculation
    if (value === "") {
      updateItem(index, "quantity", "");
    } else {
      const numValue = Number.parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "quantity", numValue);
      }
    }
  };

  const handleQuantityBlur = () => {
    // if empty on blur, set to 1
    if (item.quantity === "" || item.quantity === 0) {
      updateItem(index, "quantity", 1);
    }
  };

  const handleRateChange = (value: string) => {
    // Allow empty string temporarily, but conver to number for calculation
    if (value === "") {
      updateItem(index, "rate", "");
    } else {
      const numValue = Number.parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "rate", numValue);
      }
    }
  };

  const handleRateBlur = () => {
    // if empty on blur, set to 1
    if (item.rate === "") {
      updateItem(index, "rate", 0);
    }
  };

  return (
    <div className="grid items-center grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg">
      <div className="md:col-span-5 col-span-1">
        <Label>توضیحات</Label>
        <Input value={item.desc} onChange={(e) => updateItem(index, "desc", e.target.value)} />
      </div>
      <div className="md:col-span-2 col-span-1">
        <Label>تعداد</Label>
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          onBlur={handleQuantityBlur}
        />
      </div>
      <div className="md:col-span-2 col-span-1">
        <Label>قیمت واحد</Label>
        <Input
          type="number"
          min="50000"
          step="50000"
          value={item.rate}
          onChange={(e) => handleRateChange(e.target.value)}
          onBlur={handleRateBlur}
        />
      </div>
      <div className="md:col-span-2 col-span-1">
        <Label>قیمت</Label>
        <div className="h-10 px-3 py-2 bg-gray-50 border rounded-md text-[13px] flex items-center">
          {typeof item.amount === "number" ? item.amount.toLocaleString("fa-IR") : "0"} تومان
        </div>
      </div>
      <div className="md:col-span-1 col-span-1 self-end md:justify-self-start justify-self-center">
        <Button
          className="cursor-pointer w-2xs md:w-12"
          variant="outline"
          size="icon"
          onClick={() => removeItem(index)}
          disabled={!canRemove}>
          <Trash2 className="size-4"></Trash2>
        </Button>
      </div>
    </div>
  );
}
