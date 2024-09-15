import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./components/Registration";
import Navbar from "./components/Navbar"; // Impor Navbar
import Dashboard from "./components/Dashboard"; // Impor Dashboard

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar /> {/* Navbar */}
              <Dashboard /> {/* Dashboard */}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
