import React, { useEffect } from "react";
import { connect } from "react-redux";

import BaseTable from "./BaseTable";

import { Container } from "reactstrap";

import ActionButtons from "./ActionButtons";
import { getUsers } from "../../redux/userRedux/userActions";

const UsersTable = ({ getUsers, users }) => {
  useEffect(() => {
    if (users.length === 0) getUsers();
    // eslint-disable-next-line
  }, []);
  const onlyFilterOptions = {
    filter: true,
    sort: false,
    display: false,
  };
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
    { name: "gender", label: "Gender", options: onlyFilterOptions },
    { name: "surname", label: "Surname", options: onlyFilterOptions },
    {
      name: "relationship_with_family_head",
      label: "Family Status",
      options: onlyFilterOptions,
    },
    {
      name: "marital_status",
      label: "Marital Status",
      options: onlyFilterOptions,
    },
    {
      name: "blood_group",
      label: "Blood Group",
      options: onlyFilterOptions,
    },
    {
      name: "native_place",
      label: "Native Place",
      options: onlyFilterOptions,
    },
    {
      name: "residential_address_state",
      label: "State",
      options: onlyFilterOptions,
    },
    {
      name: "residential_address_city",
      label: "City",
      options: onlyFilterOptions,
    },
  ];
  const data = users.map(user => ({
    ...user,
    actions: <ActionButtons user={user} />,
  }));
  return (
    <Container>
      <BaseTable columns={columns} data={data} options={{ filter: true }} />
    </Container>
  );
};

const mapStateToProps = state => ({
  users: state.user.users,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { getUsers })(UsersTable);
