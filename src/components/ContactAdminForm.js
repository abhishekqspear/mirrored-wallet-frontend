import React, { useState } from "react";
import api from "../services/api";

const ContactAdminForm = ({ onComplete }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/contact-admin", { email, phone });
      onComplete();
    } catch (e) {
      alert("Failed to contact admin");
    }
  };

  return (
    <div className="p-4 border bg-white">
      <input
        className="border p-2 block mb-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 block mb-2 w-full"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="bg-green-500 text-white p-2" onClick={handleSubmit}>Call/Submit</button>
    </div>
  );
};

export default ContactAdminForm;
