"use client";

import { initialInvoiceData } from "@/lib/constants";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { createContext, ReactNode, useContext, useState } from "react";

interface InvoiceContextType {
  invoice: InvoiceData;
  updateInvoice: (updates: Partial<InvoiceData>) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, field: keyof InvoiceItem, value: string | number) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoice, setInvoice] = useState<InvoiceData>(initialInvoiceData);

  const updateInvoice = (updates: Partial<InvoiceData>) => {
    const newInvoice = { ...invoice, ...updates };
    setInvoice(newInvoice);
  };

  function getRandomInvId(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomInteger = getRandomInvId(1, 9999);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: randomInteger.toString(),
      desc: "",
      quantity: 1,
      rate: 1,
      amount: 0,
    };
    updateInvoice({ items: [...invoice.items, newItem] });
  };

  const removeItem = (index: number) => {
    if (invoice.items.length > 1) {
      const newItems = invoice.items.filter((_, i) => i !== index);
      updateInvoice({ items: newItems });
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateInvoice({ items: newItems });
    console.log(newItems);
  };

  return (
    <InvoiceContext.Provider value={{ invoice, updateInvoice, addItem, removeItem, updateItem }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
}
