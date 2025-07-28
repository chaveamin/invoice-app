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
  const { removeItem } = useInvoice();
  return (
    <div className="grid grid-cols-12 gap-4 p-4 border rounded-lg">
      <div className="col-span-5">
        <Label>توضیحات</Label>
        <Input placeholder="توضیحات مورد" />
      </div>
      <div className="col-span-2">
        <Label>مقدار</Label>
        <Input type="number" min="1" />
      </div>
      <div className="col-span-2">
        <Label>قیمت (تومان)</Label>
        <Input type="number" min="50000" step="50000" />
      </div>
      <div className="col-span-2">
        <Label>قیمت (تومان)</Label>
        <div className="h-10 px-3 py-2 bg-gray-50 border rounded-md flex items-center">
          1000 تومان
        </div>
      </div>
      <div className="col-span-1 flex items-end">
        <Button className="cursor-pointer" variant="outline" size="icon">
          <Trash2 className="size-4"></Trash2>
        </Button>
      </div>
    </div>
  );
}
