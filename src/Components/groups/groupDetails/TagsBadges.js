import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const TagsBadges = (props) => {
  
  return (
    <Link to={"/groups/tags/"+props.tagName}>
      <Badge className="bg-warning text-dark me-2" key={props.index}>
        {props.tagName}
      </Badge>
    </Link>
  );
};

export default TagsBadges;
