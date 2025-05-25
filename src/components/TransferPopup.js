import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { X } from "lucide-react";

const TransferPopup = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <motion.div
        className="bg-[#111] border border-purple-600 text-green-400 p-8 rounded-2xl shadow-2xl relative w-[90%] max-w-md font-mono"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-purple-500 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Render passed content here */}
        {children}
      </motion.div>
    </div>
  );
};

export default TransferPopup;
