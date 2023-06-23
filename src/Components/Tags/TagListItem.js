//react hooks
import { useContext } from "react";
// styles
import "./CSS/TagListItem.css";
import { Badge, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
//used to link to different page
import { useHistory } from "react-router-dom";
//used to push data to the database
import axios from "axios";
//user token
import AuthContext from "../../Store/auth-context";

const TagListItem = (props) => {
    //
    const history = useHistory();

    //token stuff
    const authCtx = useContext(AuthContext);
    const isLogedIn = authCtx.isLoggedIn;

    const viewGroupsHandler = () =>{
        history.push(`/groups/tags/${props.tagName}`)
    }

    const followGroupHandler = ()=>{

      const tagData ={
        incomingTag:props.tagName,
        userId: props.userInfo._id,
        userName: props.userInfo.username
      }
      console.log("test")
      console.log(tagData)

      try {//http://localhost:5000/tags/followTag
        axios
          .post(
            "http://localhost:5000/tags/followTag",
            tagData
          )
          .then((res) => console.log(res));
      } catch (err) {
        console.log(err);
      }

      //Update the page data again
      props.onDataChanged(true);
    }

    //Check if user is following
    const userFollowing = props.users.some( e => e.userId === props.userInfo._id);


  return (
    <Container
      className="pb-2 pt-2 no-underline text-capitalize tagListItem"
      key={props.id}
    >
      <ListGroup>
        <ListGroup.Item className="bg-primary">
          <h6 className="text-light text-center">Tag Name: {props.tagName}</h6>
          <div className="text-light">
            <Row>
              <Col sm={8}>
                <Badge className="bg-warning text-dark">
                  Groups: {props.groups.length}
                </Badge>
              </Col>
              <Col sm={4}>
                <Button className="bg-secondary" onClick={viewGroupsHandler}>View Groups</Button>{" "}
                {isLogedIn && !userFollowing &&(<Button className="bg-secondary" onClick={followGroupHandler}>Follow</Button>)}
              </Col>
            </Row>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default TagListItem;
