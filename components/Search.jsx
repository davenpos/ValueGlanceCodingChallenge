import { useState } from 'react';

export default function Search({ setSymbol }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [matches, setMatches] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/search?search=${value}`);
    const { searchResults } = await res.json();
    setMatches(searchResults.bestMatches);
  };

  return (
    <div className="w-full max-w-md mx-auto pt-4 relative">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white"
        placeholder="Search for a stock (e.g. AAPL, Microsoft)..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)} // Delay to allow click
      />
      {focused && matches.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
          {matches.map((stock) => (
            <li
              key={stock['1. symbol']}
              className="px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition"
              onMouseDown={() => handleSearch(stock['1. symbol'])}
            >
              <span className="font-semibold">{stock['1. symbol']}</span>
              <span className="ml-2 text-gray-300">{stock['2. name']}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
