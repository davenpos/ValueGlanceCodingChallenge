export async function GET() {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'request' },
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  const prices = await res.json();

  return new Response(
    JSON.stringify({
      prices: prices,
    })
  );
}
