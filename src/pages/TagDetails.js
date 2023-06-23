//https://stackoverflow.com/questions/60024761/5-responsive-cards-per-row-with-bootstrap-4
//
import { useState, useEffect } from "react";
//
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
//
//import AuthContext from "../Store/auth-context";
import axios from "axios";
import { useParams } from "react-router-dom";
//pic
import defaultPic from "./Media/group-defualt.jpg";
//
import { useHistory } from "react-router-dom";
import Button from "@restart/ui/esm/Button";

const TagDetails = () => {
  //Use states
  const [tags, setTags] = useState(null);
  //const [userInfo, setUserInfo] = useState([]);

  //token stuff
  //const authCtx = useContext(AuthContext);
  //const isLogedIn = authCtx.isLoggedIn;

  //get the id from the url using params
  const params = useParams();

  //Used to link to group page
  const history = useHistory();

  //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    const fetchTags = async () => {
      try {
        let response = await axios(
          `http://localhost:5000/tags/${params.tagName}`
        );
        //store groups in groups object
        setTags(response.data);
        //setLoading(true);
      } catch (err) {
        console.log(err);
        //setLoading(false);
      }
    };

    // let fetchUser = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/users/me", {
    //       headers: {
    //         "Content-Type": "application/json",
    //         token: authCtx.token,
    //       },
    //     });
    //     //store user info in user object
    //     setUserInfo(response.data);
    //     setLoading(true);
    //   } catch (err) {
    //     console.log(err);
    //     setLoading(false);
    //   }
    // };

    fetchTags();

    //setLoading(false);
  }, [params.tagName]);

  const viewGroupsHandler = param => event => {
    //link to the group page using it's id
    history.push("/groups/"+ param)
  };

  return (
    <Container>
      <h2 className="text-light text-center text-capitalize">
        {params.tagName}
      </h2>
      <Container className="text-dark">
        <Row className="row-cols-md-2 row-cols-lg-3">
          {tags && tags[0].groups.map((element,num) =>
            
              
              (
            <Col className="mt-4" key={element._id}>
            <Card border="primary" key={element.groupId}>
              <Card.Img variant="top" src={defaultPic} />
              <Card.Header className="text-center">{element.groupName}</Card.Header>
              <Card.Body>
                <div><strong>Group Type</strong>: {parseInt(element.groupType)? "In Person":"Online"}</div>
                <div><strong>Group Date</strong>:
                    
                    { new Date(parseInt(element.groupTime)).toLocaleDateString()}
                   
                   </div>
                <div><strong>Group Memebers</strong>:{(
                    <Badge bg="info" key={num}>{element.groupMembers.length}</Badge>
                  )}</div>
              </Card.Body>
              <Button className="bg-primary text-light" onClick={(e) => viewGroupsHandler(element.groupId)(e)}>View Group</Button>
            </Card>
          </Col>
          ))}
          
        </Row>
      </Container>
    </Container>
  );
};

export default TagDetails;
