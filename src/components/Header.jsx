import React from "react";
import "../App.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({ user, handleSignOut, showSideBar, closeSideBar }) => {
  return (
    <header className="header">
      <RxHamburgerMenu className="burger-menu" onMouseEnter={showSideBar} />
      <div className="title-container">
        <h1>{user && user.split("@")[0]}'s Task Managment </h1>
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
