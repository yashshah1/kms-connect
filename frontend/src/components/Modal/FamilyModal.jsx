import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
} from "reactstrap";
import { MenuOpen as MenuOpenIcon } from "@material-ui/icons";

import CustomCallIcon from "../Table/CustomCallIcon";
import PersonModal from "./PersonModal";

const FamilyModal = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuOpenIcon
        color="primary"
        aria-label="View Family"
        style={{ margin: 5, cursor: "pointer" }}
        onClick={toggle}
      />
      <Modal isOpen={isOpen} toggle={toggle} scrollable={true}>
        <ModalHeader toggle={toggle}>Family Members</ModalHeader>
        <ModalBody>
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
                  <CustomCallIcon user={member} />
                  <PersonModal user={member} />
                </Col>
              </Row>
              <hr />
            </Container>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  familyMembers: state.user.users.filter(
    user => user.family_no === ownProps.family_no
  ),
});

export default connect(mapStateToProps)(FamilyModal);
