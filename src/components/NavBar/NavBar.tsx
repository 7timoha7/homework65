import React from 'react';
import {NavLink} from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navBar">
      <NavLink to={"/pages/home"}>Home</NavLink>
      <NavLink to={"/pages/about"}>About</NavLink>
      <NavLink to={"/pages/contacts"}>Contacts</NavLink>
      <NavLink to={"/pages/division"}>Division</NavLink>
      <NavLink to={"/pages/admin"}>Admin</NavLink>
    </div>
  );
};

export default NavBar;