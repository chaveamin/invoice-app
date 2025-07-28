export interface InvoiceItem {
  id: string
  desc: string
  quantity: number | string
  amount: number
}

export interface InvoiceData {
  invoiceNumber: string
  date: string
  fromName: string
  fromEmail: string
  toName: string
  toEmail: string
  items: InvoiceItem[]
  total: number
}
