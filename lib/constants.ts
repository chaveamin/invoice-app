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
  discountType: "none",
  discountValue: 0,
  discountAmount: 0,
  subtotal: 0,
  taxEnabled: false,
  taxRate: 10,
  taxAmount: 0,
  total: 0,
  notes: "قبل از شروع کار 50 درصدر از کل مبلغ فاکتور پرداخت میشود\nجهت مشاهده پیشرفت پروژه; کار در ورسل آپلود میشود\nاولین ویرایش رایگان است: بعد از تحویل; کار توسط کارفرما بررسی میشود و در صورت هر گونه اصلاحات همه آنها را در یک پیام به طراح گزارش میدهد. بعد از اصلاح موارد هرگونه ویرایشات بعدی با هزینه انجام میشود"
};
