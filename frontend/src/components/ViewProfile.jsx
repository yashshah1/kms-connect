import React from "react";

import { Container, Row, Col } from "reactstrap";
import Moment from "react-moment";

import ModalTitle from "./Modal/ModalTitle";
import Divider from "./Modal/Divider";

const ViewProfile = ({ user }) => {
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
    <Container>
      <ModalTitle text="Profile" />

      {getRow("First Name", name)}
      {getRow("Middle Name", father_or_husband_name)}
      {getRow("Last Name", surname)}
      {getRow("Relation", relationship_with_family_head)}
      {getRow("Native", native_place, false)}

      <Divider />

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

      <ModalTitle text="Communication" />
      {mobile_1 ? getRow("Mobile #1", formatMobileNumber(mobile_1)) : null}
      {mobile_2 ? getRow("Mobile #2", formatMobileNumber(mobile_2)) : null}
      {email_address ? getRow("Email", formatEmail(email_address)) : null}

      <ModalTitle text="Education" />
      {getRow("Education", education)}
      {getRow("Specialisation", education_specialisation)}
      {getRow("Stream", stream)}
      {getRow("Profession", profession, false)}
      <Divider />
    </Container>
  );
};

export default ViewProfile;
