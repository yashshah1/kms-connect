import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component, loggedIn } = props;
  return <>{loggedIn ? <Component /> : <Redirect to="/" />}</>;
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
