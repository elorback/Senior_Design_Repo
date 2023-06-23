import React from "react";
import { Route, Switch } from "react-router-dom";
//Pages and Sidebar
import GroupCreate from "../Components/groups/GroupCreate";
import GroupList from "../Components/groups/GroupList";
import GroupDetails from "./GroupDetails";
import GroupSideBar from "../Components/groups/GroupSideBar";
//Styling
import "./Groups.css";
import { Container } from "react-bootstrap";
import TagList from "./TagList";
import TagDetails from "./TagDetails";

const Groups = () => {
  return (
    <Container  className="wrapper bg-dark text-white fluid">
      <GroupSideBar></GroupSideBar>


      <Container className="innerModules">
      <Switch>
      

      <Route path="/groups/create">
        <GroupCreate />
      </Route>

      <Route path="/groups/tags/:tagName" >
        <TagDetails />
      </Route>
      
      <Route path="/groups/tags" >
        <TagList />
      </Route>

      

      <Route path="/groups/list">
        <GroupList />
      </Route>

      <Route path="/groups/:groupID" >
        <GroupDetails />
      </Route>

      
      </Switch>

      </Container>
      
    </Container
>
  );
};

export default Groups;
