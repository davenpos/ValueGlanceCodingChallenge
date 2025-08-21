'use client';
import Search from '@/components/Search';
import Graph from '@/components/Graph';
import Table from '@/components/Table';
import { useState, useEffect, createContext } from 'react';

export const PricesContext = createContext();

export default function Main() {
  const [prices, setPrices] = useState({});
  const [symbol, setSymbol] = useState('IBM');

  useEffect(() => {
    (async function fetchPrices() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/prices?symbol=${symbol}`);
      const { apiSymbol, latestPrice, changePercent, prices: rawPrices } = await res.json();
      const timeSeries = rawPrices['Time Series (5min)'] || {};
      const labels = Object.keys(timeSeries).sort();
      const data = labels.map((timestamp) => parseFloat(timeSeries[timestamp]['4. close']));
      setPrices({ apiSymbol, latestPrice, changePercent, labels, data });
    })();
  }, [symbol]);

  return (
    <>
      {JSON.stringify(prices) === '{}' ? (
        <div className="h-[100dvh] flex">
          <div
            id="spinner"
            className="m-auto w-[120px] h-[120px] rounded-[50%] border-16 border-[#f3f3f3] border-t-[#3498db]"
          ></div>
        </div>
      ) : (
        <>
          {/* <Search setSymbol={setSymbol} /> */}
          <PricesContext.Provider value={prices}>
            <Graph />
            <Table />
          </PricesContext.Provider>
        </>
      )}
    </>
  );
}
