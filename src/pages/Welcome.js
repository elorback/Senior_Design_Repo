//React hooks
import { useEffect, useState, useContext } from "react";
//Styling
import { Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import "./Welcome.css";
import { ArrowRight, PeopleFill, Tags } from 'react-bootstrap-icons';
//links
import { Link } from "react-router-dom";
//database
import axios from "axios";
//User Token
import AuthContext from "../Store/auth-context";

const Welcome = () => {

    //useState to store top/new groups and tags
    const [topGroups, setTopGroups] = useState(null)
    const [latestGroups, setLatestGroups] = useState(null)
    const [topTags, setTopTags] = useState(null)

    //token stuff
    const authCtx = useContext(AuthContext);
    const isLogedIn = authCtx.isLoggedIn;

    //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    //async call to database
    const fetchTopGroups = async () => {
      try {
        const response = await axios("http://localhost:5000/activities/top");
        //store groups in groups object
        setTopGroups(response.data)
      } catch (err) {
        console.log(err);
      }
    };

    const fetchLatestGroups = async () => {
        try {
          const response = await axios("http://localhost:5000/activities/latest");
          //store groups in groups object
          setLatestGroups(response.data)
        } catch (err) {
          console.log(err);
        }
      };

      const fetchTopTags = async () => {
        try {
          const response = await axios("http://localhost:5000/tags/top");
          //store groups in groups object
          setTopTags(response.data)
        } catch (err) {
          console.log(err);
        }
      };

    //Call async function
    fetchTopGroups();
    fetchLatestGroups();
    fetchTopTags();
  }, []);

  return (
    <Container fluid >
      <header className="bg-dark py-5">
        <Container className="px-5">
          <Row className="gx-5 justify-content-center">
            <Col className="lg-6">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2">
                  Welcome to Squad Seek
                </h1>
                <p className="lead text-white-50 mb-4">
                  A social platform that allows you to meet new people with
                  similar interests for activities that are both offline or
                  online!
                </p>
                {!isLogedIn &&(<div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  <Link to="/register">
                    <Button className="btn btn-primary btn-lg px-4 me-sm-3">
                      Register
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      className="bg-dark btn-outline-light btn-lg px-4"
                    >
                      Login
                    </Button>
                  </Link>
                </div>)}
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      {/* <!-- Features section--> */}
      <section className="py-5 border-bottom bg-white text-dark" id="features">
        <Container className=" px-5 my-5">
          <Row className="gx-5">
            <Col className="lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <PeopleFill/>
              </div>
              <h2 className="h4 fw-bolder">Groups</h2>
              <p>
              Socialize and have fun with new people
               while doing your favorite activities in person
               or online.
              </p>
              <Link className="text-decoration-none" to="/groups/list">
                View Groups
                <ArrowRight />
              </Link>
            </Col>
            <Col className="lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <Tags/>
              </div>
              <h2 className="h4 fw-bolder">Tags</h2>
              <p>
                Find groups with new or old friends based
                on various tags that interests you. 
              </p>
              <Link className="text-decoration-none" to="/groups/tags">
                View Tags
                <ArrowRight />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg-light py-5 border-bottom text-dark">
        <Container className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder">Recent Activity</h2>
            <p className="lead mb-0">idk something here</p>
          </div>
          <Row className="gx-5 justify-content-center">
            <Col className="lg-6 col-xl-4">
              <Card className="card mb-5 mb-xl-0">
                <Card.Body className="p-5">
                <div className="mb-3">
                    <h3 className="fw-bold text-center">Top Groups</h3>
                  </div>
                  <ListGroup className="text-center">
                      {topGroups && topGroups.map(e =>(
                          <ListGroupItem key={e._id}>
                             { e.name}
                          </ListGroupItem>
                      ))}
                  </ListGroup>
                  <div className="d-grid">
                    <Button className="">
                        <Link to="/groups/tags" className="text-light text-decoration-none">View Groups</Link>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* <!-- Pricing card pro--> */}
            <Col className="lg-6 col-xl-4">
              <Card className="mb-5 mb-xl-0">
                <Card.Body className="p-5">
                <div className="mb-3">
                    <h3 className="fw-bold text-center">Latest Groups</h3>
                  </div>
                  <ListGroup className="text-center">
                      {latestGroups && latestGroups.map(e =>(
                          <ListGroupItem key={e._id}>
                             { e.name}
                          </ListGroupItem>
                      ))}
                  </ListGroup>
                  <div className="d-grid">
                  
                  <Button className="">
                        <Link to="/groups/tags" className="text-light text-decoration-none">View Groups</Link>
                    </Button>
                    
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* <!-- Pricing card enterprise--> */}
            <Col className="lg-6 col-xl-4 text-dark">
              <Card>
                <Card.Body className="p-5">
                  
                <div className="mb-3">
                    <h3 className="fw-bold text-center">Top Tags</h3>
                  </div>
                  <ListGroup className="text-center">
                      {topTags && topTags.map(e =>(
                          <ListGroupItem key={e._id}>
                             { e.tagName}
                          </ListGroupItem>
                      ))}
                  </ListGroup>
                  <div className="d-grid">
                     <Button className="">
                        <Link to="/groups/tags" className="text-light text-decoration-none">View Tags</Link>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Container>
  );
};

export default Welcome;
