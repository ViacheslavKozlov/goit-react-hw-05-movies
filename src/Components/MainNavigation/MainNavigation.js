import React from "react";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
    </header>
  );
};

export default MainNavigation;
