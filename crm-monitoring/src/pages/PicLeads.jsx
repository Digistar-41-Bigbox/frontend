import React, { useState } from "react";
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

const { Header, Sider, Content } = Layout;

const PicLeads = ({ name }) => {
  const [leadsData, setLeadsData] = useState([
    {
      key: "1",
      pic: "Shinta Dewi",
      email: "Perusahaan@gmail.com",
      phone: "08123456789",
      cool: 7,
      warm: 10,
      hot: 9,
      total: 26,
    },
    {
      key: "2",
      pic: "Agunawan",
      email: "Perusahaan@gmail.com",
      phone: "08123456789",
      cool: 7,
      warm: 10,
      hot: 9,
      total: 26,
    },
  ]);

  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [isManualInput, setIsManualInput] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { userInfo = { name: "" } } = useAuth();

  const picMembers = [
    { value: "Shinta Dewi", label: "Shinta Dewi" },
    { value: "Agunawan", label: "Agunawan" },
    { value: "Rina Sari", label: "Rina Sari" },
    // Add more members as needed
  ];

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

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingKey) {
          // Update data
          const updatedData = leadsData.map((lead) =>
            lead.key === editingKey ? { ...lead, ...values } : lead
          );
          setLeadsData(updatedData);
        } else if (isManualInput) {
          // Add new lead
          const newKey = (leadsData.length + 1).toString();
          setLeadsData([...leadsData, { ...values, key: newKey }]);
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
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
      onOk: () => {
        setLeadsData(leadsData.filter((item) => item.key !== key));
      },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(leadsData.length / itemsPerPage);
  const currentData = leadsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      title: "Nama PIC Leads",
      dataIndex: "pic",
      key: "pic",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nomor Telepon",
      dataIndex: "phone",
      key: "phone",
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
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#fff" }}
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
          <div className="container-fluid m-0 p-0">
            <Table
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
                  <Input.Search placeholder="Cari" className="me-3" />
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

            {/* Custom Pagination with Total Records */}
            <Row className="mt-4" justify="space-between" align="middle">
              {/* Pagination on the left */}
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

              {/* Show total records on the right */}
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

      {/* Modal for Add/Edit Lead */}
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
              name="pic"
              label="Nama PIC Leads"
              rules={[{ required: true, message: "Please input PIC Leads!" }]}
            >
              <Select placeholder="Pilih PIC Leads">
                {picMembers.map((member) => (
                  <Select.Option key={member.value} value={member.value}>
                    {member.label}
                  </Select.Option>
                ))}
              </Select>
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
              name="phone"
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
