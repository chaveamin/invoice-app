"use client";

import { useState } from "react";
import InvoicePreview from "@/components/invoice-preview";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import InvoiceForm from "@/components/invoice-form";

export default function Home() {
  const [showPreview, setShowPreview] = useState(false);
  if (showPreview) {
    return <InvoicePreview onBack={() => setShowPreview(false)} />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <InvoiceForm></InvoiceForm>
          <div className="flex items-center justify-center mt-6">
            <Button
              className="cursor-pointer w-xs"
              onClick={() => setShowPreview(true)}
            >
              <Eye className="size-4"></Eye>
              پیشنمایش
            </Button>
          </div>
        </div>
      </div>
      <footer className="p-4 border-t border-t-gray-200 bg-gray-50 flex items-center justify-between">
        <a href="https://github.com/chaveamin/invoice-app" target="_blank">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_4482_11501)">
              <path
                d="M7 21.99H8.67V20.84C8.67 20.84 8.65 19.04 9.64 17.52C7.38 17.36 5.59 15.35 5.59 12.86C5.59 11.99 5.92 11.17 6.49 10.47L6.55 8.32C6.55 7.77 7.11 7.4 7.62 7.59L9.93 8.42C10.58 8.26 11.28 8.17 12 8.17C12.72 8.17 13.42 8.26 14.07 8.43L16.38 7.6C16.89 7.41 17.44 7.79 17.45 8.33L17.51 10.48C18.08 11.18 18.41 11.99 18.41 12.87C18.41 15.36 16.62 17.37 14.36 17.53C15.35 19.05 15.33 20.85 15.33 20.85V22H17C19.76 22 22 19.76 22 17.01V7C22 4.24 19.76 2 17 2H7C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_4482_11501">
                <rect width="24" height="24" fill="black"></rect>
              </clipPath>
            </defs>
          </svg>
        </a>
      </footer>
    </>
  );
}
