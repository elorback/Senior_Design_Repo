import React from "react";
import { Accordion, Badge, ListGroup} from "react-bootstrap";

const GroupMembers = (props) =>{

    return(
        <React.Fragment>
            <Accordion className="text-black pb-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Members in group <pre> </pre>
                  {props.groups.members && (
                    <Badge bg="info">{props.groups.members.length}</Badge>
                  )}
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup className="pb-4">
                    {props.groups.members &&
                        props.groups.members.map((e, index) => (
                        <ListGroup.Item key={e._id}>
                          {e.username}
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
        </React.Fragment>
    );
}

export default GroupMembers;