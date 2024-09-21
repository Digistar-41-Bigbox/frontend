import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminDashboard from "./pages/AdminDashboard"; // Impor Dashboard
import UserDashboard from "./pages/UserDashboard";
import DataLeads from "./pages/DataLeads";
import PicLeads from "./pages/PicLeads";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/data-leads" element={<DataLeads />} />
          <Route path="/pic-leads" element={<PicLeads />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
