import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../redux/userRedux/userActions";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

const Home = (props) => {
  useEffect(() => {
    if (props.count === 0) props.getUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <>
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
                  <strong>View / Edit family</strong>
                </center>
              </div>
            </Link>
          </Col>
          <Col>
            <Link to="/changepassword">
              <div className="home-button">
                <center>
                  <strong>Change Password</strong>
                </center>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
      <footer
        style={{
          position: "fixed",
          left: "0px",
          bottom: "0px",
          width: "100%",
          fontSize: "1.2em",
          color: "black",
          textAlign: "center",
        }}
      >
        <div className="container">
          <span className="text-muted">
            Proof of concept by <br />
            Yash Narendra Shah
          </span>
        </div>
      </footer>
    </>
  );
};

const mapStateToProps = (state) => ({
  count: Object.values(state.user.users).length,
});
export default connect(mapStateToProps, { getUsers })(Home);
