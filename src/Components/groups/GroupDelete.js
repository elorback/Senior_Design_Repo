//react imports
import { useCallback} from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const GroupDelete = (props) => {
  //allows us to link back to old page in histor
  const history = useHistory();

  const cancelBtnHandler = useCallback(
    (event) => {
      props.onModalClose(false);
    },
    [props]
  );

  let groupID = props.id;

  const deleteBtnHandler = (event) => {
      // when used url http://localhost:5000/activities/id_of_the_activity and made a delete request
    // axios.delete("http://localhost:5000/activities/" + props.id)
    // .then(res =>console.log(res));

    //Activity.findByIdAndDelete(req.params.id).then(activity => res.json('Exercise Deleted!')).catch(err => res.status(400).json('Error: ' + err));

    axios.delete(`http://localhost:5000/activities/${groupID}`)
        .then(res =>{console.log(res)})
        .catch(error => console.error(error));

    history.push("/groups");
  };

  return (
    <>
      <div>
        <p>Are you sure you want to delete this group?</p>
        <p>
          Group: <strong>{props.title} </strong>
        </p>
        <Button onClick={deleteBtnHandler}>Delete</Button>{" "}
        <Button onClick={cancelBtnHandler}>Cancel</Button>
      </div>
    </>
  );
};

export default GroupDelete;
