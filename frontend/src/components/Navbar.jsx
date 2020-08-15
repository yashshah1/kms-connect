import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, NavLink } from "reactstrap";
import {
  Home as HomeIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";

import { logOut } from "../redux/authRedux/authActions";

const NavBar = ({ loggedIn, logOut }) => (
  <div>
    <Navbar light>
      <NavLink tag={Link} to="/" style={{ textDecoration: "none" }}>
        <span className="navbar-text">
          <HomeIcon />
        </span>
      </NavLink>
      {loggedIn && (
        <NavLink
          onClick={logOut}
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          <span className="navbar-text">
            <ExitToAppIcon />
          </span>
        </NavLink>
      )}
    </Navbar>
  </div>
);

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, { logOut })(NavBar);
