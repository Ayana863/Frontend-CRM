import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import API from "../services/API";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        // check empty fields
        if (!email || !password) {
            toast.warning("Complete all fields")
            return
        }

        // email validation
        if (!email.includes("@")) {
            setEmailError("Email is not correct Eg: example@gmail.com")
            return
        }

        // password validation
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters")
            return
        }

        try {

        const res = await API.post("/api/auth/login", { email, password })

            localStorage.setItem("token", res.data.token)

            toast.success("Login Successful")

            navigate("/dashboard")

        } catch (err) {

            toast.error("Invalid email or password")

        }
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center vh-100">

                <Row className="w-100 justify-content-center">

                    <Col md={5}>

                        <Card className="shadow p-4">

                            <Card.Body>

                                <h3 className="text-center mb-4">Login</h3>

                                <Form onSubmit={handleLogin}>

                                    {/* Email */}
                                    <Form.Group className="mb-3">

                                        <Form.Label>Email</Form.Label>

                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                setEmailError("")
                                            }}
                                        />

                                        {emailError && (
                                            <p style={{ color: "red", fontSize: "14px" }}>
                                                {emailError}
                                            </p>
                                        )}

                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="mb-4">

                                        <Form.Label>Password</Form.Label>

                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                setPasswordError("")
                                            }}
                                        />

                                        {passwordError && (
                                            <p style={{ color: "red", fontSize: "14px" }}>
                                                {passwordError}
                                            </p>
                                        )}

                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                    >
                                        Login
                                    </Button>

                                </Form>

                            </Card.Body>

                            <p className="text-center mt-3">
                                Don’t have an account? <Link to="/register">Register</Link>
                            </p>

                        </Card>

                    </Col>

                </Row>

            </Container>

            <ToastContainer position="top-right" autoClose={5000} />
        </>
    )
}

export default Login