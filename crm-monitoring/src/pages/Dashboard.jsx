import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Named import
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SidebarMenu from "../components/SidebarMenu";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        "https://smart-grouse-gladly.ngrok-free.app/api/v1/auth/token"
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
          className="site-layout-background"
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
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* Main dashboard content */}
          <h2>Dashboard Overview</h2>
          {/* Other content such as charts or tables */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
