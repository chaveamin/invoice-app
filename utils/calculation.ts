import type { InvoiceItem } from "@/types/invoice";

export const calculateTotals = (
  items: InvoiceItem[],
  taxEnabled: boolean,
  discountType: "percentage" | "fixed" | "none" = "none",
  discountValue: number = 0
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
  
  // 2. Apply Discount
  const discountedSubtotal = subtotal - discountAmount;

  // 3. Calculate Tax
  const taxAmount = taxEnabled ? discountedSubtotal * 0.1 : 0;
  const total = discountedSubtotal + taxAmount;

  return { subtotal, discountAmount, taxAmount, total };
};