import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../redux/userRedux/userActions";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

const Home = props => {
  useEffect(() => {
    props.getUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <Row className="my-2">
        <Col>
          <Link to="/members">
            <div className="home-button">
              <center>
                <strong>Members List</strong>
              </center>
            </div>
          </Link>
        </Col>
        <Col>
          <Link to="/birthdays">
            <div className="home-button">
              <center>
                <strong>Birthdays</strong>
              </center>
            </div>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/family">
            <div className="home-button">
              <center>
                <strong>View / Edit profile</strong>
              </center>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(null, { getUsers })(Home);
