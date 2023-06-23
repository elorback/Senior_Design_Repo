import { Card, Container } from "react-bootstrap";

const GroupCommentList = (props) => {

  return (
    <Container className = "bg-light pb-4">
      {props.userComments.comments && props.userComments.comments.map((e, index) => (
        <Card className="text-dark" key={index}>
          <Card.Header>{e.userName}</Card.Header>
          <Card.Body>
              {e.message}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default GroupCommentList;
