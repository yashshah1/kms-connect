import React from "react";
import { Route, Switch } from "react-router-dom";
import UsersTable from "./components/Table/UsersTable";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import ViewFamily from "./components/ViewFamily";
import BirthdayTable from "./components/Table/BirthdayTable";
import NavBar from "./components/Navbar";
import NotYetBuilt from "./components/NotYetBuilt";
import ChangePassword from "./components/ChangePassword";
import "./App.css";

function App() {
  console.log("You probably shouldn't be here");
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route
          exact
          path="/home"
          render={(props) => <ProtectedRoute {...props} Component={Home} />}
        />
        <Route
          exact
          path="/members"
          render={(props) => <ProtectedRoute {...props} Component={UsersTable} />}
        />
        {/* <Route exact path="/members" component={UsersTable} /> */}

        <Route
          exact
          path="/birthdays"
          render={(props) => <ProtectedRoute {...props} Component={BirthdayTable} />}
        />
        <Route
          exact
          path="/family"
          render={(props) => <ProtectedRoute {...props} Component={ViewFamily} />}
        />
        <Route
          exact
          path="/changepassword"
          render={(props) => (
            <ProtectedRoute {...props} Component={ChangePassword} />
          )}
        />

        <Route exact path="/workinprogress" component={NotYetBuilt} />
      </Switch>
    </>
  );
}

export default App;
