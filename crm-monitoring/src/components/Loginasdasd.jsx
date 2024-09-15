import React from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import "./Registration.css";

function Registration() {
  return (
    <Container fluid className="registration-page">
      <Row className="h-100">
        {/* Bagian kiri */}
        <Col
          md={6}
          className="left-side d-flex flex-column justify-content-center align-items-center"
        >
          <Image
            src="/path/to/your/image.png" // Sesuaikan dengan path gambar Anda
            className="img-fluid mb-3"
            alt="BigSocial"
            style={{ maxWidth: "300px" }} // Atur ukuran gambar
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
            <h3>Sign In to BigSocial</h3>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="admin@gmail.com"
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formRememberMe" className="mb-3">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>

              <div className="d-flex justify-content-between mt-3">
                <a href="/forgot-password">Forgot password?</a>
                <a href="/register">Register</a>
              </div>

              <div className="recaptcha mt-4">
                <Form.Check type="checkbox" label="I'm not a robot" />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
