import React, { useState } from "react";
import Navbar from "../components/Navbar";
import WalletConnector from "../components/WalletConnector";
import TokenSelector from "../components/TokenSelector";
import MirroredDisplay from "../components/MirroredDisplay";
import TransferPopup from "../components/TransferPopup";
import ContactAdminForm from "../components/ContactAdminForm";

const Home = () => {
  const [wallet, setWallet] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [usdValue, setUsdValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleTransfer = () => {
    setShowPopup(true);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <WalletConnector onConnect={setWallet} />
        {wallet && (
          <>
            <TokenSelector onSelect={setSelectedToken} />
            {selectedToken && (
              <div className="mt-4">
                <img src={selectedToken.logo} alt={selectedToken.name} className="w-8 inline" />
                <input
                  className="border p-2 ml-2"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setUsdValue((+e.target.value * 1).toFixed(2));
                  }}
                />
                <button className="bg-purple-500 text-white p-2 ml-2" onClick={handleTransfer}>Send/Transfer</button>
              </div>
            )}
            {quantity && <MirroredDisplay token={selectedToken} quantity={quantity} usdValue={usdValue} />}
            {showPopup && <TransferPopup onContact={() => { setShowPopup(false); setShowForm(true); }} />}
            {showForm && <ContactAdminForm onComplete={() => { setShowForm(false); alert("Submitted"); }} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
