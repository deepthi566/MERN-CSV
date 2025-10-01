import React, { useEffect, useState } from "react";
import API from "../api.js";

export default function AgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await API.get("/agents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgents(res.data);
      } catch (err) {
        console.error("Error fetching agents:", err.response || err);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Agents</h2>

        {agents.length === 0 ? (
          <p className="text-gray-500">No agents found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <p className="text-sm text-gray-600">{agent.email}</p>
                <p className="text-sm text-gray-600">{agent.mobile}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
