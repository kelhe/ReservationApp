import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import Header from "./Header";
import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <Header/>
      </div>
        <div className="col">
          <Routes />
        </div>
        <div className="row side-bar">
          <Menu />
        </div>
    </div>
  );
}

export default Layout;
