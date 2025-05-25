// src/hooks/useWallet.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const useWallet = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getWallet = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
        } catch (err) {
          console.error("Wallet connection error:", err);
        }
      } else {
        alert("MetaMask not detected. Please install it.");
      }
    };

    getWallet();
  }, []);

  return account;
};

export default useWallet;

