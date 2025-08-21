import { useContext } from 'react';
import { PricesContext } from './Main';

export default function Table() {
  const prices = useContext(PricesContext);

  return (
    <>
      {prices ? (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{prices.symbol}</td>
              <td>{prices.latestPrice}</td>
              <td>{prices.changePercent}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
