"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { InvoiceData, InvoiceTemplate } from "@/types/invoice";

interface TemplateContextType {
  templates: InvoiceTemplate[];
  saveTemplate: (name: string, invoice: InvoiceData) => void;
  deleteTemplate: (id: string) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined,
);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<InvoiceTemplate[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("invoice-templates");
    if (saved) {
      try {
        setTemplates(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse templates", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("invoice-templates", JSON.stringify(templates));
    }
  }, [templates, isLoaded]);

  const saveTemplate = (name: string, invoice: InvoiceData) => {
    const newTemplate: InvoiceTemplate = {
      id: Date.now().toString(),
      name,
      data: invoice,
    };
    setTemplates((prev) => [...prev, newTemplate]);
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TemplateContext.Provider
      value={{ templates, saveTemplate, deleteTemplate }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplates() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error("useTemplates must be used within a TemplateProvider");
  }
  return context;
}
