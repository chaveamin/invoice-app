export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const formatCurrency = (amount: number) => {
  return `${amount} تومان`;
};
