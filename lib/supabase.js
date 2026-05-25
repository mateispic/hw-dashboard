// lib/supabase.js
// Fetch-uri directe către Supabase REST API — fără SDK, zero dependențe extra.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getProducts({
  source,
  search,
  sort = "created_at",
  order = "desc",
} = {}) {

  let url = `${SUPABASE_URL}/rest/v1/products?select=*`;

  const filters = [];

  if (source && source !== "all") {
    filters.push(`source=eq.${source}`);
  }

  if (search) {
    filters.push(`title=ilike.*${search}*`);
  }

  if (filters.length) {
    url += "&" + filters.join("&");
  }

  url += `&order=${sort}.${order}`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    next: { revalidate: 300 },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("SUPABASE ERROR:", data);
    throw new Error(`Supabase error: ${res.status}`);
  }

  return data;
}
