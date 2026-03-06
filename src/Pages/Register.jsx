import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import API from "../services/API";
import { useNavigate, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    // handle register
    const handleRegister = async (e) => {

        e.preventDefault()

        // check empty fields
        if (!name || !email || !password) {
            toast.warning("Complete all fields")
            return
        }

        // email validation
        if (!email.includes("@") || !email.includes(".")) {
            setEmailError("Email is not correct Eg: example@gmail.com")
            return
        }

        // password validation
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters")
            return
        }

        try {

            await API.post("/api/auth/register", { name, email, password })

            toast.success("Registration Successful")

            setName("")
            setEmail("")
            setPassword("")

            setTimeout(() => {
                navigate("/login")
            }, 1500)

        } catch (err) {

            console.log(err.response)

            toast.error(err.response?.data?.message || "Something went wrong")

        }
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center vh-100">

                <Row className="w-100 justify-content-center">

                    <Col md={5}>

                        <Card className="shadow p-4">

                            <Card.Body>

                                <h3 className="text-center mb-4">Create Account</h3>

                                <Form onSubmit={handleRegister}>

                                    {/* Name */}
                                    <Form.Group className="mb-3">

                                        <Form.Label>Name</Form.Label>

                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />

                                    </Form.Group>


                                    {/* Email */}
                                    <Form.Group className="mb-3">

                                        <Form.Label>Email</Form.Label>

                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                setEmailError("")
                                            }}
                                        />

                                        {emailError && (
                                            <p style={{ color: "red", fontSize: "14px" }}>{emailError}</p>
                                        )}

                                    </Form.Group>


                                    {/* Password */}
                                    <Form.Group className="mb-4">

                                        <Form.Label>Password</Form.Label>

                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                setPasswordError("")
                                            }}
                                        />

                                        {passwordError && (
                                            <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>
                                        )}

                                    </Form.Group>


                                    <Button variant="primary" type="submit" className="w-100">
                                        Register
                                    </Button>

                                </Form>


                                <p className="text-center mt-3">
                                    Already have an account? <Link to="/login">Login</Link>
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Container>

            <ToastContainer position="top-right" autoClose={5000} />

        </>
    )

}

export default Register