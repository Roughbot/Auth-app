"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const resetFunction = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        password: newPassword,
        token: token,
      });
      router.push("/login");
    } catch (error: any) {
      console.log("Password reset Error", error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-96 p-6 bg-white rounded shadow">
          <h1 className="mb-4 text-xl text-black font-semibold text-center">
            Reset Password
          </h1>
          <hr />
          <label
            htmlFor="New Password"
            className="block mb-2 mt-3 text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black border bg-slate-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={newPassword.password}
            onChange={(e) =>
              setNewPassword({ ...newPassword, password: e.target.value })
            }
          />
          <label
            htmlFor="Confirm Password"
            className="block mb-2 text-sm font-medium text-black"
          >
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black border bg-slate-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="re-password"
            type="password"
            placeholder="Password"
            value={newPassword.confirmPassword}
            onChange={(e) =>
              setNewPassword({
                ...newPassword,
                confirmPassword: e.target.value,
              })
            }
          />
          <button
            onClick={resetFunction}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            {loading ? "Reseting" : "Reset"}
          </button>
        </div>
      </div>
    </div>
  );
}
