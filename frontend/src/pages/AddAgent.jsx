import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.js"; // your axios instance

export default function AddAgent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // JWT token from login

      await API.post(
        "/agents",
        { name, email, mobile, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("Agent created successfully!");
      // optionally redirect to agent list page
      navigate("/agents");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error creating agent");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile</label>
            <input
              className="w-full p-2 border rounded"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="+91xxxxxxxxxx"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {msg && <p className="text-sm text-red-500">{msg}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
}
