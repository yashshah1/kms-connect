import React from "react";
import Divider from "./Divider";

const ModalTitle = ({ text }) => {
  return (
    <>
      <Divider />
      <center>
        <h4>{text.toUpperCase()}</h4>
      </center>
      <Divider />
    </>
  );
};

export default ModalTitle;
