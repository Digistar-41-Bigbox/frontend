import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import axios from "axios"; // Import axios for API requests
import { useNavigate, useLocation } from "react-router-dom";
import "../style/sidebar.css";

const SidebarMenu = ({ collapsed, name = "User" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle logout API call
  const handleLogout = async () => {
    try {
      // Call the API to log the user out
      await axios.delete(
        "https://smart-grouse-gladly.ngrok-free.app/api/v1/auth/logout"
      );

      // Optionally, you can also clear any stored authentication tokens here
      localStorage.removeItem("accessToken");

      // Navigate to the login page after successful logout
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle errors, show a message if needed
    }
  };

  const menuItems = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "/data-leads",
      icon: <DatabaseOutlined />,
      label: "Data Leads",
      onClick: () => navigate("/data-leads"),
    },
    {
      key: "/pic-leads",
      icon: <UserOutlined />,
      label: "PIC Leads",
      onClick: () => navigate("/pic-leads"),
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout, // Call the logout handler function
    },
  ];

  return (
    <>
      <div className="logo-container">
        {!collapsed ? (
          <img src="src/assets/LogoFull.png" alt="Logo" className="logo-full" />
        ) : (
          <img
            src="src/assets/LogoHalf.png"
            alt="Logo"
            className="logo-collapsed"
          />
        )}
      </div>

      <Menu
        theme="white"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-avatar">
          <span>{name ? name.charAt(0) : ""}</span>
        </div>
        {!collapsed && (
          <>
            <div className="profile-name">{name}</div>
            <div className="profile-email">kinoooy@gmail.com</div>
          </>
        )}
      </div>
    </>
  );
};

export default SidebarMenu;
