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
  const baseFilterOptions = {
    filter: true,
    sort: false,
    display: false,
    filterType: "dropdown",
  };
  const multiFilterOptions = {
    ...baseFilterOptions,
    filterType: "multiselect",
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
        download: false,
      },
    },
    { name: "gender", label: "Gender", options: baseFilterOptions },
    { name: "surname", label: "Surname", options: multiFilterOptions },
    {
      name: "relationship_with_family_head",
      label: "Family Status",
      options: multiFilterOptions,
    },
    {
      name: "marital_status",
      label: "Marital Status",
      options: multiFilterOptions,
    },
    {
      name: "blood_group",
      label: "Blood Group",
      options: multiFilterOptions,
    },
    {
      name: "native_place",
      label: "Native Place",
      options: multiFilterOptions,
    },
    {
      name: "residential_address_city",
      label: "City",
      options: multiFilterOptions,
    },
    {
      name: "residential_address_state",
      label: "State",
      options: multiFilterOptions,
    },
  ];
  const data = Object.values(users).map((user) => ({
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
  users: state.user.users,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { getUsers })(UsersTable);
