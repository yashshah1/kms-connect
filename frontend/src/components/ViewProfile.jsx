import React, { useState } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem, Collapse } from "reactstrap";
import Moment from "react-moment";

import ModalTitle from "./Modal/ModalTitle";
import Divider from "./Modal/Divider";
import PersonModal from "./Modal/PersonModal";
import { getUserFromUserId } from "../redux/utils";

const ViewProfile = ({ user }) => {
  // eslint-disable-next-line
  const [siblingCollapse, setSiblingCollapse] = useState(false);
  const [parentCollapse, setParentCollapse] = useState(false);
  const [childrenCollapse, setChildrenCollapse] = useState(false);
  const getCol = (title, value) => (
    <>
      <Col>{title}</Col>
      <Col xs="6">{value}</Col>
    </>
  );

  const getRow = (title, value, hr = true) => (
    <>
      <Row>{getCol(title, value)}</Row>
      {hr && <hr />}
    </>
  );

  const getRelationshipRow = (userId) => {
    const user = getUserFromUserId(userId);
    return (
      <>
        <Row key={user._id}>
          <Col>{user.fullname}</Col>
          <Col>
            <center>
              <PersonModal user={user} />
            </center>
          </Col>
        </Row>
        <hr />
      </>
    );
  };

  const formatMobileNumber = (number) => <a href={`tel:${number}`}>{number}</a>;
  const formatEmail = (email) => <a href={`mailto:${email}`}>{email}</a>;
  const {
    person_no,
    family_no,
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
    residential_address_line_1,
    residential_address_state,
    residential_address_city,
    pin_code,
    residential_landline,
    office_address,
    office_address_state,
    office_address_city,
    office_address_pin,
    landline_office,
    relationships = {},
  } = user;
  return (
    <Container>
      <ModalTitle text="System Information" />
      {getRow("Person number", person_no)}
      {getRow("Family number", family_no)}

      <ModalTitle text="Profile" />

      {getRow("First Name", name)}
      {getRow("Middle Name", father_or_husband_name)}
      {getRow("Last Name", surname)}
      {getRow("Relation", relationship_with_family_head)}
      {getRow("Native", native_place, false)}

      <Divider />

      {getRow("Blood Group", blood_group)}
      {getRow("Gender", gender)}
      {getRow("Date of Birth", <Moment format="DD/MM/YYYY">{date_of_birth}</Moment>)}
      <Row>
        {getCol("Marital Status", marital_status)}
        {marriage_date ? <Moment format="DD/MM/YYYY">{marriage_date}</Moment> : null}
      </Row>
      <hr />
      {getRow("Father in Law", father_in_law_name, false)}

      <ModalTitle text="Communication" />
      {mobile_1 ? getRow("Mobile #1", formatMobileNumber(mobile_1)) : null}
      {mobile_2 ? getRow("Mobile #2", formatMobileNumber(mobile_2)) : null}
      {email_address ? getRow("Email", formatEmail(email_address)) : null}

      <ModalTitle text="Education" />
      {getRow("Education", education)}
      {getRow("Specialisation", education_specialisation)}
      {getRow("Stream", stream)}
      {getRow("Profession", profession, false)}

      <ModalTitle text="Residence" />
      {getRow("Address", residential_address_line_1)}
      {getRow("City", residential_address_city)}
      {getRow("State", residential_address_state)}
      {getRow("Pin Code", pin_code)}
      {residential_landline
        ? getRow("Landline", formatMobileNumber(residential_landline))
        : null}

      <ModalTitle text="Office" />
      {getRow("Address", office_address)}
      {getRow("City", office_address_city)}
      {getRow("State", office_address_state)}
      {getRow("Pin Code", office_address_pin)}
      {landline_office
        ? getRow("Landline", formatMobileNumber(landline_office))
        : null}

      <ModalTitle text="Relationships" />
      <ListGroup>
        <ListGroupItem
          style={{ cursor: "pointer" }}
          action
          onClick={() => setSiblingCollapse(!siblingCollapse)}
          disabled={!(relationships.siblings && relationships.siblings.length > 0)}
        >
          Siblings
        </ListGroupItem>
        <Collapse isOpen={siblingCollapse}>
          {relationships.siblings ? (
            <Container>
              {relationships.siblings.map((sibling) => getRelationshipRow(sibling))}
            </Container>
          ) : null}
        </Collapse>
        <ListGroupItem
          style={{ cursor: "pointer" }}
          disabled={!(relationships.parents && relationships.parents.length > 0)}
          onClick={() => setParentCollapse(!parentCollapse)}
          action
        >
          Parents
        </ListGroupItem>
        <Collapse isOpen={parentCollapse}>
          {relationships.parents ? (
            <Container>
              {relationships.parents.map((parent) => getRelationshipRow(parent))}
            </Container>
          ) : null}
        </Collapse>
        <ListGroupItem
          style={{ cursor: "pointer" }}
          disabled={!(relationships.children && relationships.children.length > 0)}
          onClick={() => setChildrenCollapse(!childrenCollapse)}
          action
        >
          Children
        </ListGroupItem>
        <Collapse isOpen={childrenCollapse}>
          {relationships.children ? (
            <Container>
              {relationships.children.map((child) => getRelationshipRow(child))}
            </Container>
          ) : null}
        </Collapse>
      </ListGroup>
    </Container>
  );
};

export default ViewProfile;
