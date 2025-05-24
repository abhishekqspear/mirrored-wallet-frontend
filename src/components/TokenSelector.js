// import React, { useState } from "react";
// import tokenList from "../utils/tokenList";
// import TokenForm from "./TokenForm";

// const TokenSelector = () => {
//   const [selectedToken, setSelectedToken] = useState(null);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Select a Token</h2>
//       <div className="grid grid-cols-2 gap-4">
//         {tokenList.map((token) => (
//           <button
//             key={token.symbol}
//             onClick={() => setSelectedToken(token)}
//             className="flex items-center gap-2 p-3 border rounded hover:bg-gray-100"
//           >
//             <img src={token.logo} alt={token.name} className="w-8 h-8" />
//             <span>{token.name}</span>
//           </button>
//         ))}
//       </div>

//       {selectedToken && (
//         <div className="mt-6">
//           <TokenForm token={selectedToken} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default TokenSelector;



// TokenSelector.js
import React, { useState } from "react";
import tokenList from "../utils/tokenList";
import MirroredDisplay from "./MirroredDisplay";

const TokenSelector = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const [mirroredTokens, setMirroredTokens] = useState([]);

  const handleSelect = (token) => {
    setSelectedToken(token);
  };

  const handleTransfer = (quantity) => {
    if (!selectedToken) return;

    const newToken = {
      ...selectedToken,
      quantity: parseFloat(quantity),
    };

    setMirroredTokens((prev) => [...prev, newToken]);
    setSelectedToken(null); // Reset view
    alert(`Mirrored ${quantity} ${selectedToken.symbol} sent to wallet (simulated).`);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Select Token to Mirror</h2>

      <div className="flex gap-4 flex-wrap">
        {tokenList.map((token) => (
          <button
            key={token.symbol}
            className="p-2 border rounded flex flex-col items-center"
            onClick={() => handleSelect(token)}
          >
            <img src={token.logo} alt={token.symbol} className="w-10 h-10" />
            <span>{token.symbol}</span>
          </button>
        ))}
      </div>

      {selectedToken && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold mb-2">
            Mirror {selectedToken.name} ({selectedToken.symbol})
          </h3>
          <input
            type="number"
            placeholder="Enter quantity"
            className="border p-1 mr-2"
            onChange={(e) => setSelectedToken({
              ...selectedToken,
              quantity: e.target.value,
            })}
          />
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => handleTransfer(selectedToken.quantity)}
          >
            Send/Transfer
          </button>
        </div>
      )}

      {/* Show all mirrored balances */}
      {mirroredTokens.length > 0 && (
        <MirroredDisplay tokens={mirroredTokens} />
      )}
    </div>
  );
};

export default TokenSelector;
