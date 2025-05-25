// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import TokenSelector from "../components/TokenSelector";
// import MirroredDisplay from "../components/MirroredDisplay";
// import TransferPopup from "../components/TransferPopup";
// import ContactAdminForm from "../components/ContactAdminForm";

// import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";

// const Home = () => {
//   const address = useAddress(); // Gets connected wallet address
//   const disconnect = useDisconnect(); // Disconnects wallet

//   const [wallet, setWallet] = useState(null);
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [quantity, setQuantity] = useState("");
//   const [usdValue, setUsdValue] = useState(0);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     setWallet(address); // Set wallet state whenever address changes
//   }, [address]);

//   const handleTransfer = () => {
//     setShowPopup(true);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="p-4">
//         <div className="mb-4">
//           {!wallet ? (
//             <ConnectWallet />
//           ) : (
//             <div className="flex items-center space-x-4">
//               <span className="text-green-600 font-bold">Connected: {wallet}</span>
//               <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={disconnect}>
//                 Disconnect
//               </button>
//             </div>
//           )}
//         </div>

//         {wallet && (
//           <>
//             <TokenSelector onSelect={setSelectedToken} />
//             {selectedToken && (
//               <div className="mt-4">
//                 <img src={selectedToken.logo} alt={selectedToken.name} className="w-8 inline" />
//                 <input
//                   className="border p-2 ml-2"
//                   placeholder="Enter quantity"
//                   value={quantity}
//                   onChange={(e) => {
//                     setQuantity(e.target.value);
//                     setUsdValue((+e.target.value * 1).toFixed(2));
//                   }}
//                 />
//                 <button className="bg-purple-500 text-white p-2 ml-2" onClick={handleTransfer}>
//                   Send/Transfer
//                 </button>
//               </div>
//             )}
//             {quantity && <MirroredDisplay token={selectedToken} quantity={quantity} usdValue={usdValue} />}
//             {showPopup && <TransferPopup onContact={() => { setShowPopup(false); setShowForm(true); }} />}
//             {showForm && <ContactAdminForm onComplete={() => { setShowForm(false); alert("Submitted"); }} />}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
// import TokenSelector from "../components/TokenSelector";
// import MirroredDisplay from "../components/MirroredDisplay";
// import TransferPopup from "../components/TransferPopup";
// import ContactAdminForm from "../components/ContactAdminForm";

// const Home = () => {
//   const address = useAddress(); // Automatically updates on wallet connect/disconnect

//   const [selectedToken, setSelectedToken] = useState(null);
//   const [quantity, setQuantity] = useState("");
//   const [usdValue, setUsdValue] = useState(0);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const handleTransfer = () => {
//     if (!quantity || !selectedToken) return;
//     setShowPopup(true);
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="p-4">
//         {/* Wallet Connect Button */}
//         <ConnectWallet
//           theme="dark"
//           modalTitle="Select a Wallet"
//           modalSize="wide"  // "compact" or "wide"
//           className="mb-4"  // Add margin for spacing
//           style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }} // Center the button
//           btnClassName="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
//           btnTitle="Connect Wallet"
//           switchToActiveChain={true}
//         />

//         {/* Main Workflow after Wallet is Connected */}
//         {address && (
//           <>
//             <TokenSelector onSelect={setSelectedToken} />

//             {selectedToken && (
//               <div className="mt-4">
//                 <img
//                   src={selectedToken.logo}
//                   alt={selectedToken.name}
//                   className="w-8 inline"
//                 />
//                 <input
//                   className="border p-2 ml-2"
//                   placeholder="Enter quantity"
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => {
//                     const val = e.target.value;
//                     setQuantity(val);
//                     setUsdValue((+val * 1).toFixed(2)); // Replace with real conversion rate if available
//                   }}
//                 />
//                 <button
//                   className="bg-purple-500 text-white p-2 ml-2"
//                   onClick={handleTransfer}
//                 >
//                   Send/Transfer
//                 </button>
//               </div>
//             )}

//             {/* Real-time display of input */}
//             {quantity && (
//               <MirroredDisplay
//                 token={selectedToken}
//                 quantity={quantity}
//                 usdValue={usdValue}
//               />
//             )}

//             {/* Transfer Confirmation Popup */}
//             {showPopup && (
//               <TransferPopup
//                 onContact={() => {
//                   setShowPopup(false);
//                   setShowForm(true);
//                 }}
//               />
//             )}

//             {/* Contact Admin Form */}
//             {showForm && (
//               <ContactAdminForm
//                 onComplete={() => {
//                   setShowForm(false);
//                   alert("Submitted");
//                 }}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import TokenSelector from "../components/TokenSelector";
import MirroredDisplay from "../components/MirroredDisplay";
import TransferPopup from "../components/TransferPopup";
import ContactAdminForm from "../components/ContactAdminForm";
import HeroHeader from "../components/HeroHeader";
import TokenValueUX from "../components/TokenValueUX";


const Home = () => {
  const address = useAddress();
  const [selectedToken, setSelectedToken] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [usdValue, setUsdValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleTransfer = () => {
    if (!quantity || !selectedToken) return;
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white font-sans">

      {/* <Navbar /> */}
      <HeroHeader />

      <div className="max-w-4xl mx-auto py-10 px-6">
        {/* Wallet Connect Button */}
        <div className="flex justify-center mb-8">
          <ConnectWallet
            theme="dark"
            modalTitle="Select a Wallet"
            modalSize="wide"
            switchToActiveChain={true}
            btnTitle="Connect Wallet"
            className="w-full max-w-sm"
            style={{ borderRadius: "12px" }}
            btnClassName="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all"
          />
        </div>

        {address && (
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
            {/* Token Selection */}
            <TokenSelector onSelect={setSelectedToken} />

            {selectedToken && (
              <div className="mt-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedToken.logo}
                    alt={selectedToken.name}
                    className="w-10 h-10 rounded-full border border-gray-700"
                  />
                  <span className="text-lg font-bold">{selectedToken.name}</span>
                </div>

                <div className="mt-4 flex items-center space-x-4">
                  <input
                    className="w-1/2 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter quantity"
                    type="number"
                    value={quantity}
onChange={(e) => {
  const val = e.target.value;
  setQuantity(val);

  const quantityNum = parseFloat(val);
  if (!isNaN(quantityNum) && selectedToken && selectedToken.price) {
    setUsdValue((quantityNum * selectedToken.price).toFixed(2));
  } else {
    setUsdValue(0);
  }
}}
                  />
                  <button
                    onClick={handleTransfer}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg transition-all font-semibold"
                  >
                    Send / Transfer
                  </button>
                </div>

                {/* 🔽 Insert this line below */}
                {quantity && (
                  <div className="mt-6">
                    <TokenValueUX token={selectedToken} quantity={quantity} />
                  </div>
                )}
              </div>
            )}


            {quantity && (
              <div className="mt-6">
                <MirroredDisplay
                  token={selectedToken}
                  quantity={quantity}
                  usdValue={usdValue}
                />
              </div>
            )}

            {showPopup && (
              <TransferPopup
                onContact={() => {
                  setShowPopup(false);
                  setShowForm(true);
                }}
              />
            )}

            {showForm && (
              <ContactAdminForm
                onComplete={() => {
                  setShowForm(false);
                  alert("Submitted");
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
