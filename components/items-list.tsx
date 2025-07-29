import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import InvoiceItem from "@/components/invoice-item";
import { useInvoice } from "@/context/invoice-context";

export default function ItemsList() {
  const { invoice, addItem } = useInvoice();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>اقلام فاکتور ({invoice.items.length})</CardTitle>
        <Button className="cursor-pointerb" size="sm" onClick={addItem}>
          <Plus className="size-4"></Plus>
          افزودن
        </Button>
      </CardHeader>
      <CardContent>
        {invoice.items.map((item, index) => (
          <InvoiceItem
            key={item.id}
            item={item}
            index={index}
            canRemove={invoice.items.length > 1}
          />
        ))}
      </CardContent>
    </Card>
  );
}
