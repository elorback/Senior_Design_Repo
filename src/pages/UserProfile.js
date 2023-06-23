//React Hooks
import { useContext, useState, useEffect } from "react";
//User token
import AuthContext from "../Store/auth-context";
//Styling
import { Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import "./UserProfile.css"
//Database
import axios from "axios";
//components
import TagsBadges from "../Components/groups/groupDetails/TagsBadges";
import { useHistory } from "react-router-dom";
//picture
import defaultPic from "./Media/user-default.png";

const UserProfile = () => {
  //token stuff
  const authCtx = useContext(AuthContext);

  //groups object and setter here
  const [createdGroups, setCreatedGroups] = useState(null);
  const [joinedGroups, setJoinedGroups] =useState(null)
  const [userInfo, setUserInfo] = useState(null);
  
  const history = useHistory();


  //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    let fetchUser = async () => {
      try {
        //get user data
        axios.get("http://localhost:5000/users/me", {
          headers: {
            "Content-Type": "application/json",
            token: authCtx.token,
          },
          //then send user id to find groups created by
        }).then((response) =>{
          setUserInfo(response.data);

          //create object with user info
          let userData = {
            userId: response.data._id,
            userName: response.data.userName,
          };

          axios.post("http://localhost:5000/activities/createdBy",userData)
          .then(response =>{
            setCreatedGroups(response.data);
          }).catch(err=>{console.log(err)})

          axios.post("http://localhost:5000/activities/joinedGroups",userData)
          .then(response =>{
            setJoinedGroups(response.data);
          }).catch(err=>{console.log(err)})


          
        }).catch(err=>{console.log(err)})
      } catch (err) {
        console.log(err);
      }
    };

    
    fetchUser();

  }, [authCtx.token]);

  

  const viewGroupsHandler = param => event => {
    //link to the group page using it's id
    history.push("/groups/"+ param)
  };


  return (
    <Container className="mt-4 bg-light rounded">
      <Row className="gutters-sm pt-4">
        <Col className="md-4 mb-3">
          <Card>
            <Card.Body>
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={defaultPic}
                  alt="Admin"
                  className="rounded"
                  width="150"
                />
                <div className="mt-3">
                  <h4>John Doe</h4>
                  {userInfo && (
                    <p className="text-secondary mb-1">{userInfo.username}</p>
                  )}
                  <p className="text-muted font-size-sm"> </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="md-8 text-dark">
          <Card className="mb-3">
            <Card.Body>
              <Row>
                <Col className="sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </Col>
                {userInfo && (
                  <Col className="sm-9 text-secondary text-capitalize">
                    {userInfo.firstname} {userInfo.lastname}
                  </Col>
                )}
              </Row>
              <hr />
              <Row>
                <Col className="sm-3">
                  <h6 className="mb-0">Email</h6>
                </Col>
                {userInfo && (
                  <Col className="sm-9 text-secondary">{userInfo.email}</Col>
                )}
              </Row>
              <hr />
              <Row>
                <Col className="sm-3">
                  <h6 className="mb-0">Account Created</h6>
                </Col>
                {userInfo && (
                  <Col className="sm-9 text-secondary">
                    {new Date(userInfo.createdAt).toLocaleDateString()}
                  </Col>
                )}
              </Row>
              <hr />
              <Row>
                <Col className="sm-3">
                  <h6 className="mb-0">Interests</h6>
                </Col>
                <Col className="sm-9 text-secondary">
                  {userInfo &&
                    userInfo.interests.map((e, index) => (
                      <TagsBadges key={index} tagName={e} index={index} />
                    ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="gutters-sm">
        <Col className="sm-6 mb-3 text-dark">
          <Card className="h-100">
            <Card.Body className="">
              <h6 className="d-flex align-items-center mb-3">
                <i className="text-info mr-2">Created Groups</i>
              </h6>
              <ListGroup className="">
                {createdGroups && createdGroups.map(element =>(
                  <ListGroupItem key={element._id} className="group-Item">
                    {element.name}
                    <Button className="btn-view" onClick={(e) => viewGroupsHandler(element._id)(e)}>View</Button>
                    
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col className="sm-6 mb-3 text-dark">
          <Card className="h-100">
            <Card.Body>
              <h6 className="d-flex align-items-center mb-3">
                <i className="text-info mr-2">Joined Groups</i>
              </h6>
              <ListGroup>
                {joinedGroups && joinedGroups.map(element =>(
                  <ListGroupItem className="group-Item" key={element._id}>
                    {element.name}
                    <Button className="btn-view" onClick={(e) => viewGroupsHandler(element._id)(e)}>View</Button>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
