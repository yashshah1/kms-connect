import React, { useState } from "react";
import { connect } from "react-redux";
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

import { useCombobox, useMultipleSelection } from "downshift";

import { Edit as EditIcon } from "@material-ui/icons";
import DatePicker from "reactstrap-date-picker";

import ModalTitle from "./ModalTitle";
import { surnames, bloodGroups, cities, states } from "../../resources";
import { updateUser } from "../../redux/userRedux/userActions";

import { getUserFromUserId } from "../../redux/utils";
import isSubSequence from "../../utils/isSubSequence";

const EditProfileModalFunction = (props) => {
  const [user, setUser] = useState(props.user);
  const [isOpen, setIsOpen] = useState(false);
  const [changed, setChanged] = useState(false);

  const [parentInput, setParentInput] = useState("");
  const [siblingInput, setSiblingInput] = useState("");
  const [childInput, setChildInput] = useState("");

  const getFilteredItems = (items, selectedItems, inputValue) =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item.fullname) < 0 &&
        isSubSequence(inputValue, item.fullname)
    );

  const parentMultipleSelection = useMultipleSelection({
    initialSelectedItems: user.relationships.parents,
  });

  const parentComboBox = useCombobox({
    parentInput,
    items: getFilteredItems(
      props.users,
      parentMultipleSelection.selectedItems,
      parentInput
    ),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setChanged(true);
          setParentInput(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setParentInput("");
            parentMultipleSelection.addSelectedItem(selectedItem);
            parentComboBox.selectItem(null);
          }
          break;
        default:
          break;
      }
    },
    itemToString: (item) => item || "",
  });

  const siblingMultipleSelection = useMultipleSelection({
    initialSelectedItems: user.relationships.siblings,
  });

  const siblingComboBox = useCombobox({
    siblingInput,
    items: getFilteredItems(
      props.users,
      siblingMultipleSelection.selectedItems,
      siblingInput
    ),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setChanged(true);
          setSiblingInput(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setSiblingInput("");
            siblingMultipleSelection.addSelectedItem(selectedItem);
            siblingComboBox.selectItem(null);
          }
          break;
        default:
          break;
      }
    },
    itemToString: (item) => item || "",
  });

  const childMultipleSelection = useMultipleSelection({
    initialSelectedItems: user.relationships.children,
  });

  const childComboBox = useCombobox({
    childInput,
    items: getFilteredItems(
      props.users,
      childMultipleSelection.selectedItems,
      childInput
    ),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setChanged(true);
          setChildInput(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setChildInput("");
            childMultipleSelection.addSelectedItem(selectedItem);
            childComboBox.selectItem(null);
          }
          break;
        default:
          break;
      }
    },
    itemToString: (item) => item || "",
  });

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  const isFieldValid = (value) => value.trim().length !== 0;
  const isEmailValid = (value) =>
    // eslint-disable-next-line
    !!value.match(/^$|^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const toggle = () => setIsOpen(!isOpen);

  const onChange = (e) => {
    e.persist();
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
    setChanged(true);
  };

  const onSubmit = (e) => {
    e.persist();
    e.preventDefault();
    if (!changed) toggle();
    else {
      const name = capitalizeFirstLetter(user.name);

      const father_or_husband_name = capitalizeFirstLetter(
        user.father_or_husband_name
      );
      const surname = capitalizeFirstLetter(user.surname);
      const father_in_law_name = capitalizeFirstLetter(user.father_in_law_name);
      const stream = capitalizeFirstLetter(user.stream);
      const profession = capitalizeFirstLetter(user.profession);
      const education_specialisation = capitalizeFirstLetter(
        user.education_specialisation
      );
      const fullname = `${name} ${father_or_husband_name} ${surname}`;
      const finalUser = {
        ...user,
        name,
        father_or_husband_name,
        surname,
        father_in_law_name,
        stream,
        profession,
        education_specialisation,
        fullname,
        relationships: {
          ...user.relationships,
          parents: parentMultipleSelection.selectedItems.map(
            (item) => item.person_no
          ),
          siblings: siblingMultipleSelection.selectedItems.map(
            (item) => item.person_no
          ),
          children: childMultipleSelection.selectedItems.map(
            (item) => item.person_no
          ),
        },
      };
      props.updateUser(finalUser);
      toggle();
    }
  };

  return (
    <>
      <EditIcon
        color="primary"
        aria-label="View person"
        style={{ margin: 5, cursor: "pointer" }}
        onClick={toggle}
      />

      <Modal isOpen={isOpen} toggle={toggle} scrollable={true}>
        <ModalHeader toggle={toggle}>{user.fullname}</ModalHeader>
        <ModalBody>
          <ModalTitle text="Basic Information" />
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                style={{ textTransform: "capitalize" }}
                onChange={onChange}
                value={user.name}
                invalid={!isFieldValid(user.name)}
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
                onChange={onChange}
                value={user.father_or_husband_name}
                invalid={!isFieldValid(user.father_or_husband_name)}
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
                onChange={onChange}
                required
              >
                {surnames.map((surname, index) => (
                  <option value={surname} key={index}>
                    {surname}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <Row>
              <Col>
                <FormGroup>
                  <Label for="relationship_with_family_head">Relation</Label>
                  <Input
                    type="select"
                    name="relationship_with_family_head"
                    value={user.relationship_with_family_head}
                    onChange={onChange}
                    required
                  >
                    <option value="Self">Self</option>
                    <option value="Wife">Wife</option>
                    <option value="Son">Son</option>
                    <option value="Daghter">Daughter</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="blood_group">Blood Group</Label>
                  <Input
                    type="select"
                    name="blood_group"
                    value={user.blood_group}
                    onChange={onChange}
                    required
                  >
                    {bloodGroups.map((bloodGroup, index) => (
                      <option value={bloodGroup} key={index}>
                        {bloodGroup}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="gender">Gender</Label>
              <br />
              <input
                type="radio"
                value="Male"
                name="gender"
                checked={user.gender === "Male"}
                onChange={onChange}
              />{" "}
              Male
              <br />
              <input
                type="radio"
                value="Female"
                name="gender"
                checked={user.gender === "Female"}
                onChange={onChange}
              />{" "}
              Female
            </FormGroup>

            <FormGroup>
              <Label for="date_of_birth">Date of Birth</Label>
              <DatePicker
                value={user.date_of_birth}
                onChange={(date_of_birth) =>
                  setUser((user) => ({ ...user, date_of_birth }))
                }
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
                    onChange={onChange}
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
                      onChange={(marriage_date) =>
                        setUser((user) => ({ ...user, marriage_date }))
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
                  onChange={onChange}
                  value={user.father_in_law_name}
                  invalid={!isFieldValid(user.father_in_law_name)}
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
                onChange={onChange}
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
                onChange={onChange}
                value={user.mobile_2}
              />
            </FormGroup>

            <FormGroup>
              <Label for="name">Email Address</Label>
              <Input
                type="text"
                name="email_address"
                placeholder="Email"
                onChange={onChange}
                value={user.email_address}
                invalid={!isEmailValid(user.email_address)}
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
                onChange={onChange}
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
              <Label for="education_specialisation">Education Specialisation</Label>
              <Input
                type="text"
                name="education_specialisation"
                placeholder="Education Specialisation (eg: BCom, BTech)"
                onChange={onChange}
                value={user.education_specialisation}
              />
            </FormGroup>

            <FormGroup>
              <Label for="stream">Stream</Label>
              <Input
                type="text"
                name="stream"
                placeholder="Stream"
                onChange={onChange}
                value={user.stream}
              />
            </FormGroup>

            <FormGroup>
              <Label for="profession">Profession</Label>
              <Input
                type="text"
                name="profession"
                placeholder="Profession"
                onChange={onChange}
                value={user.profession}
              />
            </FormGroup>

            <ModalTitle text="Residence" />
            <FormGroup>
              <Label for="residential_address_line_1">Address Line 1</Label>
              <Input
                type="text"
                name="residential_address_line_1"
                placeholder="Residential Address"
                onChange={onChange}
                value={user.residential_address_line_1}
              />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="residential_address_city">City</Label>
                  <Input
                    type="select"
                    name="residential_address_city"
                    value={user.residential_address_city}
                    onChange={onChange}
                    required
                  >
                    {cities.map((city, index) => (
                      <option value={city} key={index}>
                        {city}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="residential_address_state">State</Label>
                  <Input
                    type="select"
                    name="residential_address_state"
                    value={user.residential_address_state}
                    onChange={onChange}
                    required
                  >
                    {states.map((state, index) => (
                      <option value={state} key={index}>
                        {state}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="residential_landline">Landline</Label>
              <Input
                type="text"
                name="residential_landline"
                placeholder="Residential Landline"
                onChange={onChange}
                value={user.residential_landline || null}
              />
            </FormGroup>

            <ModalTitle text="Office" />

            <FormGroup>
              <Label for="office_address">Office Address</Label>
              <Input
                type="text"
                name="office_address"
                placeholder="Office Address"
                onChange={onChange}
                value={user.office_address}
              />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="office_address_city">City</Label>
                  <Input
                    type="select"
                    name="office_address_city"
                    value={user.office_address_city || "Other"}
                    onChange={onChange}
                    required
                  >
                    {cities.map((city, index) => (
                      <option value={city} key={index}>
                        {city}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="office_address_state">State</Label>
                  <Input
                    type="select"
                    name="office_address_state"
                    value={user.office_address_state || "Other"}
                    onChange={onChange}
                    required
                  >
                    {states.map((state, index) => (
                      <option value={state} key={index}>
                        {state}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="landline_office">Landline</Label>
              <Input
                type="text"
                name="landline_office"
                placeholder="Office Landline"
                onChange={onChange}
                value={user.landline_office || null}
              />
            </FormGroup>

            <ModalTitle text="Relationships" />
            <FormGroup>
              <Label {...parentComboBox.getLabelProps()}>
                <strong>Parents</strong>
              </Label>
              <div>
                {parentMultipleSelection.selectedItems.map((selectedItem, index) => (
                  <span
                    key={`selected-item-${index}`}
                    {...parentMultipleSelection.getSelectedItemProps({
                      selectedItem,
                      index,
                    })}
                  >
                    {selectedItem.fullname}
                    <span
                      onClick={() => {
                        parentMultipleSelection.removeSelectedItem(selectedItem);
                        setChanged(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      &#10005;
                    </span>
                  </span>
                ))}
                <div {...parentComboBox.getComboboxProps()}>
                  <Input
                    {...parentComboBox.getInputProps(
                      parentMultipleSelection.getDropdownProps({
                        preventKeyAction: parentComboBox.isOpen,
                      })
                    )}
                  />
                </div>
              </div>
              <ul
                {...parentComboBox.getMenuProps()}
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  margin: 0,
                  borderTop: 0,
                  background: "white",
                  position: "absolute",
                  zIndex: 1000,
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {parentComboBox.isOpen &&
                  getFilteredItems(
                    props.users,
                    parentMultipleSelection.selectedItems,
                    parentInput
                  ).map((item, index) => (
                    <li
                      style={
                        parentComboBox.highlightedIndex === index
                          ? { backgroundColor: "#bde4ff" }
                          : {}
                      }
                      key={`${item}${index}`}
                      {...parentComboBox.getItemProps({ item, index })}
                    >
                      {item.fullname}
                    </li>
                  ))}
              </ul>
            </FormGroup>

            <FormGroup>
              <Label {...siblingComboBox.getLabelProps()}>
                <strong>Siblings</strong>
              </Label>
              <div>
                {siblingMultipleSelection.selectedItems.map(
                  (selectedItem, index) => (
                    <span
                      key={`selected-item-${index}`}
                      {...siblingMultipleSelection.getSelectedItemProps({
                        selectedItem,
                        index,
                      })}
                    >
                      {selectedItem.fullname}
                      <span
                        onClick={() => {
                          siblingMultipleSelection.removeSelectedItem(selectedItem);
                          setChanged(true);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        &#10005;
                      </span>
                    </span>
                  )
                )}
                <div {...siblingComboBox.getComboboxProps()}>
                  <Input
                    {...siblingComboBox.getInputProps(
                      siblingMultipleSelection.getDropdownProps({
                        preventKeyAction: siblingComboBox.isOpen,
                      })
                    )}
                  />
                </div>
              </div>
              <ul
                {...siblingComboBox.getMenuProps()}
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  margin: 0,
                  borderTop: 0,
                  background: "white",
                  position: "absolute",
                  zIndex: 1000,
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {siblingComboBox.isOpen &&
                  getFilteredItems(
                    props.users,
                    siblingMultipleSelection.selectedItems,
                    siblingInput
                  ).map((item, index) => (
                    <li
                      style={
                        siblingComboBox.highlightedIndex === index
                          ? { backgroundColor: "#bde4ff" }
                          : {}
                      }
                      key={`${item}${index}`}
                      {...siblingComboBox.getItemProps({ item, index })}
                    >
                      {item.fullname}
                    </li>
                  ))}
              </ul>
            </FormGroup>

            <FormGroup>
              <Label {...childComboBox.getLabelProps()}>
                <strong>Children</strong>
              </Label>
              <div>
                {childMultipleSelection.selectedItems.map((selectedItem, index) => (
                  <span
                    key={`selected-item-${index}`}
                    {...childMultipleSelection.getSelectedItemProps({
                      selectedItem,
                      index,
                    })}
                  >
                    {selectedItem.fullname}
                    <span
                      onClick={() => {
                        childMultipleSelection.removeSelectedItem(selectedItem);
                        setChanged(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      &#10005;
                    </span>
                  </span>
                ))}
                <div {...childComboBox.getComboboxProps()}>
                  <Input
                    {...childComboBox.getInputProps(
                      childMultipleSelection.getDropdownProps({
                        preventKeyAction: childComboBox.isOpen,
                      })
                    )}
                  />
                </div>
              </div>
              <ul
                {...childComboBox.getMenuProps()}
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  margin: 0,
                  borderTop: 0,
                  background: "white",
                  position: "absolute",
                  zIndex: 1000,
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {childComboBox.isOpen &&
                  getFilteredItems(
                    props.users,
                    childMultipleSelection.selectedItems,
                    childInput
                  ).map((item, index) => (
                    <li
                      style={
                        childComboBox.highlightedIndex === index
                          ? { backgroundColor: "#bde4ff" }
                          : {}
                      }
                      key={`${item}${index}`}
                      {...childComboBox.getItemProps({ item, index })}
                    >
                      {item.fullname}
                    </li>
                  ))}
              </ul>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col className="mb-2">
              <center>
                <Button color="primary" type="submit" onClick={onSubmit}>
                  <strong>Save</strong>
                </Button>{" "}
                <Button color="danger" onClick={toggle}>
                  <strong>Cancel</strong>
                </Button>
              </center>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const users = Object.values(state.user.users).map((user) => ({
    person_no: user.person_no,
    fullname: user.fullname,
  }));
  const user = {
    ...ownProps.user,
    relationships: {
      ...ownProps.user.relationships,
      siblings: ownProps.user.relationships.siblings.map((sibling) => {
        const tmpUser = getUserFromUserId(sibling);
        return { person_no: tmpUser.person_no, fullname: tmpUser.fullname };
      }),
      parents: ownProps.user.relationships.parents.map((parent) => {
        const tmpUser = getUserFromUserId(parent);
        return { person_no: tmpUser.person_no, fullname: tmpUser.fullname };
      }),

      children: ownProps.user.relationships.children.map((child) => {
        const tmpUser = getUserFromUserId(child);
        return { person_no: tmpUser.person_no, fullname: tmpUser.fullname };
      }),
    },
  };

  return { users, user };
};

export default connect(mapStateToProps, { updateUser })(EditProfileModalFunction);
