import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./components/Registration";
import Navbar from "./components/Navbar"; // Impor Navbar
import Dashboard from "./pages/Dashboard"; // Impor Dashboard
import DataLeads from "./pages/DataLeads";
import PicLeads from "./pages/PicLeads";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/data-leads" element={<DataLeads />} />
        <Route path="/pic-leads" element={<PicLeads />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Dashboard /> {/* Dashboard */}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
