import React from "react";

const TransferPopup = ({ onContact }) => (
  <div className="p-4 border rounded bg-red-100">
    <p className="text-red-700">Dust Error: UXTO 26<br />No Equity</p>
    <button className="mt-2 bg-blue-500 text-white p-2" onClick={onContact}>Contact Administrator</button>
  </div>
);

export default TransferPopup;