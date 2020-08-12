import React, { useEffect } from "react";
import { connect } from "react-redux";

import MUIDataTable from "mui-datatables";
import { Button, Container } from "reactstrap";
import { Call } from "@material-ui/icons";

import PersonModal from "./Modal/PersonModal";
import FamilyModal from "./Modal/FamilyModal";

import { getUsers } from "../redux/userRedux/userActions";
import isSubSequence from "../utils/isSubSequence";

const Table = ({ getUsers, users }) => {
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  const getCallIcon = ({ mobile_1, mobile_2 }) => {
    let mobile;
    let disabled = false;

    if (mobile_1 && mobile_2) mobile = mobile_1;
    else if (mobile_1) mobile = mobile_1;
    else if (mobile_2) mobile = mobile_2;
    else disabled = true;

    return (
      <Button
        outline
        disabled={disabled}
        color="primary"
        aria-label="Call person"
        onClick={() => (document.location.href = `tel:${mobile}`)}
        style={{ margin: 5 }}
      >
        <Call />
      </Button>
    );
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
  ];
  const options = {
    download: false,
    print: false,
    filter: false,
    selectableRows: "none",
    responsive: "standard",
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 20, 50, 100],
    customSearch: (query, curr) => isSubSequence(query, curr[0]),
  };
  const data = users.map(user => ({
    ...user,
    actions: (
      <>
        {getCallIcon(user)}
        <PersonModal user={user} />
        <FamilyModal family_no={user.family_no} />
      </>
    ),
  }));
  return (
    <Container>
      <MUIDataTable columns={columns} options={options} data={data} />
    </Container>
  );
};

const mapStateToProps = ({ user }) => ({
  users: user.users,
  loading: user.loading,
  isError: user.isError,
  error: user.error,
});

export default connect(mapStateToProps, { getUsers })(Table);
