'use client';
import Graph from '@/components/Graph';
import { useState, useEffect } from 'react';

export default function Main() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    (async function fetchPrices() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/prices`);
      const data = await res.json();
      console.log(data);
      setPrices(data.patients);
    })();
  }, []);

  return <Graph />;
}
