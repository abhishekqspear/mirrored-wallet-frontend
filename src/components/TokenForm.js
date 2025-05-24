import React, { useState } from "react";

const TokenForm = ({ token }) => {
  const [quantity, setQuantity] = useState("");

  const handleSend = () => {
    if (!quantity || isNaN(quantity)) {
      alert("Please enter a valid quantity.");
      return;
    }

    // Simulated action
    alert(`Mirrored ${quantity} ${token.symbol} sent to wallet (simulated).`);
    // You can lift state here to update wallet UI or mirrored balances.
  };

  return (
    <div className="border p-4 rounded shadow-md bg-white max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <img src={token.logo} alt={token.name} className="w-8 h-8" />
        <h3 className="text-lg font-medium">{token.name}</h3>
      </div>

      <input
        type="number"
        placeholder="Enter mirrored quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send/Transfer
      </button>
    </div>
  );
};

export default TokenForm;
