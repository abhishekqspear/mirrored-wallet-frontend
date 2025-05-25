// // MirroredDisplay.js
// import React from "react";

// const MirroredDisplay = ({ tokens }) => {
//   const totalUSD = tokens.reduce(
//     (sum, token) => sum + token.quantity * token.usdPrice,
//     0
//   );

//   return (
//     <div className="mt-6">
//       <h2 className="text-lg font-bold mb-2">Mirrored Token Balances</h2>
//       <ul className="space-y-2">
//         {tokens.map((token, idx) => (
//           <li key={idx} className="flex items-center justify-between p-2 border rounded">
//             <div className="flex items-center gap-2">
//               <img src={token.logo} alt={token.symbol} className="w-6 h-6" />
//               <span>{token.symbol}</span>
//             </div>
//             <div>
//               <span>{token.quantity} ({(token.quantity * token.usdPrice).toFixed(2)} USD)</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-4 font-semibold">
//         Total USD Equivalent: ${totalUSD.toFixed(2)}
//       </div>
//     </div>
//   );
// };

// export default MirroredDisplay;


import React from "react";

const MirroredDisplay = ({ tokens }) => {
  const totalUSD = tokens.reduce(
    (sum, token) => sum + token.quantity * token.usdPrice,
    0
  );

  return (
    <div className="mt-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Mirrored Token Balances</h2>
      <ul className="space-y-3">
        {tokens.map((token, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <img src={token.logo} alt={token.symbol} className="w-6 h-6" />
              <span className="text-base font-medium">{token.symbol}</span>
            </div>
            <div className="text-right">
              <span>
                {token.quantity} ({(token.quantity * token.usdPrice).toFixed(2)} USD)
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-lg font-semibold text-green-400 text-right">
        Total USD Equivalent: ${totalUSD.toFixed(2)}
      </div>
    </div>
  );
};

export default MirroredDisplay;
