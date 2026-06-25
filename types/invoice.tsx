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
  discountType: "percentage" | "fixed" | "none";
  discountValue: number;
  discountAmount: number;
  subtotal: number;
  taxEnabled: boolean;
  taxRate: number;
  taxAmount: number;
  total: number;
  logo?: string | null;
  notes?: string;
  colorTheme?: string;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  data: InvoiceData;
}
