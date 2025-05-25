import React, { useEffect, useState } from "react";
import axios from "axios";

const TokenValueUX = ({ token, quantity }) => {
  const [usdPrice, setUsdPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatUSD = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  useEffect(() => {
    if (!token || !quantity || quantity <= 0) return;

    const fetchPrice = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${token.coingeckoId}&vs_currencies=usd`
        );

        const price = response.data[token.coingeckoId]?.usd;

        if (price) {
          setUsdPrice(+price * +quantity);
        } else {
          setError("Price unavailable.");
          setUsdPrice(null);
        }
      } catch (err) {
        console.error("Error fetching price:", err);
        setError("Failed to fetch token value.");
        setUsdPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [token, quantity]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-6 text-white">
      <h3 className="text-xl font-semibold mb-4">📊 Live Conversion</h3>

      {loading ? (
        <p className="text-yellow-300">Fetching latest value...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <p className="text-lg font-medium">
          {quantity} {token?.symbol?.toUpperCase()} ≈{" "}
          <span className="text-green-400">
            {formatUSD(usdPrice)}
          </span>
        </p>
      )}

      <div className="mt-6">
        <p className="text-sm mb-1">Estimated Fees</p>
        <div className="w-full bg-gray-600 rounded-full h-2.5">
          <div className="bg-yellow-400 h-2.5 rounded-full w-1/3"></div>
        </div>
      </div>

      <p className="mt-4 text-sm text-yellow-300">
        ⚠️ Simulated transfer only (no actual tokens moved).
      </p>
    </div>
  );
};

export default TokenValueUX;
