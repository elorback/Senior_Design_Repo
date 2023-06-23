import { useState, useContext, useEffect } from "react";
//Styling
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Modal, Row } from "react-bootstrap";
import "./CSS/GroupCreate.css";
//Axios
import axios from "axios";
//React Select
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
//token
import AuthContext from "../../Store/auth-context";

//Tag Select Options
const optionsTags = [
  { value: "concert", label: "Concert" },
  { value: "cosplay", label: "Cosplay" },
  { value: "cooking", label: "Cooking" },
  { value: "gaming", label: "Gaming" },
  { value: "surfing", label: "Surfing" },
];
//Group Type Options
const optionsGroupType = [
  { value: 0, label: "In Person" },
  { value: 1, label: "Online" },
];

const GroupCreate = (props) => {
  //token stuff
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  const [enteredTitle, setTitle] = useState("");
  const [enteredMType, setMType] = useState("");
  const [enteredDate, setDate] = useState("");
  const [enteredDescription, setDescription] = useState("");
  const [enteredTag, setTag] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    //async call to database
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/me", {
          headers: {
            "Content-Type": "application/json",
            token: authCtx.token,
          },
        });
        //store user info in user object
        setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    //Call async function
    if (isLogedIn) fetchUser();
  }, [isLogedIn, authCtx.token]);

  //Entry Handlers
  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const meetingTypeHandler = (event) => {
    setMType(event);
  };
  const dateHandler = (event) => {
    setDate(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const tagHandler = (event) => {
    setTag(event);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (isLogedIn) {
      //Putting data into a object
      const groupData = {
        name: enteredTitle,
        type: parseInt(enteredMType.value),
        time: new Date(enteredDate),
        description: enteredDescription,
        tagsArray: enteredTag.map((e) => e.value.toLowerCase()),
        createdBy: {
          id: userInfo._id,
          username: userInfo.username,
        },
        members: {
          id: userInfo._id,
          username: userInfo.username,
        },
      };

      //Clearing fields
      setTitle("");
      setMType("");
      setDate("");
      setDescription("");
      setTag("");
      axios
        .post("http://localhost:5000/activities/add", groupData)
        .then((res) => console.log(res.data));
    } else {
      setShowErrorModal(true);
    }
  };

  return (
    <Container className="text-dark bg-light pb-4 row justify-content-center pt-4 groupWrapper">
      <h3 className="text-center">Create a new group</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3 formGroupTitle" controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className=""
            type="text"
            placeholder="Title"
            onChange={titleHandler}
            value={enteredTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3 formGroupType" controlId="formGroupType">
          <Form.Label>Meeting Type</Form.Label>
          <Select
            className="text-black"
            placeholder="Select Group Type"
            options={optionsGroupType}
            onChange={meetingTypeHandler}
            value={enteredMType}
          />
        </Form.Group>

        {
          <Form.Group className="mb-3 formGroupTags" controlId="formGroupTags">
            <Form.Label>Tags</Form.Label>
            <CreatableSelect
              className="text-capitalize text-black"
              placeholder="Select or Create Tags"
              //Select multiple tags
              isMulti
              //Search for tags
              isSearchable
              onChange={tagHandler}
              options={optionsTags}
              //Set value of tag
              value={enteredTag}
            />
          </Form.Group>
        }

        <Form.Group className="mb-3 formGroupDate" controlId="formGroupDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="meetingDate"
            onChange={dateHandler}
            value={enteredDate}
          />
        </Form.Group>

        <Form.Group className="mb-3 text-center" controlId="formGroupDescription">
          <Form.Label>Group Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Group Description"
            style={{ Width: "4000px" }}
            onChange={descriptionHandler}
            value={enteredDescription}
          />
        </Form.Group>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
              Submit
          </Button>
        </div>

        
            
      </Form>

      <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        animation={false}
      >
        <Modal.Header>
          <Modal.Title id="group-create-error-modal">
            Group Creation Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please create an account before making a group</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GroupCreate;
