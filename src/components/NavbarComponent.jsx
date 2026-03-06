import React from "react"
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom"

function NavbarComponent() {
  const navigate = useNavigate()
  //  get current path
  const location = useLocation() 

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>

        {/* Logo Name */}
        <Navbar.Brand style={{ fontWeight: "bold", fontSize: "22px" }}>
          CRM System
        </Navbar.Brand>

        <div style={{ display: "flex", gap: "10px" }}>
          {/* Show buttons only on the register page */}
          {location.pathname === "/register" && (
            <>
              <Button
                variant="outline-light"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>


            </>
          )}
        </div>

      </Container>
    </Navbar>
  )
}

export default NavbarComponent