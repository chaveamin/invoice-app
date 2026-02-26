import type { InvoiceData } from "@/types/invoice";

function getRandomInvId(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomInteger = getRandomInvId(1, 9999);

export const initialInvoiceData: InvoiceData = {
  invoiceNumber: `INV-${randomInteger}`,
  date: new Date().toISOString(),
  employeeName: "امین چاوه پور",
  employeeWebsite: "achave.ir",
  employerProjectName: "",
  employerWebsite: "",
  items: [{ id: "1", desc: "", quantity: 1, rate: 1, amount: 0 }],
  total: 0,
};
