import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Named import
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SidebarMenu from "../components/SidebarMenu";
import PieChartWithCenterLabel from "../components/PieChartWithCenterLabel";
import CustomLineChart from "../components/LineChart";
import { useAuth } from "../context/AuthContext";
import "../style/Dashboard.css";

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const { userRole, userInfo = { name: "" } } = useAuth();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        "https://backend-dev-eosin.vercel.app/api/v1/auth/token"
      );
      console.log("test");
      console.log(response.data.accessToken);
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken); // Using named export
      setName(decoded.name); // Setting the name from decoded JWT
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  console.log(userRole);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#fff",
        }}
      >
        <SidebarMenu collapsed={collapsed} name={name} />
      </Sider>

      {/* Layout */}
      <Layout className="site-layout">
        {/* Header with Toggle Button */}
        <Header className="bg-light sticky-top px-4 shadow-sm">
          <div className="d-flex align-items-center">
            <Button
              type="text"
              className="btn btn-link"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              style={{
                fontSize: "18px",
                width: "64px",
                height: "64px",
              }}
            />

            <div className="ms-3 d-flex flex-column justify-content-center">
              {/* Nama pengguna */}
              <h1 className="h4 fw-semibold mb-0">
                Welcome back, {userInfo?.name || "John Doe"}!
              </h1>
            </div>
          </div>
        </Header>

        {/* Main Content */}
        <Content
          className={`site-layout-background ${
            collapsed ? "content-collapsed" : "content-expanded"
          }`}
          style={{
            padding: 0,
            minHeight: 280,
          }}
        >
          {/* Main dashboard content */}
          <div className="container m-auto">
            <p
              className="text-muted fw-semibold ms-2 mt-4 mb-3"
              style={{ fontSize: "20px" }}
            >
              {userRole === "dmin"
                ? "Dashboard Manager Leads."
                : "Dashboard PIC Leads."}
            </p>
            {/* Main Dashboard Cards */}
            <div className="row mb-4">
              {/* Latest Data Leads */}
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h5>Data Leads Terbaru</h5>
                  </div>
                  <div className="card-body">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td>
                            <span className="badge bg-warning">Warm</span>
                          </td>
                          <td>Perusahaan 1</td>
                          <td>Perusahaan1@gmail.com</td>
                          <td>08123456789</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-info">Cool</span>
                          </td>
                          <td>Perusahaan 1</td>
                          <td>Perusahaan1@gmail.com</td>
                          <td>08123456789</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-warning">Warm</span>
                          </td>
                          <td>Perusahaan 1</td>
                          <td>Perusahaan1@gmail.com</td>
                          <td>08123456789</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-danger">Hot</span>
                          </td>
                          <td>Perusahaan 1</td>
                          <td>Perusahaan1@gmail.com</td>
                          <td>08123456789</td>
                        </tr>
                      </tbody>
                    </table>
                    <a href="#" className="card-link">
                      Lainnya
                    </a>
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h5>Jumlah Leads berdasarkan status</h5>
                  </div>
                  <div className="card-body text-center">
                    <PieChartWithCenterLabel />
                  </div>
                </div>
              </div>
            </div>

            {/* Data Leads Graph */}
            <div className="row">
              <div className="col-12">
                <div className="card shadow-sm">
                  {/* Header Kartu */}
                  <div className="card-header bg-white d-flex justify-content-between">
                    <h5>Data Leads</h5>
                    <div>
                      <select className="form-select d-inline w-auto">
                        <option>Tipe Leads</option>
                      </select>
                      <select className="form-select d-inline w-auto ms-2">
                        <option>Februari</option>
                      </select>
                      <select className="form-select d-inline w-auto ms-2">
                        <option>2024</option>
                      </select>
                    </div>
                  </div>

                  {/* Konten Kartu */}
                  <div className="card-body">
                    {/* Pastikan card-body memiliki ukuran yang memadai */}
                    <div style={{ width: "100%", height: "400px" }}>
                      <CustomLineChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
