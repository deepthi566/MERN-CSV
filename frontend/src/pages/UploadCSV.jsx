import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.js";

export default function UploadCSV({ onUpload }) {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMsg("Select a file first");

    const allowed = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowed.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i))
      return setMsg("Invalid file type");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await API.post("/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (p) =>
          setProgress(Math.round((p.loaded * 100) / p.total)),
      });

      setMsg("Uploaded and distributed successfully!");
      if (onUpload) onUpload(); // refresh dashboard
      navigate("/"); // redirect
    } catch (err) {
      console.error(err.response?.data);
      setMsg(err.response?.data?.msg || "Upload failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload CSV/XLSX</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            className="w-full p-2 border rounded"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {progress > 0 && progress < 100 && (
            <p className="text-sm text-blue-500">Uploading: {progress}%</p>
          )}
          {msg && <p className="text-sm text-red-500">{msg}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
