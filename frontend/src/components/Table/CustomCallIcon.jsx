import React from "react";
import { Call as CallIcon } from "@material-ui/icons";

const CustomCallIcon = ({ user: { mobile_1, mobile_2 } }) => {
  let mobile;
  let disabled = false;

  if (mobile_1) mobile = mobile_1;
  else if (mobile_2) mobile = mobile_2;
  else disabled = true;

  return (
    <CallIcon
      onClick={
        disabled ? undefined : () => (document.location.href = `tel:${mobile}`)
      }
      color="primary"
      aria-label="Call person"
      style={{ pointer: "cursor", margin: 5, opacity: disabled ? 0.5 : 1 }}
    />
  );
};

export default CustomCallIcon;
