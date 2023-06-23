//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
//Router
import { useHistory, Link } from "react-router-dom";

const GrouptListItem = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  const time = props.date.toLocaleTimeString("en-US");

  const history = useHistory();
  const cardLink = () => {
    history.push("/groups/list");
  };

  return (
    <Container className="pb-2 pt-2 no-underline" key={props.id}>
      <Link to={{ pathname: `/groups/${props.id}` }}>
        <Card
          bg="primary"
          onClick={cardLink}
          className="text-decoration-none text-light"
          key={props.id}
        >
          <Card.Header className="text-center">
            Group Title: {props.title}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              Group Type: {parseInt(props.type) ? "Online" : "In Person"}
              <br />
              Date: {month + " " + day + ", " + year + " @ " + time}
              <br />
              Description: {props.description}
              <br />
              Tags:{" "}
              {props.tags.map((e, index) => (
                <Badge className="bg-warning text-dark me-2" key={index}>
                  {e}
                </Badge>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Container>
  );
};

export default GrouptListItem;
