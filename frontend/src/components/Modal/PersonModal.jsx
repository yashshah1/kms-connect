import React, { useState } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Person as PersonIcon } from "@material-ui/icons";
import ViewProfile from "../ViewProfile";

const PersonModal = ({ user }) => {
  const { fullname } = user;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <PersonIcon
        color="primary"
        aria-label="View person"
        style={{ margin: 5, cursor: "pointer" }}
        onClick={toggle}
      />

      <Modal isOpen={isOpen} toggle={toggle} scrollable={true}>
        <ModalHeader toggle={toggle}>{fullname}</ModalHeader>
        <ModalBody>
          <ViewProfile user={user} />
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
