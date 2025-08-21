'use client';
import Graph from '@/components/Graph';
import Table from '@/components/Table';
import { useState, useEffect, createContext } from 'react';

export const PricesContext = createContext();

export default function Main() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    (async function fetchPrices() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/prices`);
      const { symbol, latestPrice, changePercent, prices: rawPrices } = await res.json();
      console.log('Alpha Vantage response:', prices);
      const timeSeries = rawPrices['Time Series (5min)'] || {};
      const labels = Object.keys(timeSeries).sort();
      const data = labels.map((timestamp) => parseFloat(timeSeries[timestamp]['4. close']));
      setPrices({ symbol, latestPrice, changePercent, labels, data });
    })();
  }, []);

  useEffect(() => console.log(prices), [prices]);

  //m-auto border-x-16 border-[#f3f3f3] border-t-[#3498db] rounded-[50%] w-[120px] h-[120px]

  return (
    <PricesContext.Provider value={prices}>
      {JSON.stringify(prices) === '{}' ? (
        <div className="h-[100dvh] flex">
          <div
            id="spinner"
            className="m-auto w-[120px] h-[120px] rounded-[50%] border-16 border-[#f3f3f3] border-t-[#3498db]"
          ></div>
        </div>
      ) : (
        <>
          <Graph />
          <Table />
        </>
      )}
    </PricesContext.Provider>
  );
}
