import React, { useState, useContext } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
//Styling
import "../CSS/GroupCommentPost.css";
//User token info
import AuthContext from "../../../Store/auth-context";

const GroupCommentPost = (props) => {
  const [enteredComment, setComment] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  //user token data to check if a user is logged in
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const submitHandler = (event) => {
    //preventing the page to refresh when submit is pressed
    event.preventDefault();
    if(enteredComment.length <= 0){
      setShowErrorModal(true)
    }
    else
    {
      //create a object with required data
    const newComment = {
      groupID:props.groupInfo._id,
      userId:props.userInfo._id,
      userName:props.userInfo.username,
      message:enteredComment
      
    }

    //try sending comment to the server
    try {//http://localhost:5000/comments/add/:id
      axios.post('http://localhost:5000/comments/add', newComment)
      .then(res=> console.log(res.data));
    } catch (err) {
          console.log(err);
    }
  }
    
    //Clear comment field
    setComment("");

    //reload data now that a comment has been added
    props.onDataChanged(true)
  };

  let displayMsg = "";
  if(props.userComments.comments && props.userComments.comments.length !== 0){
    displayMsg="Comments";
  }
  else{
    displayMsg="No Comments";
  }

  

  return (
    <React.Fragment>
    <Container className="bg-light pt-4 text-dark pb-4">
      <h5>{displayMsg}</h5>
      {isLogedIn &&(<Form onSubmit={submitHandler}>
        <Form.Group className="mb-1" controlId="ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Type your comment here"
            onChange={commentHandler}
            value={enteredComment}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>)}
    </Container>


    {/*Update Modal/Popup window settings start here                 */}
    <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        animation={false}
      >
        <Modal.Header>
          <Modal.Title id="message-error-modal">Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You must enter a valid message
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default GroupCommentPost;
