import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";

import { getUsers } from "../../redux/userRedux/userActions";
import BaseTable from "./BaseTable";
import ActionButtons from "./ActionButtons";
import Moment from "moment";

const BirthdayTable = ({ getUsers, count, birthdays }) => {
  useEffect(() => {
    if (count === 0) getUsers();
    // eslint-disable-next-line
  }, []);
  const columns = [
    {
      name: "fullname",
      label: "Name",
      options: {
        filter: false,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];
  const data = birthdays.map((user) => ({
    ...user,
    actions: <ActionButtons user={user} />,
  }));
  return (
    <Container>
      <BaseTable columns={columns} data={data} />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  count: Object.values(state.user.users).length,
  birthdays: Object.values(state.user.users).filter(
    (user) => Moment().format("DDMM") === Moment(user.date_of_birth).format("DDMM")
  ),
});

export default connect(mapStateToProps, { getUsers })(BirthdayTable);
