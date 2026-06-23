import type { InvoiceItem } from "@/types/invoice";

export const calculateTotals = (
  items: InvoiceItem[],
  taxEnabled: boolean,
  taxRate: number = 10,
  discountType: "percentage" | "fixed" | "none" = "none",
  discountValue: number = 0,
) => {
  const subtotal = items.reduce((sum, item) => {
    const amount = typeof item.amount === "number" ? item.amount : 0;
    return sum + amount;
  }, 0);

  // Discount
  let discountAmount = 0;
  if (discountType === "percentage") {
    discountAmount = subtotal * (discountValue / 100);
  } else if (discountType === "fixed") {
    discountAmount = discountValue;
  }

  discountAmount = Math.min(discountAmount, subtotal);

  // Apply Discount
  const discountedSubtotal = subtotal - discountAmount;

  const taxAmount = taxEnabled ? discountedSubtotal * (taxRate / 100) : 0;
  const total = discountedSubtotal + taxAmount;

  return { subtotal, discountAmount, taxAmount, total };
};
