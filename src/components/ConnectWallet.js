// ConnectWallet.js
import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const ConnectWalletComponent = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Connect Your Wallet</h2>
      <ConnectWallet
        theme="dark"                    // or "light"
        btnTitle="Connect Wallet"       // button text
        modalTitle="Select a Wallet"    // modal title
        switchToActiveChain={true}      // auto-switch to desired chain
        modalSize="wide"             // modal layout: "compact" or "wide"
      />
    </div>
  );
};

export default ConnectWalletComponent;
