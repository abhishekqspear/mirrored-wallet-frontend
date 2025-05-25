// // components/DustErrorPopup.js 
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const DustErrorPopup = ({ onClose, onSubmit }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");

//   const handleSubmit = () => {
//     if (typeof onSubmit === "function") {
//       onSubmit({ phone, email });
//     } else {
//       console.error("onSubmit is not a function or was not passed.");
//     }
//     if (typeof onClose === "function") {
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//       <motion.div
//         className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//       >
//         {!showForm ? (
//           <>
//             <h2 className="text-xl font-bold mb-4 text-red-500">
//               -Dust Error: {"{UXTO 26}"}-<br /> No Equity
//             </h2>
//             <p className="mb-4 text-gray-300">
//               The transfer cannot be completed. Contact the administrator.
//             </p>
//             <button
//               className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
//               onClick={() => setShowForm(true)}
//             >
//               Contact Administrator
//             </button>
//           </>
//         ) : (
//           <>
//             <h2 className="text-lg font-semibold mb-4">Contact Administrator</h2>
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600 text-white"
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 text-white"
//             />
//             <div className="flex justify-end gap-4">
//               <button
//                 className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
//                 onClick={handleSubmit}
//               >
//                 Call / Submit
//               </button>
//             </div>
//           </>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default DustErrorPopup;


// DustErrorPopup.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const DustErrorPopup = ({ onClose, onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (typeof onSubmit === "function") {
      onSubmit({ phone, email });
    } else {
      console.error("onSubmit is not a function or was not passed.");
    }
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <motion.div
        className="bg-[#111] border border-red-600 text-red-400 p-8 rounded-2xl shadow-2xl relative w-[90%] max-w-md font-mono"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {!showForm ? (
          <>
            <h2 className="text-xl font-bold mb-2 text-red-500">
              -Dust Error: {"{UXTO 26}"}-
            </h2>
            <p className="mb-6 text-red-400">No Equity</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
              >
                Contact Administrator
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4 text-white">
              Contact Administrator
            </h2>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 text-white"
            />
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleSubmit}
              >
                Call / Submit
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default DustErrorPopup;
