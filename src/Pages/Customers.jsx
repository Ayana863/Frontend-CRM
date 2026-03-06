import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Row, Col, Card } from "react-bootstrap";
import API from "../services/API";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Customers() {

    const navigate = useNavigate()

    const [customers, setCustomers] = useState([])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [company, setCompany] = useState("")

    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")

    const [editId, setEditId] = useState(null)

    const getCustomers = async () => {
        const res = await API.get("/api/customers")
        setCustomers(res.data)
    }

    useEffect(() => {
        getCustomers()
    }, [])

    // handle submit
    const handleSubmit = async (e) => {

        e.preventDefault()

        // check empty fields
        if (!name || !email || !phone || !company) {
            toast.warning("Complete all fields")
            return
        }

        // email validation
        if (!email.includes("@")) {
            setEmailError("Email is not correct. eg: example@gmail.com")
            return
        }
        // phone validation
        if (!/^[0-9]{10}$/.test(phone)) {
            setPhoneError("Phone must be 10 digits and numbers only")
            return
        }

        try {

            if (editId) {
                await API.put(`/api/customers/${editId}`, { name, email, phone, company })
                setEditId(null)
                toast.success("Customer Updated")
            } else {
                await API.post("/api/customers", { name, email, phone, company })
                toast.success("Customer Added")
            }

            // clear fields
            setName("")
            setEmail("")
            setPhone("")
            setCompany("")
            setEmailError("")

            getCustomers()

        } catch (err) {
            toast.error("Something went wrong")
        }
    }

    // delete
    const deleteCustomer = async (id) => {
        await API.delete(`/api/customers/${id}`)
        toast.success("Customer Deleted")
        getCustomers()
    }

    // Edit
    const editCustomer = (customer) => {

        setEditId(customer._id)
        setName(customer.name)
        setEmail(customer.email)
        setPhone(customer.phone)
        setCompany(customer.company)
    }

    return (
        <>
            <Container className="mt-5">

                {/* Header */}
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="fw-bold">Customer Management</h2>
                    </Col>

                    <Col className="text-end">
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/dashboard")}
                        >
                            Back to Dashboard
                        </Button>
                    </Col>
                </Row>

                {/* Form Card */}
                <Card className="shadow mb-4">
                    <Card.Body>

                        <h5 className="mb-3">
                            {editId ? "Update Customer" : "Add New Customer"}
                        </h5>

                        <Form onSubmit={handleSubmit}>

                            <Row>

                                <Col md={6} className="mb-3">
                                    <Form.Control
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Control
                                        placeholder="Email"
                                        value={email}
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
                                </Col>

                                <Col md={6} className="mb-3">

                                    <Form.Control
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value)
                                            setPhoneError("")
                                        }}
                                    />

                                    {phoneError && (
                                        <p style={{ color: "red", fontSize: "14px" }}>
                                            {phoneError}
                                        </p>
                                    )}

                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Control
                                        placeholder="Company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </Col>

                            </Row>

                            <Button variant="primary" type="submit">
                                {editId ? "Update Customer" : "Add Customer"}
                            </Button>

                        </Form>

                    </Card.Body>
                </Card>

                {/* Customer Table */}
                <Card className="shadow">
                    <Card.Body>

                        <h5 className="mb-3">Customer List</h5>

                        <div className="table-responsive">

                            <Table striped bordered hover>

                                <thead className="table-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Company</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {customers.map((c) => (

                                        <tr key={c._id}>

                                            <td>{c.name}</td>
                                            <td>{c.email}</td>
                                            <td>{c.phone}</td>
                                            <td>{c.company}</td>

                                            <td>

                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => editCustomer(c)}
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => deleteCustomer(c._id)}
                                                >
                                                    Delete
                                                </Button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </Table>

                        </div>

                    </Card.Body>
                </Card>

            </Container>
            <ToastContainer position="top-right" autoClose={5000} />
        </>

    )
}

export default Customers