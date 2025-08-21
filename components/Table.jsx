import { useContext } from 'react';
import { PricesContext } from './Main';

export default function Table() {
  const prices = useContext(PricesContext);

  return (
    <table className="w-xl text-left border-collapse m-auto border-1 border-white text-shadow-sm border-">
      <thead>
        <tr>
          <th className="border-1 border-white px-1">Symbol</th>
          <th className="border-1 border-white px-1">Price</th>
          <th className="border-1 border-white px-1">Change %</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-1 border-white px-1">{prices.apiSymbol}</td>
          <td className="border-1 border-white px-1">${prices.latestPrice.toFixed(2)}</td>
          <td className="border-1 border-white px-1">{prices.changePercent}</td>
        </tr>
      </tbody>
    </table>
  );
}
