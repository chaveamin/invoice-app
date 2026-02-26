export interface InvoiceItem {
  id: string;
  desc: string;
  quantity: number | string;
  rate: number | string;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  employeeName: string;
  employeeWebsite: string;
  employerProjectName: string;
  employerWebsite: string;
  items: InvoiceItem[];
  subtotal: number;
  taxEnabled: boolean;
  taxAmount: number;
  total: number;
}
