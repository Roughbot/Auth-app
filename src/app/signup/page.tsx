"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisable, setButtonDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp Error", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-96 p-6 bg-white rounded shadow">
        <h1 className="mb-4 text-xl text-black font-semibold text-center">
          {loading ? "Processing" : "SignUp"}
        </h1>
        <hr />
        <label
          htmlFor="username"
          className="block mb-2 mt-2 text-sm font-medium text-black"
        >
          UserName
        </label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black border bg-slate-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="UserName"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-black"
        >
          Email
        </label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black border bg-slate-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-black"
        >
          Password
        </label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black border bg-slate-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={onSignUp}
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          {buttonDisable ? "No SignUp" : "SignUp"}
        </button>
        <p className="mt-4 text-center text-black">
          Already have an account{" "}
          <Link
            className="text-blue-500 font-bold hover:text-blue-700"
            href="/login"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}
