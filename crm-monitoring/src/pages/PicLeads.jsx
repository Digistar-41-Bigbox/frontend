import React, { useState } from "react";
import {
  Layout,
  Table,
  Button,
  Tag,
  Space,
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
} from "@ant-design/icons";
import "../style/PicLeads.css";
import SidebarMenu from "../components/SidebarMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pagination } from "react-bootstrap";

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
  const [isManualInput, setIsManualInput] = useState(true);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const showAddModal = () => {
    setIsModalVisible(true);
    form.resetFields();
    setEditingKey("");
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
        } else {
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
  };

  const deleteLead = (key) => {
    setLeadsData(leadsData.filter((item) => item.key !== key));
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
        <Form form={form} layout="vertical">
          <Form.Item
            name="pic"
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
        </Form>
      </Modal>
    </Layout>
  );
};

export default PicLeads;
