import { NextResponse } from "next/server";

const globalStore = global as typeof global & {
  invoiceCache?: Map<string, any>;
};

const invoiceStore = globalStore.invoiceCache || new Map<string, any>();

if (process.env.NODE_ENV !== "production") {
  globalStore.invoiceCache = invoiceStore;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const id = Math.random().toString(36).substring(2, 8).toUpperCase();

    invoiceStore.set(id, body);

    setTimeout(() => invoiceStore.delete(id), 24 * 60 * 60 * 1000);

    return NextResponse.json({ id, url: `/share/${id}` });
  } catch (error) {
    return NextResponse.json({ error: "خطا در ساخت لینک" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !invoiceStore.has(id)) {
    return NextResponse.json({ error: "فاکتور پیدا نشد" }, { status: 404 });
  }

  return NextResponse.json(invoiceStore.get(id));
}
