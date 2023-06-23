// export default GroupUpdate;
import { useState, useCallback } from "react";
//Bootstrap Stuff
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
//React Select
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

//Tag Select Options
const optionsTags = [
  {value: 'concert', label: 'Concert'},
  {value: 'cosplay', label: 'Cosplay'},
  {value: 'cooking', label: 'Cooking'},
  {value: 'gaming', label: 'Gaming'},
  {value: 'surfing', label: 'Surfing'}
];

//Group Type Options
const optionsGroupType =[
{value: 0, label: 'In Person'},
{value: 1, label: 'Online'}
];

const GroupUpdate = (props) => {

    //Translate incoming time into a format that datepicker can read
    let d = new Date(parseInt(props.date))
    let datestring = d.getFullYear().toString() + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
    let ts = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0') + ':' + d.getSeconds().toString().padStart(2, '0');

    //Formatting incoming tags into a format React-select can read
    let currentTags = props.tags.map(v => ({
        label: v,
        value: v
      }));

    //Formatting meeting type into a for mat Reac-Select can read
    let mTypes = {
      value: parseInt(props.type), 
      label: parseInt(props.type)?  "Online":"In Person"
    };

    //Creating useState for all the fields in the form
  const [enteredTitle, setTitle] = useState(props.title);
  const [enteredMType, setMType] = useState(mTypes);

  const [enteredDate, setDate] = useState(datestring + "T" +  ts);
  const [enteredDescription, setDescription] = useState(props.description);
  const [enteredTag, setTag] = useState(currentTags);

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
    setTag( event );
  }

  
  const submitHandler = (event) => {
    event.preventDefault();

    //Clearing fields
    setTitle("");
    setMType("");
    setDate("");
    setDescription("");
    setTag("");

    //Put the old tags and new tags in a array
    let oldTags = currentTags.map(e => e.value.toLowerCase());
    let newTags = enteredTag.map(e => e.value.toLowerCase());

    //Putting data into a object
    let groupData = {
      name: enteredTitle,
      type: enteredMType.value,
      time: new Date(enteredDate),
      description: enteredDescription,
      tagsArray: enteredTag.map(e => e.value.toLowerCase()),
      createdBy: props.createdBy,
      members:props.members,
      addedTags: newTags.filter(x => !oldTags.includes(x)),
      removedTags: oldTags.filter(x => !newTags.includes(x))
    };


    try {//http://localhost:5000/activities/update/id_of_the_activity
      axios.post('http://localhost:5000/activities/update/'+props.id, groupData).then(res=> console.log(res.data));
    } catch (err) {
          console.log(err);
    }

      //Send
      //props.onGroupUpdated(groupData)

      //Close Modal
      props.onModalClose(false);
      props.onDataChanged(true);
  };

  const cancelBtnHandler = useCallback( event =>{
    props.onModalClose(false)
  },[props])


  return (
    <div className="bg-primar">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className=""
            type="text"
            placeholder="Title"
            onChange={titleHandler}
            value={enteredTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupType">
          <Form.Label>Meeting Type</Form.Label>
         
          <Select
          placeholder="Select Group Type"
          //defaultValue={0}
          options={optionsGroupType}
          onChange={meetingTypeHandler}
          value={enteredMType}
        />
        </Form.Group>


        { <Form.Group className="mb-3" controlId="formGroupTags">
          <Form.Label>Tags</Form.Label>
          <CreatableSelect
            className="text-capitalize"
            placeholder="Select or Create Tags"
            //Select multiple tags
            isMulti
            //Search for tags
            isSearchable
            onChange={tagHandler}
            options={optionsTags}
            //Set value of tag
            value={enteredTag}
            
            //
          />
        </Form.Group> }

        <Form.Group className="mb-3" controlId="formGroupDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="meetingDate"
            onChange={dateHandler}
            value={enteredDate}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupDescription">
          <Form.Label>Group Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Group Description"
            style={{ Width: "4000px" }}
            onChange={descriptionHandler}
            value={enteredDescription}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="secondary" onClick={cancelBtnHandler}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default GroupUpdate;
