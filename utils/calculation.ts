import type { InvoiceItem } from "@/types/invoice";

export const calculateTotals = (items: InvoiceItem[], taxEnabled: boolean) => {
  const subtotal = items.reduce((sum, item) => {
    const amount = typeof item.amount === "number" ? item.amount : 0;
    return sum + amount;
  }, 0);

  const taxAmount = taxEnabled ? subtotal * 0.1 : 0;
  const total = subtotal + taxAmount;

  return { subtotal, taxAmount, total };
};
