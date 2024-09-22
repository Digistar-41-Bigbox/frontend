import React, { useState, useEffect } from "react";
import axios from "axios";
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
  message,
  Spin,
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
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarMenu from "../components/SidebarMenu";
import { Pagination } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

const DataLeads = ({ name }) => {
  const [leadsData, setLeadsData] = useState([]);
  const [PICData, setPICData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [isManualInput, setIsManualInput] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [isLatest, setIsLatest] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const { userInfo = { name: "" } } = useAuth();

  useEffect(() => {
    fetchLeadsData();
    fetchPICData();
  }, [currentPage, searchTerm, isAscending, isLatest]);

const fetchLeadsData = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`http://127.0.0.1:8080/api/v1/lead/get-all-leads`, {
      params: {
        limit: 1000,
        search: searchTerm,
        asc: isAscending,
        latest: isLatest
      }
    });
    
    if (response.data.status === 201) {
      setLeadsData(response.data.data);
      setTotalRecords(response.data.total || response.data.data.length);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setLeadsData([]); // Clear data if no records found
      setTotalRecords(0);
      message.warning("No data found");
    } else {
      console.error("Error fetching leads data:", error);
      // message.error("Failed to fetch leads data");
    }
  } finally {
    setLoading(false);
  }
};

const fetchPICData = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`http://127.0.0.1:8080/api/v1/pic/get-all-filter`);
    
    if (response.data.status === 201) {
      setPICData(response.data.data);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setLeadsData([]); // Clear data if no records found
      message.warning("No data found");
    } else {
      console.error("Error fetching leads data:", error);
      // message.error("Failed to fetch leads data");
    }
  } finally {
    setLoading(false);
  }
};
  

  const showAddModal = () => {
    setIsModalVisible(true);
    form.resetFields();
    setEditingKey("");
    setIsManualInput(true);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(leadsData.length / itemsPerPage);
  const currentData = leadsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingKey) {
        console.log(values);
        await axios.put(`http://127.0.0.1:8080/api/v1/lead/update/${editingKey}`, values);
        message.success("Lead updated successfully");
      } else {
        await axios.post(`http://127.0.0.1:8080/api/v1/lead/create`, values);
        message.success("Lead added successfully");
      }
      setIsModalVisible(false);
      fetchLeadsData();
    } catch (error) {
      console.error("Error saving lead:", error);
      message.error("Failed to save lead");
    }
  };

  const editLead = (record) => {
    setIsModalVisible(true);
    form.setFieldsValue(record);
    setEditingKey(record.id_leads);
    setIsManualInput(true);
  };

  const deleteLead = (id) => {
    confirm({
      title: "Hapus Data Leads ini?",
      content: "Data yang telah terhapus tidak dapat dipulihkan.",
      okText: "Ya",
      okType: "danger",
      cancelText: "Tidak",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      onOk: async () => {
        try {
          await axios.delete(`http://127.0.0.1:8080/api/v1/lead/delete/${id}`);
          message.success("Lead deleted successfully");
          fetchLeadsData();
        } catch (error) {
          
          console.error("Error deleting lead:", error);
          message.error("Failed to delete lead");
        }
      },
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    // setCurrentPage(1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        await axios.post(`http://127.0.0.1:8080/api/v1/lead/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        message.success("File uploaded successfully");
        setIsModalVisible(false);
        fetchLeadsData();
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error("Failed to upload file");
      } finally {
        setIsUploading(false);
      }
    } else {
      message.warning("Please select a file to upload");
    }
  };

  const columns = [
    {
      title: "PIC Leads",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Leads",
      dataIndex: "name_status",
      key: "name_status",
      render: (status) => (
        <Tag color={status === "Hot" ? "red" : status === "Warm" ? "orange" : "blue"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Nama Instansi/Lembaga",
      dataIndex: "nama_instansi",
      key: "nama_instansi",
    },
    {
      title: "Jenis Perusahaan",
      dataIndex: "category_company",
      key: "category_company",
    },
    {
      title: "Nama Kontak",
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
            onClick={() => deleteLead(record.id_leads)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "#fff" }}>
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
              {/* Nama pengguna */}
              <h1 className="h4 fw-semibold mb-0">
                Welcome back, {userInfo?.name || "John Doe"}!
              </h1>
            </div>
          </div>
        </Header>

        <Content className="site-layout-background" style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
          <Spin spinning={loading}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={currentData}
              pagination={false}
              rowKey="id_leads"
              style={{ marginTop: 0 }}
              className="custom-table"
              title={() => (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Input.Search 
                    placeholder="Cari" 
                    onSearch={handleSearch} 

                    className="me-3"
                  />
                  <Space>
                    <Button icon={<DownloadOutlined />}>Export Data</Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
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
            {/* Show total records */}
            <div>
              Displaying {itemsPerPage * (currentPage - 1) + 1} -{" "}
              {Math.min(itemsPerPage * currentPage, leadsData.length)} of{" "}
              {leadsData.length} records
            </div>
          </Row>
          </Spin>
        </Content>
      </Layout>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} className="custom-btn-cancel" style={{ backgroundColor: "#F0F5FF", color: "#0549CF" }}>
            Tidak
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk} className="custom-btn-ok" style={{ backgroundColor: "#0549CF" }}>
            {editingKey ? "Simpan" : "Tambah"}
          </Button>,
        ]}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="d-flex justify-content-center align-items-center rounded-circle" style={{
                width: "50px",
                height: "50px",
                backgroundColor: editingKey ? "#F0F5FF" : "#F0F5FF",
              }}>
                {editingKey ? (
                  <EditOutlined style={{ fontSize: "26px", color: "#0549CF" }} />
                ) : (
                  <UserAddOutlined style={{ fontSize: "26px", color: "#0549CF" }} />
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
            {/* Conditionally render the input method dropdown */}
            {!editingKey && ( // Only show dropdown when not editing
              <Form.Item label="Input Data">
                <Select
                  value={isManualInput ? "Manual" : "XLS"}
                  onChange={(value) => setIsManualInput(value === "Manual")}
                >
                  <Select.Option value="Manual">Manual</Select.Option>
                  <Select.Option value="XLS">XLS</Select.Option>
                </Select>
              </Form.Item>
            )}

            {isManualInput ? (
              <>
                <Form.Item
                  label="PIC Leads"
                  name="id_users"
                  rules={[{ required: true, message: "Pilih PIC Leads" }]}
                >
                  <Select>
                    {PICData.map(pic => (
                      <Select.Option key={pic.id_users} value={pic.id_users}>
                        {pic.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Leads Status"
                  name="name_status"
                  rules={[{ required: true, message: "Pilih status leads" }]}
                >
                  <Select>
                    <Select.Option value="3">Hot</Select.Option>
                    <Select.Option value="2">Warm</Select.Option>
                    <Select.Option value="1">Cold</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Nama Instansi/Lembaga"
                  name="nama_instansi"
                  rules={[{ required: true, message: "Masukkan nama instansi/lembaga" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Masukkan alamat email", type: "email" }]}
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
              </>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center" style={{
                border: "2px dashed #d9d9d9",
                padding: "20px",
                height: "200px",
                textAlign: "center",
              }}>
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  onChange={handleFileChange}
                  className="mb-3"
                />
                <Button type="primary" onClick={handleUpload} loading={isUploading}>
                  Unggah Dokumen
                </Button>
                {/* {selectedFile && (
                  <div className="mt-3">
                    <p>File dipilih: {selectedFile.name}</p>
                  </div>
                )} */}
              </div>
            )}
          </Form>
        </div>
      </Modal>
    </Layout>
  );
};

export default DataLeads