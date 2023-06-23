/* from simple sidebar -  https://github.com/StartBootstrap/startbootstrap-simple-sidebar 
    and https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap
*/
import React from "react";
import {Container, Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import '../pages/Groups.css'

const Side = props => {
   

    return (
        <>
    
            <Nav className="col-md-12 d-none d-md-block sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Container>
            <Nav.Item>
                <Nav.Link href="link-1">Create Group</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Find Group</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
            </Container>
            </Nav>
          
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar