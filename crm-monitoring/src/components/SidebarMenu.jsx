import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/sidebar.css";

const SidebarMenu = ({ collapsed, name = "User" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, logout, userInfo = { name: "", email: "" } } = useAuth(); // Get userRole from context

  // Define menu items
  const menuItems = [
    // Dashboard for user and admin
    {
      key: "/admin-dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin-dashboard"),
    },
    {
      key: "/data-leads",
      icon: <DatabaseOutlined />,
      label: "Data Leads",
      onClick: () => navigate("/data-leads"),
    },
    ...(userRole === "admin"
      ? [
          {
            key: "/pic-leads",
            icon: <UserOutlined />,
            label: "PIC Leads",
            onClick: () => navigate("/pic-leads"),
          },
        ]
      : []),
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        logout();
        navigate("/");
      },
    },
  ];
  return (
    <div
      className="d-flex flex-column vh-100 position-fixed"
      style={{
        width: collapsed ? "80px" : "200px",
        transition: "width 0.3s ease",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      {/* Logo Section */}
      <div className="logo-container p-3">
        {!collapsed ? (
          <img
            src="/src/assets/LogoFull.png"
            alt="Logo"
            className="logo-full img-fluid"
          />
        ) : (
          <img
            src="/src/assets/LogoHalf.png"
            alt="Logo"
            className="logo-collapsed "
          />
        )}
      </div>

      {/* Menu Section */}
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />

      {/* Profile Section */}
      <div className="mt-auto p-3">
        <div className="profile-avatar d-flex align-items-center justify-content-center">
          <span>{userInfo?.name ? userInfo.name.charAt(0) : "U"}</span>
        </div>
        {!collapsed && (
          <>
            <div className="profile-name text-center">
              {userInfo?.name || "User"}
            </div>
            <div className="profile-email text-center">
              {" "}
              {userInfo?.email || "user@example.com"}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarMenu;
