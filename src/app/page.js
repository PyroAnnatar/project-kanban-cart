"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email === "demo@demo.com" && user.password === "demo") {
      localStorage.setItem(
        "fakeToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJkZW1vQGV4YW1wbGUuY29tIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNzE2MjM5MDIyfQ.dKNofqJzLPEpW0ERQx2RX3TSGm3L6JYLI2QB5m3vQf0"
      );
      router.push("/dashboard");
    } else {
      setError("Need demo login | demo@demo.com - demo ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F6FD]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#145389] mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#145389] text-white py-2 px-4 rounded-md hover:bg-[#0f406c] transition-colors"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
