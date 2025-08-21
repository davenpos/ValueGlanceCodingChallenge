export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'request' },
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  const searchResults = await res.json();
  return new Response(JSON.stringify({ searchResults }));
}
