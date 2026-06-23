import { Trash2, GripVertical } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { InvoiceItem as InvoiceItemType } from "@/types/invoice";
import { useInvoice } from "@/context/invoice-context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface InvoiceItemProps {
  item: InvoiceItemType;
  index: number;
  canRemove: boolean;
}

export default function InvoiceItem({
  item,
  index,
  canRemove,
}: InvoiceItemProps) {
  const { removeItem, updateItem } = useInvoice();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  const handleQuantityChange = (value: string) => {
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
    if (item.quantity === "" || item.quantity === 0) {
      updateItem(index, "quantity", 1);
    }
  };

  const handleRateChange = (value: string) => {
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
    if (item.rate === "") {
      updateItem(index, "rate", 0);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      suppressHydrationWarning
      className={`flex items-center gap-2 p-4 border-b bg-white ${
        isDragging ? "shadow-lg rounded-lg border border-blue-500 relative" : ""
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        suppressHydrationWarning
        className="cursor-grab active:cursor-grabbing hover:text-blue-600 touch-none pt-8 md:pt-0"
      >
        <svg
          className="size-5 translate-y-3"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="*:stroke-gray-400" clipPath="url(#clip0_4482_390)">
            <path
              d="M2 12H22"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.29 17.8L11.0999 21.55C11.5499 22.15 12.45 22.15 12.9 21.55L15.7099 17.8C16.2699 17.06 15.74 16 14.81 16H9.1899C8.2599 16 7.73 17.06 8.29 17.8Z"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.29 6.2L11.0999 2.45C11.5499 1.85 12.45 1.85 12.9 2.45L15.7099 6.2C16.2699 6.94 15.74 8 14.81 8H9.1899C8.2599 8 7.73 6.94 8.29 6.2Z"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_4482_390">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Existing Grid Inputs */}
      <div className="grid items-center grid-cols-1 md:grid-cols-12 gap-4 flex-1">
        <div className="md:col-span-5 col-span-1">
          <Label>توضیحات</Label>
          <Input
            value={item.desc}
            onChange={(e) => updateItem(index, "desc", e.target.value)}
          />
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
            {typeof item.amount === "number"
              ? item.amount.toLocaleString("fa-IR")
              : "0"}{" "}
            تومان
          </div>
        </div>
        <div className="md:col-span-1 col-span-1 self-end md:justify-self-start justify-self-center">
          <Button
            className="cursor-pointer w-2xs md:w-12"
            variant="outline"
            size="icon"
            onClick={() => removeItem(index)}
            disabled={!canRemove}
          >
            <Trash2 className="size-4"></Trash2>
          </Button>
        </div>
      </div>
    </div>
  );
}
