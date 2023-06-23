//active item code taken from this link
//https://stackoverflow.com/questions/62721457/react-bootstrap-change-link-of-navbar-to-active

import React, { Fragment, useState } from "react";
import { ListGroup, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './CSS/GroupSideBar.css';

const GroupSideBar = () => {

  const [activeItem, setActiveItem] = useState('default')
  return (
    <Fragment>
      <Nav id="sidebar" onSelect={(key)=>setActiveItem(key)} activeKey={activeItem}>

        <ListGroup id="navList" variant="flush">

          <ListGroup.Item eventKey="default">
            <Nav.Link as={Link} to="/groups/create" className= "link-dark">
              Create Group
            </Nav.Link>
          </ListGroup.Item>

          <ListGroup.Item eventKey="gList">
            <Nav.Link as={Link} to="/groups/list" className= "link-dark">
              Group List
            </Nav.Link>
          </ListGroup.Item>

          <ListGroup.Item eventKey="tList">
            <Nav.Link as={Link} to="/groups/tags" className= "link-dark">
              Tags
            </Nav.Link>
          </ListGroup.Item>

        </ListGroup>

      </Nav>

    </Fragment>
  );
};

export default GroupSideBar;
