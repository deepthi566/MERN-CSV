import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api.js";

export default function Dashboard() {
  const [lists, setLists] = useState({});
  const [agents, setAgents] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch distributed lists
  const fetchLists = () => {
    API.get("/upload/distributed", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setLists(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Fetch agents
  useEffect(() => {
    API.get("/agents", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setAgents(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Link
            to="/add-agent"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Agent
          </Link>
          <Link
            to="/upload"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Upload CSV
          </Link>
        </div>

        {/* Agents Section */}
        <h2 className="text-2xl font-semibold mb-4">Agents</h2>
        {agents.length === 0 ? (
          <p className="text-gray-500 mb-6">No agents yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {agents.map((a) => (
              <div
                key={a._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{a.name}</h3>
                <p className="text-sm text-gray-600">{a.email}</p>
                <p className="text-sm text-gray-600">{a.mobile}</p>
              </div>
            ))}
          </div>
        )}

        {/* Distributed Lists Section */}
        <h2 className="text-2xl font-semibold mb-4">Distributed Lists</h2>
        {Object.keys(lists).length === 0 ? (
          <p className="text-gray-500">No distributed lists yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(lists).map((g) => (
              <div
                key={g.agent._id}
                className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">
                  {g.agent.name} ({g.agent.email})
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Items: {g.items.length}
                </p>
                <ul className="list-disc list-inside text-sm">
                  {g.items.map((it) => (
                    <li key={it._id}>
                      {it.firstName} - {it.phone} - {it.notes}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
