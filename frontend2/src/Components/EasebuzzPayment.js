import React, { useState } from "react";
import axios from "axios";
import EasebuzzCheckout from "react-easebuzz-checkout";

export default function EasebuzzPayment() {
  const [options, setOptions] = useState(null);

  const initiatePayment = async () => {
    try {
      const txnid = "TXN" + Date.now();
      const res = await axios.post("http://localhost:5000/api/payment/pay", {
        txnid,
        amount: 100, // ₹100
        firstname: "Test User",
        email: "test@example.com",
        phone: "9999999999",
        productinfo: "Test Product",
      });

      setOptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={initiatePayment}>Pay with Easebuzz</button>

      {options && (
        <EasebuzzCheckout
          options={options}
          key={options.key}
          env={options.env} // test or prod
        />
      )}
    </div>
  );
}
