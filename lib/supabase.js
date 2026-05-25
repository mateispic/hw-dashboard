// lib/supabase.js

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getProducts() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing Supabase env vars");
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=*`,
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("SUPABASE ERROR:", data);
    throw new Error(`Supabase error: ${res.status}`);
  }

  return data;
}