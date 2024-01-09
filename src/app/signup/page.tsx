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
      <h1>{loading ? "Processing" : "SignUp"}</h1>
      <hr />
      <label htmlFor="username">UserName</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-double focus:border-gray-300 text-black"
        id="username"
        type="text"
        placeholder="UserName"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-double focus:border-gray-300 text-black"
        id="email"
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-double focus:border-gray-300 text-black"
        id="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisable ? "No SignUp" : "SignUp"}
      </button>
      <p>
        Already have an account{" "}
        <Link
          className="p-3 border-collapse border-cyan-300 focus:border-cyan-300"
          href="/login"
        >
          Login Here
        </Link>
      </p>
    </div>
  );
}
