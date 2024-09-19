import React, { useState } from "react";
import {
  Layout,
  Table,
  Button,
  Tag,
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
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "../style/DataLeads.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import SidebarMenu from "../components/SidebarMenu"; // Panggil Sidebar seperti di dashboard.jsx
import { Pagination } from "react-bootstrap";

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

const DataLeads = ({ name }) => {
  const [leadsData, setLeadsData] = useState([
    {
      key: "1",
      pic: "Shinta Dewi",
      leadsStatus: "Cool",
      company: "Perusahaan 1",
      email: "perusahaan@gmail.com",
      phone: "08123456789",
    },
    {
      key: "2",
      pic: "Agunawan",
      leadsStatus: "Warm",
      company: "Perusahaan 2",
      email: "perusahaan2@gmail.com",
      phone: "08123456790",
    },
  ]);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [isManualInput, setIsManualInput] = useState(true); // Default to manual input
  const [selectedFile, setSelectedFile] = useState(null); // State untuk menyimpan file yang diunggah
  const [setIsUploading] = useState(false); // State untuk melacak status upload
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const showAddModal = () => {
    setIsModalVisible(true);
    form.resetFields();
    form.setFieldsValue({ inputMethod: "Manual" }); // Set default value for input method
    setEditingKey("");
    setIsManualInput(true); // Ensure manual input is selected by default
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
    setIsManualInput(true); // Ensure manual input is selected by default when editing
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
      title: "PIC Leads",
      dataIndex: "pic",
      key: "pic",
    },
    {
      title: "Leads",
      dataIndex: "leadsStatus",
      key: "leadsStatus",
      render: (status) => (
        <Tag
          color={
            status === "Hot" ? "red" : status === "Warm" ? "orange" : "blue"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Nama Instansi/Lembaga",
      dataIndex: "company",
      key: "company",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => editLead(record)}
          ></Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteLead(record.key)}
          ></Button>
        </Space>
      ),
    },
  ];

  // Fungsi untuk menangani perubahan file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsUploading(file ? true : false); // Enable upload mode if a file is selected
  };

  // Fungsi untuk menangani pengunggahan file
  const handleUpload = () => {
    if (selectedFile) {
      confirm({
        title: "Konfirmasi Unggah File",
        content: `Apakah Anda yakin ingin mengunggah file "${selectedFile.name}"?`,
        okText: "Ya",
        cancelText: "Tidak",
        onOk: () => {
          // Tambahkan logika pengunggahan file ke server di sini
          console.log("Uploading:", selectedFile.name);
          setSelectedFile(null); // Clear the selected file
          setIsUploading(false); // Disable upload mode
          setIsModalVisible(false); // Hide the modal
        },
      });
    } else {
      console.log("No file selected");
    }
  };

  // Row selection for checkbox
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
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={currentData}
            pagination={false}
            rowKey="key"
            style={{ marginTop: 0 }}
            className="custom-table"
            title={() => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input.Search placeholder="Cari" className="me-3 " />
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
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                    style={
                      index + 1 === currentPage
                        ? { backgroundColor: "#0549CF", color: "#fff" }
                        : {}
                    }
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
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
            disabled={!isManualInput} // Disable button if input method is XLS
          >
            {editingKey ? "Simpan" : "Tambah"}
          </Button>,
        ]}
      >
        <div className="container">
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
            <Form.Item label="Input Data">
              <Select
                value={isManualInput ? "Manual" : "XLS"}
                onChange={(value) => setIsManualInput(value === "Manual")}
              >
                <Select.Option value="Manual">Manual</Select.Option>
                <Select.Option value="XLS">XLS</Select.Option>
              </Select>
            </Form.Item>

            {isManualInput ? (
              <>
                <Form.Item
                  label="PIC Leads"
                  name="pic"
                  rules={[{ required: true, message: "Masukkan nama PIC" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Leads Status"
                  name="leadsStatus"
                  rules={[{ required: true, message: "Pilih status leads" }]}
                >
                  <Select>
                    <Select.Option value="Hot">Hot</Select.Option>
                    <Select.Option value="Warm">Warm</Select.Option>
                    <Select.Option value="Cool">Cool</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Nama Instansi/Lembaga"
                  name="company"
                  rules={[
                    { required: true, message: "Masukkan nama perusahaan" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Masukkan alamat email" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Nomor Telepon"
                  name="phone"
                  rules={[
                    { required: true, message: "Masukkan nomor telepon" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{
                  border: "2px dashed #d9d9d9",
                  padding: "20px",
                  height: "200px", // Atur tinggi agar konten berada di tengah
                  textAlign: "center",
                }}
              >
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  onChange={handleFileChange}
                  className="mb-3"
                />
                <Button type="primary" onClick={handleUpload}>
                  Unggah Dokumen
                </Button>
                {selectedFile && (
                  <div className="mt-3">
                    <p>File dipilih: {selectedFile.name}</p>
                  </div>
                )}
              </div>
            )}
          </Form>
        </div>
      </Modal>
    </Layout>
  );
};

export default DataLeads;
