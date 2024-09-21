import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Named import
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SidebarMenu from "../components/SidebarMenu";
import PieChartWithCenterLabel from "../components/PieChartWithCenterLabel";
import CustomLineChart from "../components/LineChart"; // Import the new LineChart component

const { Header, Sider, Content } = Layout;

const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  axios.defaults.withCredentials = true;

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
        <Header
          className="site-layout-background sticky-top"
          style={{
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{
              fontSize: "18px",
              width: 64,
              height: 64,
            }}
          />
          <span className="welcome-text">Welcome back, {name}!</span>
        </Header>

        {/* Main Content */}
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 0,
            minHeight: 280,
          }}
        >
          {/* Main dashboard content */}
          <div className="container my-4">
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

export default UserDashboard;
