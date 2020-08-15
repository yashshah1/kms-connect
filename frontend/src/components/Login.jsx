import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import { login } from "../redux/authRedux/authActions";

const Login = ({ login, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    login(username, password);
  };
  return (
    <>
      {loggedIn ? (
        <Redirect to="/home" />
      ) : (
        <Container className="App">
          <center>
            <h2>Sign In</h2>
          </center>
          <Form className="form">
            <Col>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col>
              <center>
                <Button type="submit" color="success" onClick={handleSubmit}>
                  Login
                </Button>
              </center>
            </Col>
          </Form>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, { login })(Login);
