import React from "react";

import CallIcon from "./CustomCallIcon";
import PersonModal from "../Modal/PersonModal";
import FamilyModal from "../Modal/FamilyModal";

const ActionButtons = ({ call = true, person = true, family = true, user }) => (
  <>
    {call ? <CallIcon user={user} /> : null}
    {person ? <PersonModal user={user} /> : null}
    {family ? <FamilyModal family_no={user.family_no} /> : null}
  </>
);

export default ActionButtons;
