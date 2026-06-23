import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import InvoiceItem from "@/components/invoice-item";
import { useInvoice } from "@/context/invoice-context";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

export default function ItemsList() {
  const { invoice, addItem, reorderItems } = useInvoice();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If dropped on a different item, update state
    if (over && active.id !== over.id) {
      const oldIndex = invoice.items.findIndex((item) => item.id === active.id);
      const newIndex = invoice.items.findIndex((item) => item.id === over.id);
      reorderItems(oldIndex, newIndex);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-bold text-xl">
          اقلام فاکتور ({invoice.items.length})
        </CardTitle>
        <Button className="cursor-pointer" size="sm" onClick={addItem}>
          <Plus className="size-4"></Plus>
          افزودن
        </Button>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={invoice.items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col border-t">
              {invoice.items.map((item, index) => (
                <InvoiceItem
                  key={item.id}
                  item={item}
                  index={index}
                  canRemove={invoice.items.length > 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
