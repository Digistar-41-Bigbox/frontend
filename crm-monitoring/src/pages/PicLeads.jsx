import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Space,
  Select,
  Modal,
  Form,
  Input,
  Row,
  Col,
  message,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "../style/PicLeads.css";
import { useAuth } from "../context/AuthContext";
import SidebarMenu from "../components/SidebarMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

const PicLeads = ({ name }) => {
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [isManualInput, setIsManualInput] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { userInfo = { name: "" } } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLeadsData();
  }, [searchQuery]);

  const fetchLeadsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/pic/get-all`, {
        params: { search: searchQuery }
      });
      if (response.data.status === 201) {
        const formattedData = response.data.data.map((item) => ({
          key: item.id_users,
          name: item.name,
          email: item.email,
          no_hp: item.no_hp,
          cool: parseInt(item.cold),
          warm: parseInt(item.warm),
          hot: parseInt(item.hot),
          total: parseInt(item.total_status),
        }));
        setLeadsData(formattedData);
      } else {
        message.error("Failed to fetch data");
      }
    } catch (error) {
      setLeadsData([]);
      console.error("Error fetching data:", error);
      // message.error("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const showAddModal = () => {
    setIsModalVisible(true);
    form.resetFields();
    form.setFieldsValue({ inputMethod: "Manual" });
    setEditingKey("");
    setIsManualInput(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingKey) {
        // Update data
        await updateLead(editingKey, values);
      } else {
        // Add new lead
        await addLead(values);
      }
      setIsModalVisible(false);
      fetchLeadsData(); // Refresh the data
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  const addLead = async (values) => {
    try {
      const response = await axios.post("/api/v1/pic/create", values);
      if (response.data.status === 201) {
        message.success("Lead added successfully");
      } else {
        message.error("Failed to add lead");
      }
    } catch (error) {
      console.error("Error adding lead:", error);
      message.error("An error occurred while adding the lead");
    }
  };

  const updateLead = async (id, values) => {
    try {
      console.log(values);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/pic/edit/${id}`, values);
      if (response.data.status === 200) {
        message.success("Lead updated successfully");
      } else {
        message.error("Failed to update lead");
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      message.error("An error occurred while updating the lead");
    }
  };

  const editLead = (record) => {
    setIsModalVisible(true);
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsManualInput(true);
  };

  const deleteLead = (key) => {
    confirm({
      title: "Hapus Data Leads ini?",
      content: "Data yang telah terhapus tidak dapat dipulihkan.",
      okText: "Ya",
      okType: "danger",
      cancelText: "Tidak",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      okButtonProps: {
        style: {
          backgroundColor: "#F54A45",
          color: "#FFFFFF",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#FDDBDA",
          color: "#F54A45",
        },
      },
      onOk: async () => {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/pic/delete/${key}`);
          if (response.data.status === 200) {
            message.success("Lead deleted successfully");
            fetchLeadsData(); // Refresh the data
          } else {
            message.error("Failed to delete lead");
          }
        } catch (error) {
          console.error("Error deleting lead:", error);
          message.error("An error occurred while deleting the lead");
        }
      },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const totalPages = Math.ceil(leadsData.length / itemsPerPage);
  const currentData = leadsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      title: "Nama PIC Leads",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nomor Telepon",
      dataIndex: "no_hp",
      key: "no_hp",
    },
    {
      title: "Cool",
      dataIndex: "cool",
      key: "cool",
    },
    {
      title: "Warm",
      dataIndex: "warm",
      key: "warm",
    },
    {
      title: "Hot",
      dataIndex: "hot",
      key: "hot",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => editLead(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteLead(record.key)}
          />
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `Selected Row Keys: ${selectedRowKeys}`,
        "Selected Rows: ",
        selectedRows
      );
    },
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#fff" }}
      >
        <SidebarMenu collapsed={collapsed} name={name} />
      </Sider>

      <Layout className="site-layout">
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
              <h1 className="h4 fw-semibold mb-0">
                Welcome back, {userInfo?.name || "John Doe"}!
              </h1>
            </div>
          </div>
        </Header>

        <Content
          className={`site-layout-background ${
            collapsed ? "content-collapsed" : "content-expanded"
          }`}
          style={{
            padding: 0,
            minHeight: 280,
          }}
        >
          <div className="site-layout-background" style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
            <Table
              loading={loading}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={currentData}
              pagination={false}
              style={{ marginTop: 10 }}
              className="custom-table"
              rowKey="key"
              title={() => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Input.Search 
                    placeholder="Cari" 
                    className="me-3" 
                    onSearch={handleSearch}
                    style={{ marginTop: 0 }}
                  />
                  <Space>
                    <Button icon={<DownloadOutlined />}>Export Data</Button>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={showAddModal}
                    >
                      Tambah
                    </Button>
                  </Space>
                </div>
              )}
            />

            <Row className="mt-4" justify="space-between" align="middle">
              <Col>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          index + 1 === currentPage ? "active" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </Col>

              <Col>
                <div>
                  Displaying {itemsPerPage * (currentPage - 1) + 1} -{" "}
                  {Math.min(itemsPerPage * currentPage, leadsData.length)} of{" "}
                  {leadsData.length} records
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            className="custom-btn-cancel"
            style={{ backgroundColor: "#F0F5FF", color: "#0549CF" }}
          >
            Tidak
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={handleOk}
            className="custom-btn-ok"
            style={{ backgroundColor: "#0549CF" }}
            disabled={!isManualInput}
          >
            {editingKey ? "Simpan" : "Tambah"}
          </Button>,
        ]}
      >
        <div className="container ">
          <div className="row align-items-center">
            <div className="col-12">
              <div
                className={`d-flex justify-content-center align-items-center rounded-circle`}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: editingKey ? "#F0F5FF" : "#F0F5FF",
                }}
              >
                {editingKey ? (
                  <EditOutlined
                    style={{ fontSize: "26px", color: "#0549CF" }}
                  />
                ) : (
                  <UserAddOutlined
                    style={{ fontSize: "26px", color: "#0549CF" }}
                  />
                )}
              </div>
            </div>
            <div className="col-12 mt-3">
              <h5>{editingKey ? "Edit Lead" : "Tambah Data Lead"}</h5>
              <p style={{ fontSize: "16px" }}>
                {editingKey
                  ? "Lengkapi informasi di bawah untuk mengubah lead."
                  : "Lengkapi informasi di bawah untuk menambahkan lead."}
              </p>
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="name"
              label="Nama PIC Leads"
              rules={[{ required: true, message: "Please input PIC Leads!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input Email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nomor Telepon"
              name="no_hp"
              rules={[{ required: true, message: "Masukkan nomor telepon" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </Layout>
  );
};

export default PicLeads;