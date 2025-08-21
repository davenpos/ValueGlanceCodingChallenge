export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const apiSymbol = searchParams.get('symbol');
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${apiSymbol}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'request' },
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  const prices = await res.json();

  const timeSeries = prices['Time Series (5min)'] || {};
  const timestamps = Object.keys(timeSeries).sort();
  const latest = timeSeries[timestamps[timestamps.length - 1]];
  const previous = timeSeries[timestamps[timestamps.length - 2]];
  const latestPrice = latest ? parseFloat(latest['4. close']) : null;
  const prevPrice = previous ? parseFloat(previous['4. close']) : null;
  const changePercent =
    latestPrice && prevPrice ? (((latestPrice - prevPrice) / prevPrice) * 100).toFixed(2) : null;

  return new Response(JSON.stringify({ apiSymbol, latestPrice, changePercent, prices }));
}
