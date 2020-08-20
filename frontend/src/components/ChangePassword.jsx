import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

const ChangePassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const onSubmit = async (e) => {
    e.persist();
    e.preventDefault();
    const reqData = {
      username: props.username,
      oldPassword,
      newPassword,
    };
    const res = await fetch("/api/auth/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    const data = await res.json();
    alert(data.msg);
    setOldPassword("");
    setNewPassword("");
    setRepeatNewPassword("");
  };

  const isFieldValid = (value) => value.trim().length !== 0;
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="oldPassword">Old Password</Label>
          <Input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            invalid={!isFieldValid(oldPassword)}
            required
          />
          <FormFeedback>Please Enter your old password</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="newPassword">New Password</Label>
          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="repeatNewPassword">Repeat New Password</Label>
          <Input
            type="password"
            name="repeatNewPassword"
            placeholder="Repeat New Password"
            onChange={(e) => setRepeatNewPassword(e.target.value)}
            value={repeatNewPassword}
            invalid={newPassword !== repeatNewPassword}
            required
          />

          <FormFeedback>Passwords don't match</FormFeedback>
        </FormGroup>
        <center>
          <Button
            color="primary"
            type="submit"
            disabled={
              !isFieldValid(oldPassword) || newPassword !== repeatNewPassword
            }
          >
            <strong>Submit</strong>
          </Button>
        </center>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.user.person_no.toString(),
});

export default connect(mapStateToProps, null)(ChangePassword);
