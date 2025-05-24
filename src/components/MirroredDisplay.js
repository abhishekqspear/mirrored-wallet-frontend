// MirroredDisplay.js
import React from "react";

const MirroredDisplay = ({ tokens }) => {
  const totalUSD = tokens.reduce(
    (sum, token) => sum + token.quantity * token.usdPrice,
    0
  );

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Mirrored Token Balances</h2>
      <ul className="space-y-2">
        {tokens.map((token, idx) => (
          <li key={idx} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center gap-2">
              <img src={token.logo} alt={token.symbol} className="w-6 h-6" />
              <span>{token.symbol}</span>
            </div>
            <div>
              <span>{token.quantity} ({(token.quantity * token.usdPrice).toFixed(2)} USD)</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-semibold">
        Total USD Equivalent: ${totalUSD.toFixed(2)}
      </div>
    </div>
  );
};

export default MirroredDisplay;
