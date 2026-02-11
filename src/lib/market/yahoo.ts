import "server-only";

export async function fetchYahooPrice(symbol: string): Promise<number | null> {
  // Normalize for NSE (India)
  const yahooSymbol = `${symbol.toUpperCase()}.NS`;

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1d`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const result = json?.chart?.result?.[0];

    const price = result?.meta?.regularMarketPrice;

    if (typeof price !== "number") return null;
    

    return price;
  } catch {
    return null;
  }
}
