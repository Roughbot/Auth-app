"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/resetpasswordmail", { email });
      setMessage(true);
    } catch (error: any) {
      console.error("failed to send email", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Reset Password Page
      </h1>
      <p className="text-2xl">Enter your Registered Email-Id</p>
      <input
        className="px-3 py-2 mt-3 mb-3 text-sm leading-tight text-black border bg-slate-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        onClick={sendMail}
      >
        {loading ? "Sending" : "Send"}
      </button>
      {message && (
        <p className="mt-2 text-red-500">
          Check your Email to reset your Password.
        </p>
      )}
    </div>
  );
}
