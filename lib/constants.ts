import type { InvoiceData } from "@/types/invoice";
import moment from "moment-jalaali";

function getRandomInvId(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomInteger = getRandomInvId(1, 9999);

export const initialInvoiceData: InvoiceData = {
  invoiceNumber: `INV-${randomInteger}`,
  date: moment(moment.now()).format("jYYYY/jMM/jDD"),
  employeeName: "امین چاوه پور",
  employeeWebsite: "designesia.ir",
  employerProjectName: "",
  employerWebsite: "",
  items: [{ id: "1", desc: "", quantity: 1, rate: 1, amount: 0 }],
  total: 0,
};
