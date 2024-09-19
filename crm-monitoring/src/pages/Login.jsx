import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import "../style/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://smart-grouse-gladly.ngrok-free.app/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );
      // Assuming response contains token in data.token
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg); // Display error message from response
      } else {
        setMsg("An error occurred. Please try again."); // General error message
      }
    }
  };

  return (
    <Container fluid className="registration-page">
      <Row className="h-100">
        {/* Left Side */}
        <Col
          md={6}
          className="left-side d-flex flex-column justify-content-center align-items-center"
        >
          <Image
            src="src/assets/Logo.png"
            className="img-fluid mb-3"
            alt="BigSocial"
            style={{ maxWidth: "200px" }}
          />
          <Image
            src="src/assets/loginImg.png"
            className="img-fluid mb-3"
            alt="BigSocial"
            style={{ maxWidth: "400px" }}
          />
          <h2>Welcome to BigSocial</h2>
          <p className="text-center">
            Find meaning in the billions of conversations happening online and
            get reliable insights with BigSocial, the #1 data intelligence
            platform.
          </p>
        </Col>

        {/* Right Side */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="login-form-container">
            <h3>Sign In to BigSocial</h3>
            <Form onSubmit={Auth}>
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
                  placeholder="*********"
                  className="mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="formRememberMe"
                className="mb-3 m-1 d-flex justify-content-between"
              >
                <Form.Check type="checkbox" label="Remember me" />
                <a className="text-decoration-none" href="/forgot-password">
                  Forgot password?
                </a>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-2">
                Sign In
              </Button>
              {msg && (
                <div className="error-message mt-3 text-danger">{msg}</div>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
