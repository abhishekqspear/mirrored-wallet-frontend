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
// import React, { useState } from "react";
// import tokenList from "../utils/tokenList";
// import MirroredDisplay from "./MirroredDisplay";

// const TokenSelector = () => {
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [mirroredTokens, setMirroredTokens] = useState([]);

//   const handleSelect = (token) => {
//     setSelectedToken(token);
//   };

//   const handleTransfer = (quantity) => {
//     if (!selectedToken) return;

//     const newToken = {
//       ...selectedToken,
//       quantity: parseFloat(quantity),
//     };

//     setMirroredTokens((prev) => [...prev, newToken]);
//     setSelectedToken(null); // Reset view
//     alert(`Mirrored ${quantity} ${selectedToken.symbol} sent to wallet (simulated).`);
//   };

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-4">Select Token to Mirror</h2>

//       <div className="flex gap-4 flex-wrap">
//         {tokenList.map((token) => (
//           <button
//             key={token.symbol}
//             className="p-2 border rounded flex flex-col items-center"
//             onClick={() => handleSelect(token)}
//           >
//             <img src={token.logo} alt={token.symbol} className="w-10 h-10" />
//             <span>{token.symbol}</span>
//           </button>
//         ))}
//       </div>

//       {selectedToken && (
//         <div className="mt-4 p-4 border rounded bg-gray-100">
//           <h3 className="font-semibold mb-2">
//             Mirror {selectedToken.name} ({selectedToken.symbol})
//           </h3>
//           <input
//             type="number"
//             placeholder="Enter quantity"
//             className="border p-1 mr-2"
//             onChange={(e) => setSelectedToken({
//               ...selectedToken,
//               quantity: e.target.value,
//             })}
//           />
//           <button
//             className="bg-green-600 text-white px-3 py-1 rounded"
//             onClick={() => handleTransfer(selectedToken.quantity)}
//           >
//             Send/Transfer
//           </button>
//         </div>
//       )}

//       {/* Show all mirrored balances */}
//       {mirroredTokens.length > 0 && (
//         <MirroredDisplay tokens={mirroredTokens} />
//       )}
//     </div>
//   );
// };

// export default TokenSelector;

// import React, { useState } from "react";
// import tokenList from "../utils/tokenList";
// import MirroredDisplay from "./MirroredDisplay";
// import { CheckCircle } from "lucide-react";
// import TransferPopup from "./TransferPopup"; // ✅ NEW

// const TokenSelector = () => {
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [mirroredTokens, setMirroredTokens] = useState([]);
//   const [showPopup, setShowPopup] = useState(false); // ✅ NEW

//   const handleSelect = (token) => {
//     setSelectedToken({ ...token, quantity: "" });
//   };

//   const handleTransfer = async (quantity) => {
//     if (!selectedToken || !quantity) return;

//     try {
//       const response = await fetch(
//         `https://api.coingecko.com/api/v3/simple/price?ids=${selectedToken.coingeckoId}&vs_currencies=usd`
//       );
//       const data = await response.json();
//       const usdPrice = data[selectedToken.coingeckoId]?.usd || 0;

//       const newToken = {
//         ...selectedToken,
//         quantity: parseFloat(quantity),
//         usdPrice,
//       };

//       setMirroredTokens((prev) => [...prev, newToken]);
//       setSelectedToken(null);
//       setShowPopup(true); // ✅ Show popup instead of alert
//     } catch (error) {
//       console.error("Failed to fetch live token price:", error);
//       alert("Failed to fetch live price. Please try again later.");
//     }
//   };

//   return (
//     <div className="mt-6 text-white">
//       <h2 className="text-3xl font-bold mb-8 text-center">Select Token to Mirror</h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {tokenList.map((token) => {
//           const isSelected = selectedToken?.symbol === token.symbol;

//           return (
//             <div
//               key={token.symbol}
//               className={`relative p-5 rounded-2xl border-2 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center bg-gray-800 hover:bg-gray-700 ${
//                 isSelected ? "border-purple-500" : "border-gray-600"
//               }`}
//               onClick={() => handleSelect(token)}
//             >
//               <img src={token.logo} alt={token.symbol} className="w-14 h-14 mb-3" />
//               <p className="font-semibold text-lg">{token.symbol}</p>
//               {isSelected && (
//                 <CheckCircle className="absolute top-2 right-2 text-purple-500" size={24} />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {selectedToken && (
//         <div className="mt-8 p-6 border border-gray-700 rounded-xl bg-gray-900 shadow-lg">
//           <h3 className="text-xl font-semibold mb-4">
//             Mirror {selectedToken.name} ({selectedToken.symbol})
//           </h3>
//           <div className="flex flex-wrap items-center gap-4">
//             <input
//               type="number"
//               placeholder="Enter quantity"
//               className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               value={selectedToken.quantity || ""}
//               onChange={(e) =>
//                 setSelectedToken({ ...selectedToken, quantity: e.target.value })
//               }
//             />
//             <button
//               className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all"
//               onClick={() => handleTransfer(selectedToken.quantity)}
//             >
//               Send / Transfer
//             </button>
//           </div>
//         </div>
//       )}

//       {mirroredTokens.length > 0 && (
//         <div className="mt-10">
//           <MirroredDisplay tokens={mirroredTokens} />
//         </div>
//       )}

//       {/* ✅ Transfer Popup */}
//       {showPopup && (
//         <TransferPopup
//           token={selectedToken}
//           quantity={selectedToken?.quantity}
//           onClose={() => setShowPopup(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default TokenSelector;




// // TokenSelector.js
// import React, { useState, useEffect } from "react";
// import tokenList from "../utils/tokenList";
// import MirroredDisplay from "./MirroredDisplay";
// import { CheckCircle } from "lucide-react";
// import TransferPopup from "./TransferPopup";
// import NotificationPopup from "./NotificationPopup";
// import WalletUI from "./WalletUI";



// const TokenSelector = () => {
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [mirroredTokens, setMirroredTokens] = useState([]);
//   const [previewData, setPreviewData] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [notification, setNotification] = useState("");
//   const handleSelect = (token) => {
//     setSelectedToken({ ...token, quantity: "" });
//   };

//   const handlePreview = async () => {
//     if (!selectedToken || !selectedToken.quantity) return;

//     try {
//       const response = await fetch(
//         `https://api.coingecko.com/api/v3/simple/price?ids=${selectedToken.coingeckoId}&vs_currencies=usd`
//       );
//       const data = await response.json();
//       const usdPrice = data[selectedToken.coingeckoId]?.usd || 0;

//       setPreviewData({
//         ...selectedToken,
//         usdPrice,
//         totalValue: (usdPrice * parseFloat(selectedToken.quantity)).toFixed(2),
//       });
//       setShowPreview(true);
//     } catch (error) {
//       console.error("Failed to fetch live token price:", error);
//       alert("Failed to fetch live price. Please try again later.");
//     }
//   };

// const handleConfirmTransfer = () => {
//   if (!previewData) return;

//   setMirroredTokens((prev) => [...prev, previewData]);
//   setSelectedToken(null);
//   setPreviewData(null);
//   setShowPreview(false);
  
//   setNotification(
//     `Mirrored ${previewData.quantity} ${previewData.symbol} sent to wallet (simulated).`
//   );
// };


//   return (
//     <div className="mt-6 text-white">
//       <h2 className="text-3xl font-bold mb-8 text-center">Select Token to Mirror</h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {tokenList.map((token) => {
//           const isSelected = selectedToken?.symbol === token.symbol;

//           return (
//             <div
//               key={token.symbol}
//               className={`relative p-5 rounded-2xl border-2 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center bg-gray-800 hover:bg-gray-700 ${
//                 isSelected ? "border-purple-500" : "border-gray-600"
//               }`}
//               onClick={() => handleSelect(token)}
//             >
//               <img src={token.logo} alt={token.symbol} className="w-14 h-14 mb-3" />
//               <p className="font-semibold text-lg">{token.symbol}</p>

//               {isSelected && (
//                 <CheckCircle className="absolute top-2 right-2 text-purple-500" size={24} />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {selectedToken && (
//         <div className="mt-8 p-6 border border-gray-700 rounded-xl bg-gray-900 shadow-lg">
//           <h3 className="text-xl font-semibold mb-4">
//             Mirror {selectedToken.name} ({selectedToken.symbol})
//           </h3>
//           <div className="flex flex-wrap items-center gap-4">
//             <input
//               type="number"
//               placeholder="Enter quantity"
//               className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               value={selectedToken.quantity || ""}
//               onChange={(e) =>
//                 setSelectedToken({ ...selectedToken, quantity: e.target.value })
//               }
//             />
//             <button
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
//               onClick={handlePreview}
//             >
//               Preview
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Show popup modal */}
//       {showPreview && previewData && (
//         <TransferPopup
//           onClose={() => setShowPreview(false)}
//         >
//           <div className="text-white font-mono">
//             <h4 className="text-xl font-bold mb-2">Transfer Preview</h4>
//             <p>
//               Token: {previewData.symbol} ({previewData.name})<br />
//               Quantity: {previewData.quantity}<br />
//               USD Rate: ${previewData.usdPrice}<br />
//               Estimated Value: ${previewData.totalValue}
//             </p>
//             <p className="mt-4 text-yellow-400">
//               ⚠ This is a mirrored token, not real crypto.
//             </p>
//             <div className="mt-6 flex justify-end gap-4">
//               <button
//                 className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
//                 onClick={() => setShowPreview(false)}
//               >
//                 Modify
//               </button>
//               <button
//                 className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700"
//                 onClick={handleConfirmTransfer}
//               >
//                 Send / Transfer
//               </button>
//             </div>
//           </div>
//         </TransferPopup>
//       )}
//       {notification && (
//   <NotificationPopup
//     message={notification}
//     onClose={() => setNotification("")}
//   />
// )}

// {mirroredTokens.length > 0 && (
//   <WalletUI tokens={mirroredTokens} />
// )}
//     </div>
//   );
// };

// export default TokenSelector;


// TokenSelector.js
import React, { useState } from "react";
import tokenList from "../utils/tokenList";
import MirroredDisplay from "./MirroredDisplay";
import { CheckCircle } from "lucide-react";
import TransferPopup from "./TransferPopup";
import NotificationPopup from "./NotificationPopup";
import WalletUI from "./WalletUI";
import DustErrorPopup from "./DustErrorPopup"; // ✅ import the popup

const TokenSelector = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const [mirroredTokens, setMirroredTokens] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [notification, setNotification] = useState("");
  const [showDustError, setShowDustError] = useState(false); // ✅ popup control

  const handleSelect = (token) => {
    setSelectedToken({ ...token, quantity: "" });
  };

  const handlePreview = async () => {
    if (!selectedToken || !selectedToken.quantity) return;

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${selectedToken.coingeckoId}&vs_currencies=usd`
      );
      const data = await response.json();
      const usdPrice = data[selectedToken.coingeckoId]?.usd || 0;

      setPreviewData({
        ...selectedToken,
        usdPrice,
        totalValue: (usdPrice * parseFloat(selectedToken.quantity)).toFixed(2),
      });
      setShowPreview(true);
    } catch (error) {
      console.error("Failed to fetch live token price:", error);
      alert("Failed to fetch live price. Please try again later.");
    }
  };

  const handleConfirmTransfer = () => {
    if (!previewData) return;

    setMirroredTokens((prev) => [...prev, previewData]);
    setSelectedToken(null);
    setPreviewData(null);
    setShowPreview(false);
    setNotification(
      `Mirrored ${previewData.quantity} ${previewData.symbol} sent to wallet (simulated).`
    );
    setShowDustError(true); // ✅ trigger DustError popup
  };

  return (
    <div className="mt-6 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Select Token to Mirror</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {tokenList.map((token) => {
          const isSelected = selectedToken?.symbol === token.symbol;

          return (
            <div
              key={token.symbol}
              className={`relative p-5 rounded-2xl border-2 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center bg-gray-800 hover:bg-gray-700 ${
                isSelected ? "border-purple-500" : "border-gray-600"
              }`}
              onClick={() => handleSelect(token)}
            >
              <img src={token.logo} alt={token.symbol} className="w-14 h-14 mb-3" />
              <p className="font-semibold text-lg">{token.symbol}</p>
              {isSelected && (
                <CheckCircle className="absolute top-2 right-2 text-purple-500" size={24} />
              )}
            </div>
          );
        })}
      </div>

      {selectedToken && (
        <div className="mt-8 p-6 border border-gray-700 rounded-xl bg-gray-900 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Mirror {selectedToken.name} ({selectedToken.symbol})
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="number"
              placeholder="Enter quantity"
              className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedToken.quantity || ""}
              onChange={(e) =>
                setSelectedToken({ ...selectedToken, quantity: e.target.value })
              }
            />
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
              onClick={handlePreview}
            >
              Preview
            </button>
          </div>
        </div>
      )}

      {showPreview && previewData && (
        <TransferPopup onClose={() => setShowPreview(false)}>
          <div className="text-white font-mono">
            <h4 className="text-xl font-bold mb-2">Transfer Preview</h4>
            <p>
              Token: {previewData.symbol} ({previewData.name})<br />
              Quantity: {previewData.quantity}<br />
              USD Rate: ${previewData.usdPrice}<br />
              Estimated Value: ${previewData.totalValue}
            </p>
            <p className="mt-4 text-yellow-400">
              ⚠ This is a mirrored token, not real crypto.
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                onClick={() => setShowPreview(false)}
              >
                Modify
              </button>
              <button
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700"
                onClick={handleConfirmTransfer}
              >
                Send / Transfer
              </button>
            </div>
          </div>
        </TransferPopup>
      )}

      {notification && (
        <NotificationPopup
          message={notification}
          onClose={() => setNotification("")}
        />
      )}

      {showDustError && (
        <DustErrorPopup
          onClose={() => setShowDustError(false)} // ✅ Close functionality
        />
      )}

      {mirroredTokens.length > 0 && <WalletUI tokens={mirroredTokens} />}
    </div>
  );
};

export default TokenSelector;
