import React, { useState } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem, Collapse } from "reactstrap";
import Moment from "react-moment";

import ModalTitle from "./Modal/ModalTitle";
import Divider from "./Modal/Divider";
import PersonModal from "./Modal/PersonModal";
import FamilyModal from "./Modal/FamilyModal";
import { getUserFromUserId } from "../redux/utils";

const ViewProfile = ({ user }) => {
  // eslint-disable-next-line
  const [brothersCollapse, setBrothersCollapse] = useState(true);
  const [sistersCollapse, setSistersCollapse] = useState(true);
  const [childrenCollapse, setChildrenCollapse] = useState(true);
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

  const getSingleRelationshipRow = (userId, relationship) => {
    const user = getUserFromUserId(userId);
    return (
      <Row>
        <Col>{relationship}</Col>
        <Col>{user.fullname}</Col>
        <Col>
          <center>
            <PersonModal user={user} />
            <FamilyModal family_no={user.family_no} />
          </center>
        </Col>
      </Row>
    );
  };

  const getRelationshipRow = (userId) => {
    const user = getUserFromUserId(userId);
    return (
      <Row key={user._id}>
        <Col>{user.fullname}</Col>
        <Col>
          <center>
            <PersonModal user={user} />
            <FamilyModal family_no={user.family_no} />
          </center>
        </Col>
      </Row>
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
    relationships,
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
        {relationships.father ? (
          <ListGroupItem style={{ cursor: "pointer" }} action>
            {getSingleRelationshipRow(relationships.father, "Father")}
          </ListGroupItem>
        ) : null}
        {relationships.mother ? (
          <ListGroupItem style={{ cursor: "pointer" }} action>
            {getSingleRelationshipRow(relationships.mother, "Mother")}
          </ListGroupItem>
        ) : null}
        {relationships.brothers && relationships.brothers.length > 0 ? (
          <>
            <ListGroupItem
              style={{ cursor: "pointer" }}
              onClick={() => setBrothersCollapse(!brothersCollapse)}
              action
            >
              Brothers
            </ListGroupItem>
            <Collapse isOpen={brothersCollapse}>
              {relationships.brothers ? (
                <Container>
                  {relationships.brothers.map((brother) =>
                    getRelationshipRow(brother)
                  )}
                </Container>
              ) : null}
            </Collapse>
          </>
        ) : null}

        {relationships.sisters && relationships.sisters.length > 0 ? (
          <>
            <ListGroupItem
              style={{ cursor: "pointer" }}
              onClick={() => setSistersCollapse(!sistersCollapse)}
              action
            >
              Sisters
            </ListGroupItem>
            <Collapse isOpen={sistersCollapse}>
              {relationships.sisters ? (
                <Container>
                  {relationships.sisters.map((sister) => getRelationshipRow(sister))}
                </Container>
              ) : null}
            </Collapse>
          </>
        ) : null}

        {relationships.children && relationships.children.length > 0 ? (
          <>
            <ListGroupItem
              style={{ cursor: "pointer" }}
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
          </>
        ) : null}
      </ListGroup>
    </Container>
  );
};

export default ViewProfile;
