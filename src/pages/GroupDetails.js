import { useParams } from "react-router";
import axios from "axios";
//User token stuff
import { useContext } from "react";
import AuthContext from "../Store/auth-context";
//react imports
import { useState, useEffect, useCallback } from "react";
//Styling
import { Col, Row, Image, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//pic
import defaultPic from "./Media/group-defualt.jpg";
//Components
import GroupCommentPost from "../Components/groups/groupDetails/GroupCommentPost";
import GroupCommentList from "../Components/groups/groupDetails/GroupCommentList";
import GroupInfo from "../Components/groups/groupDetails/GroupInfo";
import GroupMembers from "../Components/groups/groupDetails/GroupMembers";

const GroupDetails = (props) => {
  //token stuff
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  //get the id from the url using params
  const params = useParams();

  //groups object and setter here
  const [groups, setGroups] = useState([]);

  //use useState to store if the data is still being fetched from the server
  const [doneLoading, setLoading] = useState(false);

  //Use useState to store user info from server
  const [userInfo, setUserInfo] = useState([]);

  //Use useState to store when data is changed
  const [dataChanged, setDataChanged] = useState(false);


  const [userComments, setComments] = useState([]);

  //Load group and user data from the database
  const loadData = useCallback(async () => {
    //async call to database
    const fetchGroups = async () => {
      try {
        let response = await axios(
          `http://localhost:5000/activities/${params.groupID}`
        );
        //store groups in groups object
        setGroups(response.data);
        setLoading(true);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    let fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/me", {
          headers: {
            "Content-Type": "application/json",
            token: authCtx.token,
          },
        });
        //store user info in user object
        setUserInfo(response.data);
        setLoading(true);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    let fetchComments = async ()=>{
      try{
        let response = await axios(
          `http://localhost:5000/comments/get/${params.groupID}`
        );
        //store comments in comments object
        setComments(response.data);
        setLoading(true);
      }catch (err){
        console.log(err);
        setLoading(false);
      }
    };
    //Call async function
    fetchGroups();
    
    if (isLogedIn) fetchUser();

    fetchComments();

    //set loading to false
    //setLoading(true)
  }, [params, authCtx.token, isLogedIn ]);//dataChanged

  //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    loadData();
    setDataChanged(false);
  }, [loadData, dataChanged]);

  //if data is not loaded will retrun a blank page saying loading
  // if (isLoading === true) {
  //   return <Container>Data is Loading</Container>;
  // }


  return (
    <>
      <Container className="text-light bg-secondary pb-4">
        <Row className="pt-4">
          <Col>
            <Image
              style={{ maxHeight: "300px", maxWidth: "500px" }}
              src={defaultPic}
              rounded
            />
          </Col>
          <Col>
            {doneLoading && <GroupInfo
              groups={groups}
              userInfo={userInfo}
              onDataChanged={setDataChanged}
            />}
          </Col>
        </Row>
        <Row>
          <Container fluid className="pt-4">
            

            <GroupMembers 
            groups={groups} 
            onDataChanged={setDataChanged}
            />

            {doneLoading && <GroupCommentPost
              groupInfo={groups}
              userInfo={userInfo}
              userComments={userComments}
              onDataChanged={setDataChanged}
            />}
            <GroupCommentList
              userInfo = {userInfo}
              userComments = {userComments}
              onDataChanged={setDataChanged}
            /> 
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default GroupDetails;
