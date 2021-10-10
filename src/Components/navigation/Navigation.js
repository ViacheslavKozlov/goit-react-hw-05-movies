import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

const MainNavigation = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <NavLink exact to="/" className={style.link} activeClassName={style.activeLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={style.link} activeClassName={style.activeLink}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default MainNavigation;
