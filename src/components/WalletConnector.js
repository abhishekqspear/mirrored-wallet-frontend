// // src/components/WalletConnector.js

// import { useState } from "react";
// import { BrowserProvider } from "ethers";

// function WalletConnector({ onWalletConnected }) {
//   const [walletAddress, setWalletAddress] = useState("");
//   const [status, setStatus] = useState("Disconnected");

//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       alert("MetaMask not found. Please install MetaMask.");
//       return;
//     }

//     try {
//       const provider = new BrowserProvider(window.ethereum); // Ethers v6
//       await window.ethereum.request({ method: "eth_requestAccounts" });

//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();

//       setWalletAddress(address);
//       setStatus("Connected");

//       if (onWalletConnected) {
//         onWalletConnected(address); // optional callback to parent
//       }
//     } catch (err) {
//       if (err?.message?.includes("Modal closed by user")) {
//         alert("Wallet connection was canceled.");
//       } else {
//         console.error("Connection error:", err);
//         alert("Wallet connection failed.");
//       }

//       setStatus("Disconnected");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-2">
//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
//         onClick={connectWallet}
//       >
//         {status === "Connected" ? "Connected" : "Connect Wallet"}
//       </button>
//       {walletAddress && (
//         <p className="text-sm text-gray-500">Wallet: {walletAddress}</p>
//       )}
//     </div>
//   );
// }

// export default WalletConnector;
// WalletConnector.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletConnector = ({ onConnect }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found. Please install MetaMask.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAddress(address);
      setConnected(true);
      onConnect(address); // ← Pass address to parent
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!connected ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-green-500 font-semibold">Connected</p>
      )}
    </div>
  );
};

export default WalletConnector;
