import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddAgent from "./pages/AddAgent.jsx";
import AgentList from "./components/AgentList.jsx";
import UploadCSV from "./pages/UploadCSV.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/agents" element={<AgentList />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/upload" element={<UploadCSV />} />
      </Routes>
    </Router>
  );
}

export default App;
