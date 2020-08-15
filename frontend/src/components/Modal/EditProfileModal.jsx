import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";

import { Edit as EditIcon } from "@material-ui/icons";

import DatePicker from "reactstrap-date-picker";
import ModalTitle from "./ModalTitle";
import Divider from "./Divider";

class EditProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...props.user },
      isOpen: false,
    };
  }
  capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);

  onChange = e => {
    e.persist();
    this.setState(state => ({
      ...state,
      user: {
        ...state.user,
        [e.target.name]: e.target.value,
      },
    }));
  };
  onSubmit = e => {
    e.persist();
    e.preventDefault();
    this.setState({
      user: {
        ...this.state.user,
        fullname:
          this.state.name +
          " " +
          this.state.father_in_law_name +
          " " +
          this.state.surname,
      },
    });
    console.log(this.state);
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  isFieldValid = value => value.trim().length !== 0;
  isEmailValid = value =>
    // eslint-disable-next-line
    !!value.match(/^$|^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  render() {
    const { isOpen, user } = this.state;
    return (
      <>
        <EditIcon
          color="primary"
          aria-label="View person"
          style={{ margin: 5, cursor: "pointer" }}
          onClick={this.toggle}
        />

        <Modal isOpen={isOpen} toggle={this.toggle} scrollable={true}>
          <ModalHeader toggle={this.toggle}>{user.fullname}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  style={{ textTransform: "capitalize" }}
                  onChange={this.onChange}
                  value={user.name}
                  invalid={!this.isFieldValid(user.name)}
                  required
                />
                <FormFeedback>Please Enter a Name</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="father_or_husband_name">Middle Name</Label>
                <Input
                  type="text"
                  name="father_or_husband_name"
                  placeholder="Middle Name"
                  style={{ textTransform: "capitalize" }}
                  onChange={this.onChange}
                  value={user.father_or_husband_name}
                  invalid={!this.isFieldValid(user.father_or_husband_name)}
                  required
                />
                <FormFeedback>Please Enter a Name</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="father_or_husband_name">Middle Name</Label>
                <Input
                  type="text"
                  name="father_or_husband_name"
                  placeholder="Middle Name"
                  style={{ textTransform: "capitalize" }}
                  onChange={this.onChange}
                  value={user.father_or_husband_name}
                  invalid={!this.isFieldValid(user.father_or_husband_name)}
                  required
                />
                <FormFeedback>Please Enter a Name</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="surname">Last Name</Label>
                <Input
                  type="select"
                  name="surname"
                  value={user.surname}
                  onChange={this.onChange}
                  required
                >
                  <option value="Mall">Mall</option>
                  <option value="Mandan">Mandan</option>
                  <option value="Bhutada">Bhutada</option>
                  <option value="Navdhare">Navdhare</option>
                  <option value="Mundada">Mundada</option>
                  <option value="Ladhad">Ladhad</option>
                  <option value="Sharda">Sharda</option>
                  <option value="Sheth">Sheth</option>
                  <option value="Gagdani">Gagdani</option>
                  <option value="Rathi">Rathi</option>
                  <option value="Bhedakiya">Bhedakiya</option>
                  <option value="Karwa">Karwa</option>
                  <option value="Bhutda">Bhutda</option>
                  <option value="Somani">Somani</option>
                  <option value="Chandak">Chandak</option>
                  <option value="Kothari">Kothari</option>
                  <option value="Gingal">Gingal</option>
                  <option value="Maniyar">Maniyar</option>
                  <option value="Shah">Shah</option>
                  <option value="Gilda">Gilda</option>
                  <option value="Savar">Savar</option>
                  <option value="Jhaveri">Jhaveri</option>
                  <option value="Bathar">Bathar</option>
                  <option value="Bhopa">Bhopa</option>
                  <option value="Jeswani">Jeswani</option>
                </Input>

                <FormFeedback>Please Enter a Name</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="relationship_with_family_head">Relation</Label>
                <Input
                  type="select"
                  name="relationship_with_family_head"
                  value={user.relationship_with_family_head}
                  onChange={this.onChange}
                  required
                >
                  <option value="Self">Self</option>
                  <option value="Wife">Wife</option>
                  <option value="Son">Son</option>
                  <option value="Daghter">Daughter</option>
                </Input>
              </FormGroup>

              <Divider />

              <FormGroup>
                <Label for="blood_group">Blood Group</Label>
                <Input
                  type="select"
                  name="blood_group"
                  value={user.blood_group}
                  onChange={this.onChange}
                  required
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="N/a">N/a</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="gender">Gender</Label>
                <br />
                <input
                  type="radio"
                  value="Male"
                  name="gender"
                  checked={user.gender === "Male"}
                  onChange={this.onChange}
                />{" "}
                Male
                <br />
                <input
                  type="radio"
                  value="Female"
                  name="gender"
                  checked={user.gender === "Female"}
                  onChange={this.onChange}
                />{" "}
                Female
              </FormGroup>

              <FormGroup>
                <Label for="date_of_birth">Date of Birth</Label>
                <DatePicker
                  value={user.date_of_birth}
                  onChange={date_of_birth => this.setState({ date_of_birth })}
                  dateFormat="DD/MM/YYYY"
                  weekStartsOn={1}
                />
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col>
                    <Label for="marital_status">Marital Status</Label>
                    <Input
                      type="select"
                      name="marital_status"
                      value={user.marital_status}
                      onChange={this.onChange}
                      required
                    >
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                      <option value="Widow">Widow</option>
                      <option value="Divorcee">Divorcee</option>
                      <option value="Engaged">Engaged</option>
                    </Input>
                  </Col>
                  {["Married", "Widow"].includes(user.marital_status) && (
                    <Col>
                      <Label for="marriage_date">Marriage Date</Label>
                      <DatePicker
                        value={user.marriage_date}
                        onChange={marriage_date =>
                          this.setState({ marriage_date })
                        }
                        dateFormat="DD/MM/YYYY"
                        weekStartsOn={1}
                      />
                    </Col>
                  )}
                </Row>
              </FormGroup>
              {["Married", "Widow"].includes(user.marital_status) && (
                <FormGroup>
                  <Label for="father_in_law_name">Father in Law</Label>
                  <Input
                    type="text"
                    name="father_in_law_name"
                    placeholder="Middle Name"
                    style={{ textTransform: "capitalize" }}
                    onChange={this.onChange}
                    value={user.father_in_law_name}
                    invalid={!this.isFieldValid(user.father_in_law_name)}
                    required
                  />
                </FormGroup>
              )}
              <ModalTitle text="Communication" />
              <FormGroup>
                <Label for="mobile_1">Mobile #1</Label>
                <Input
                  type="text"
                  name="mobile_1"
                  placeholder="Mobile #1"
                  onChange={this.onChange}
                  value={user.mobile_1}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="mobile_2">Mobile #2</Label>
                <Input
                  type="text"
                  name="mobile_2"
                  placeholder="Mobile #2"
                  onChange={this.onChange}
                  value={user.mobile_2}
                />
              </FormGroup>

              <FormGroup>
                <Label for="name">Email Address</Label>
                <Input
                  type="text"
                  name="email_address"
                  placeholder="Email"
                  onChange={this.onChange}
                  value={user.email_address}
                  invalid={!this.isEmailValid(user.email_address)}
                />
                <FormFeedback>Please enter a valid email</FormFeedback>
              </FormGroup>

              <ModalTitle text="Education" />
              <FormGroup>
                <Label for="education">Education</Label>
                <Input
                  type="select"
                  name="education"
                  value={user.education}
                  onChange={this.onChange}
                  required
                >
                  <option value="N/a">N/a</option>
                  <option value="School">School</option>
                  <option value="Graduate">Graduate</option>
                  <option value="High school">High school</option>
                  <option value="Post graduate">Post graduate</option>
                  <option value="College">College</option>
                  <option value="Ph d">Ph d</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="education_specialisation">
                  Education Specialisation
                </Label>
                <Input
                  type="text"
                  name="education_specialisation"
                  placeholder="Education Specialisation (eg: BCom, BTech)"
                  onChange={this.onChange}
                  value={user.education_specialisation}
                />
              </FormGroup>

              <FormGroup>
                <Label for="stream">Stream</Label>
                <Input
                  type="text"
                  name="stream"
                  placeholder="Stream"
                  onChange={this.onChange}
                  value={user.stream}
                />
              </FormGroup>

              <FormGroup>
                <Label for="profession">Profession</Label>
                <Input
                  type="text"
                  name="profession"
                  placeholder="Profession"
                  onChange={this.onChange}
                  value={user.profession}
                />
              </FormGroup>
              <Divider />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Row>
              <Col className="mb-2">
                <center>
                  <Button color="primary" type="submit">
                    <strong>Save</strong>
                  </Button>{" "}
                  <Button color="danger" onClick={this.toggle}>
                    <strong>Cancel</strong>
                  </Button>
                </center>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default EditProfileModal;
