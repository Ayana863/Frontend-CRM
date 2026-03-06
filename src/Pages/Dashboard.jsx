import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate()

    const handleLogout = () => {
        // remove login token from localStorage
        localStorage.removeItem("token")
        // redirect user to login page
        navigate("/login")
    }

    return (

        <Container className="mt-5">

            <Row className="justify-content-center">

                <Col xs={12} md={8} lg={6}>

                    <Card className="shadow-lg border-0 text-center p-4">

                        <Card.Body>

                            <h2 className="mb-3 fw-bold">CRM Dashboard</h2>

                            <p className="text-muted mb-4">
                                Welcome to Customer Management System
                            </p>

                            <div className="d-grid gap-3">

                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => navigate("/customers")}
                                >
                                    Manage Customers
                                </Button>

                                <Button
                                    variant="outline-danger"
                                    size="lg"
                                    // call logout function
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>

                            </div>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    )

}

export default Dashboard