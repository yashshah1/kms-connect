import React from "react";
import { connect } from "react-redux";

import { Container, Row, Col } from "reactstrap";

import EditProfileModal from "./Modal/EditProfileModal";
import PersonModal from "./Modal/PersonModal";

const ViewFamily = props => {
  return (
    <Container>
      {props.familyMembers.map(member => (
        <Container key={member._id}>
          <Row>
            <Col>
              <Row>{member.fullname}</Row>
            </Col>
            <Col>
              <center>{member.relationship_with_family_head}</center>
            </Col>
            <Col xs="3">
              <PersonModal user={member} />
              <EditProfileModal user={member} />
            </Col>
          </Row>
          <hr />
        </Container>
      ))}
    </Container>
  );
};

const mapStateToProps = state => ({
  familyMembers: state.user.users.filter(
    user => user.family_no === state.auth.user.family_no
  ),
});

export default connect(mapStateToProps)(ViewFamily);
