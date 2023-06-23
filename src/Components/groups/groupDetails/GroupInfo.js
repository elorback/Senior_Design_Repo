import { useContext, useState } from "react";
import AuthContext from "../../../Store/auth-context";
import { Button, Modal } from "react-bootstrap";
import React from "react";
//Import other custom components
import GroupUpdate from "../GroupUpdate";
import GroupDelete from "../GroupDelete";
//Database stuff
import axios from "axios";
import TagsBadges from "./TagsBadges";

const GroupInfo = (props) => {
  //User token hook to check if a user is logged in
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  //use useState to store and set if the update/delete group modals is shown
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const joinBtnHandler = (event) => {
    let alreadyJoined = props.groups.members.find((x) => x.id === props.userInfo._id);

    if (!alreadyJoined) {
      console.log("not in group");

      //get user stuff
      let memberInfo = {
        id: props.userInfo._id,
        username: props.userInfo.username,
      };

      props.groups.members.push(memberInfo);

      const groupStuff = {
        members: props.groups.members,
      };

      try {//http://localhost:5000/activities/join/:id
        axios
          .post(
            "http://localhost:5000/activities/join/" + props.groups._id,
            groupStuff
          )
          .then((res) => console.log(res.data));
      } catch (err) {
        console.log(err);
      }

      //Update the page data again
      props.onDataChanged(true);
    }
  };

  //Formatting date into a readable format
  let date = new Date(parseInt(props.groups.time));
  let month = date.toLocaleString("en-US", { month: "long" });
  let day = date.toLocaleString("en-US", { day: "2-digit" });
  let year = date.getFullYear();
  let time = date.toLocaleTimeString("en-US");

  return (
      <React.Fragment>
    {props.groups !== null &&(<section>
      <h2>
        <strong>Group Title:</strong> {props.groups.name}
      </h2>
      {props.groups.createdBy != null && (
        <p>
          <strong>Group Started by:</strong>{" "}
          {props.groups.createdBy[0].username}
        </p>
      )}
      <p>
        <strong>Group Type:</strong>{" "}
        {parseInt(props.groups.type) ? "Online" : "In Person"}{" "}
      </p>
      <p>
        <strong>Date:</strong> {month + " " + day + ", " + year + " @ " + time}
      </p>
      <p>
        <strong>Description:</strong> {props.groups.description}
      </p>
      <p>
        <strong>Tags: </strong>
        {props.groups.tagsArray && props.groups.tagsArray.map((e, index) => (
          
          <TagsBadges
            key = {index}
            tagName = {e}
            index = {index}
          />
        ))}
      </p>
      {props.groups.createdBy && props.groups.createdBy[0].id === props.userInfo._id && (
        <Button onClick={() => setShowUpdateModal(true)} className="pr-2">
          Update
        </Button>
      )}
      {props.groups.createdBy && isLogedIn && props.groups.createdBy[0].id === props.userInfo._id && (
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          Delete
        </Button>
      )}
      {props.groups.createdBy && isLogedIn &&
        props.groups.createdBy[0].id !== props.userInfo._id &&
        !props.groups.members.find(({ id }) => id === props.userInfo._id) && (
          <Button onClick={joinBtnHandler}>Join Group</Button>
        )}
    </section>)}

    {/*Update Modal/Popup window settings start here                 */}
    <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        animation={false}
      >
        <Modal.Header>
          <Modal.Title id="group-update-modal">Update Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupUpdate
            title={props.groups.name}
            type={props.groups.type}
            date={props.groups.time}
            description={props.groups.description}
            tags={props.groups.tagsArray}
            id={props.groups._id}
            createdBy={props.groups.createdBy}
            members={props.groups.members}
            onModalClose={setShowUpdateModal}
            onDataChanged={props.onDataChanged}
          />
        </Modal.Body>
      </Modal>

       {/* Below is the modal to delete a group */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        animation={false}
      >
        <Modal.Header>
          <Modal.Title id="group-delte-modal">Delete Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupDelete
            title={props.groups.name}
            id={props.groups._id}
            onModalClose={setShowDeleteModal}
            //onGroupUpdated={}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default GroupInfo;
