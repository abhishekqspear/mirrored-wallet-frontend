// // components/WalletUI.js
// import React from "react";

// const WalletUI = ({ tokens }) => {
//   const totalUsdValue = tokens.reduce((sum, t) => sum + parseFloat(t.totalValue), 0);

//   return (
//     <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 text-white mt-10">
//       <h3 className="text-2xl font-bold mb-4">Wallet Balance</h3>
//       <p className="text-green-400 text-xl mb-6">
//         Total: ${totalUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {tokens.map((token, idx) => (
//           <div
//             key={idx}
//             className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700"
//           >
//             <div>
//               <p className="font-semibold text-lg">{token.symbol} ({token.name})</p>
//               <p className="text-sm text-gray-400">{token.quantity} tokens</p>
//             </div>
//             <div className="text-yellow-400 font-mono text-right">
//               <p className="text-lg">${token.totalValue}</p>
//               <p className="text-xs">(${token.usdPrice}/token)</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WalletUI;

// components/WalletUI.js

// components/WalletUI.js
import React from "react";
import useWallet from "../hooks/useWallet";
import { motion, AnimatePresence } from "framer-motion";

const WalletUI = ({ tokens }) => {
  const account = useWallet();

  // Calculate total USD value
  const totalUsdValue = tokens.reduce((sum, token) => {
    return sum + parseFloat(token.totalValue || 0);
  }, 0);

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 text-white mt-10">
      {/* ✅ Connected Wallet Display */}
      <div className="mb-6 text-sm text-gray-400 flex items-center justify-between">
        {account ? (
          <span className="text-purple-400 font-mono">
            Connected Wallet:{" "}
            <span className="bg-gray-800 px-2 py-1 rounded">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          </span>
        ) : (
          <span className="text-red-400">Wallet not connected</span>
        )}
      </div>

      {/* ✅ Total Balance with Animation */}
      <motion.h3
        className="text-green-400 text-2xl font-bold mb-6"
        key={totalUsdValue}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Total: ${totalUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </motion.h3>

      {/* ✅ Animated Token List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {tokens.map((token, idx) => (
            <motion.div
              key={token.symbol + idx + token.quantity}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <div>
                <p className="font-semibold text-lg">{token.symbol} ({token.name})</p>
                <p className="text-sm text-gray-400">{token.quantity} tokens</p>
              </div>
              <div className="text-yellow-400 font-mono text-right">
                <p className="text-lg">${parseFloat(token.totalValue).toFixed(2)}</p>
                <p className="text-xs">(${token.usdPrice}/token)</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WalletUI;
