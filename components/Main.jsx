'use client';
import Graph from '@/components/Graph';
import Table from '@/components/Table';
import { useState, useEffect, createContext } from 'react';

export const PricesContext = createContext();

export default function Main() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    (async function fetchPrices() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/prices`);
      const { symbol, latestPrice, changePercent, prices: rawPrices } = await res.json();
      const timeSeries = rawPrices['Time Series (5min)'] || {};
      const labels = Object.keys(timeSeries).sort();
      const data = labels.map((timestamp) => parseFloat(timeSeries[timestamp]['4. close']));
      setPrices({ symbol, latestPrice, changePercent, labels, data });
    })();
  }, []);

  return (
    <PricesContext.Provider value={prices}>
      <Graph />
      <Table />
    </PricesContext.Provider>
  );
}
