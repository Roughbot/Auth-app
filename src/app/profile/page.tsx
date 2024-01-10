"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const [userName, setUserName] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUserName(response.data.data.username);
      } catch (error: any) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("LogOut Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res: any = await axios.get("/api/users/me");
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      {userName && <h1>{userName}&#39;s Page</h1>}
      <h2 className="p-1 rounded bg-purple-600 mt-3">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />

      <button
        onClick={getUserDetails}
        className="bg-green-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Data
      </button>

      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
