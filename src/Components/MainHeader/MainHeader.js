import { useContext } from "react";
import AuthContext from "../../Store/auth-context";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Nav, Navbar } from "react-bootstrap";
import "./MainHeader.css";


const MainHeader = () => {

  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  const logoutoutHandler = ()=>{
    authCtx.logout();
  }

  return (
    <header className="headerWrapper">
      <Navbar bg="info" variant="light" sticky="top">
        <Navbar.Brand >Squad Seek</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/welcome">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/groups">
            Groups
          </Nav.Link>
        </Nav>
        <Nav>
          {!isLogedIn && (
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          )}
          {!isLogedIn && (
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
          )}
          {isLogedIn && (
            <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
          )}
          {isLogedIn && (
            <div className="px-2"><Button onClick={logoutoutHandler} >Logout</Button></div>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default MainHeader;
