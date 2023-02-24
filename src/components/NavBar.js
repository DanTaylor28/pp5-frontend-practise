import React from "react";
import styles from "../styles/NavBar.module.css";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import UseClickOutsideToggle from "../hooks/UseClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = UseClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (error) {
      console.log(error);
    }
  };

  const createIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.ActiveLink}
      to="/create/post"
    >
      Create
      <i className="fa-regular fa-square-plus"></i>
    </NavLink>
  );

  const signedInLinks = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.ActiveLink}
        to="/pinboard"
      >
        My Pinboard
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.ActiveLink}
        to="/discover"
      >
        Discover
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        Sign Out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        Profile
        <img src={currentUser?.profile_image} alt="" />
      </NavLink>
    </>
  );
  const signedOutLinks = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.ActiveLink}
        to="/signin"
      >
        Sign In
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.ActiveLink}
        to="/create/account"
      >
        Create Account
      </NavLink>
    </>
  );

  return (
    <Navbar
      className={styles.NavBar}
      bg="dark"
      variant="dark"
      expand="md"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>Logo here</Navbar.Brand>
        </NavLink>
        {currentUser && createIcon}
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          ref={ref}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.ActiveLink}
              to="/"
            >
              Home
            </NavLink>
            {currentUser ? signedInLinks : signedOutLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
