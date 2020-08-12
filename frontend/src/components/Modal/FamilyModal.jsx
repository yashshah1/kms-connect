import React, { Component } from "react";
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
import { MenuOpen } from "@material-ui/icons";

import PersonModal from "./PersonModal";

class FamilyModal extends Component {
  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  getCol = (title, value) => (
    <>
      <Col>{title}</Col>
      <Col>{value}</Col>
    </>
  );

  getRow = (title, value, hr = true) => (
    <>
      <Row>{this.getCol(title, value)}</Row>
      {hr && <hr />}
    </>
  );

  formatMobileNumber = number => <a href={`tel:${number}`}>{number}</a>;
  formatEmail = email => <a href={`mailto:${email}`}>{email}</a>;

  render() {
    return (
      <>
        <Button
          color="primary"
          aria-label="View Family"
          style={{ margin: 5 }}
          onClick={this.toggle}
          outline
        >
          <MenuOpen />
        </Button>
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          scrollable={true}
        >
          <ModalHeader toggle={this.toggle}>Family Members</ModalHeader>
          <ModalBody>
            {this.props.familyMembers.map(member => (
              <Container key={member._id}>
                <Row>
                  <Col>
                    <Row>{member.fullname}</Row>
                  </Col>
                  <Col>
                    <center>{member.relationship_with_family_head}</center>
                  </Col>
                  <Col xs="2">
                    <PersonModal user={member} />
                  </Col>
                </Row>
                <hr />
              </Container>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({ user }, ownProps) => ({
  familyMembers: user.users.filter(
    user => user.family_no === ownProps.family_no
  ),
});
export default connect(mapStateToProps)(FamilyModal);
