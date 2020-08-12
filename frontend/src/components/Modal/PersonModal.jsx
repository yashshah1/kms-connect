import React, { useState } from "react";

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
import { Person } from "@material-ui/icons";
import Moment from "react-moment";

import ModalTitle from "./ModalTitle";
import Divider from "./Divider";

const PersonModal = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const getCol = (title, value) => (
    <>
      <Col>{title}</Col>
      <Col>{value}</Col>
    </>
  );

  const getRow = (title, value, hr = true) => (
    <>
      <Row>{getCol(title, value)}</Row>
      {hr && <hr />}
    </>
  );

  const formatMobileNumber = number => <a href={`tel:${number}`}>{number}</a>;
  const formatEmail = email => <a href={`mailto:${email}`}>{email}</a>;

  const {
    fullname,
    name,
    surname,
    father_or_husband_name,
    relationship_with_family_head,
    native_place,
    blood_group,
    gender,
    date_of_birth,
    marital_status,
    marriage_date,
    father_in_law_name,
    mobile_1,
    mobile_2,
    email_address,
    education,
    education_specialisation,
    stream,
    profession,
  } = user;

  return (
    <>
      <Button
        outline
        color="primary"
        aria-label="View person"
        style={{ margin: 5 }}
        onClick={toggle}
      >
        <Person />
      </Button>
      <Modal isOpen={isOpen} toggle={toggle} scrollable={true}>
        <ModalHeader toggle={toggle}>{fullname}</ModalHeader>
        <ModalBody>
          <ModalTitle text="Basic" />
          <Container>
            {getRow("First Name", name)}
            {getRow("Middle Name", father_or_husband_name)}
            {getRow("Last Name", surname)}
            {getRow("Relation", relationship_with_family_head)}
            {getRow("Native", native_place, false)}
          </Container>
          <Divider />
          <Container>
            {getRow("Blood Group", blood_group)}
            {getRow("Gender", gender)}
            {getRow(
              "Date of Birth",
              <Moment format="DD/MM/YYYY">{date_of_birth}</Moment>
            )}
            <Row>
              {getCol("Marital Status", marital_status)}
              {marriage_date ? (
                <Moment format="DD/MM/YYYY">{marriage_date}</Moment>
              ) : null}
            </Row>
            <hr />
            {getRow("Father in Law", father_in_law_name, false)}
          </Container>
          <ModalTitle text="Communication" />
          <Container>
            {mobile_1
              ? getRow("Mobile #1", formatMobileNumber(mobile_1))
              : null}
            {mobile_2
              ? getRow("Mobile #2", formatMobileNumber(mobile_2))
              : null}
            {email_address ? getRow("Email", formatEmail(email_address)) : null}
          </Container>

          <ModalTitle text="Education" />
          <Container>
            {getRow("Education", education)}
            {getRow("Specialisation", education_specialisation)}
            {getRow("Stream", stream)}
            {getRow("Profession", profession, false)}
          </Container>
          <Divider />
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

export default PersonModal;
