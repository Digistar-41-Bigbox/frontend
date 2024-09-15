import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import "../style/Registration.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Registration = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      setMsg("Password dan konfirmasi password tidak cocok.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg); // Tampilkan pesan kesalahan
      } else {
        setMsg("Terjadi kesalahan. Silakan coba lagi."); // Pesan kesalahan umum
      }
    }
  };

  return (
    <Container fluid className="registration-page">
      <Row className="h-100">
        {/* Bagian kiri */}
        <Col
          md={6}
          className="left-side d-flex flex-column justify-content-center align-items-center"
        >
          <Image
            src="src/assets/Logo.png" // Sesuaikan dengan path gambar Anda
            className="img-fluid mb-3"
            alt="BigSocial"
            style={{ maxWidth: "200px" }} // Atur ukuran gambar
          />
          <Image
            src="src/assets/loginImg.png" // Sesuaikan dengan path gambar Anda
            className="img-fluid mb-3"
            alt="BigSocial"
            style={{ maxWidth: "400px" }} // Atur ukuran gambar
          />
          <h2>Welcome to BigSocial</h2>
          <p className="text-center">
            Find meaning in the billions of conversations happening online and
            get reliable insights with BigSocial, the #1 data intelligence
            platform.
          </p>
        </Col>

        {/* Bagian kanan */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="login-form-container">
            <h3>Register to BigSocial</h3>
            <Form onSubmit={Registration}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="admin@gmail.com"
                  className="mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="*******"
                  className="mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formConfPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confPassword"
                  placeholder="*******"
                  className="mb-3"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
              <div className="d-flex justify-content-between mt-3">
                <a href="/forgot-password">Forgot password?</a>
                <a href="/Login">Login</a>
              </div>
              {msg && (
                <div className="error-message mt-3 text-danger">{msg}</div>
              )}{" "}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
