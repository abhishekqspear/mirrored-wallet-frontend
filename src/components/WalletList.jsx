// components/WalletList.jsx
import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const WalletList = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Connect Your Wallet</h2>
      <ConnectWallet />
    </div>
  );
};

export default WalletList;
