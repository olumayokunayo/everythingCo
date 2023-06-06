import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import "../header/header.css";
import { FaTimes, FaBars, FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

const activeLink = ({ isActive }) => (isActive ? "active" : "");
const Header = () => {
  const navRef = useRef();
  const [displayName, setdisplayName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user.displayName === null) {
        const username = user.email.slice(0, -10);
        const userName = username.charAt(0).toUpperCase() + username.slice(1);
        // setdisplayName(userName)
      }
      if (user) {
        const uid = user.uid;
        console.log(user.displayName);
        setdisplayName(user.displayName);
      } else {
        setdisplayName("");
      }
    });
  }, []);
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const hideNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  const logo = (
    <NavLink to="/" className="logo">
    <h1>
      {" "}
      everything<span>Co.</span>
    </h1>
  </NavLink>
  )

  const cart = (
    <div className="span">
      <span className="cartName">Cart</span>
      <span>
        {" "}
        <AiOutlineShoppingCart size={40} color="orangered" />
      </span>{" "}
      <span className="number">0</span>
    </div>
  );
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successful");
        navigate("/login");
        // Sign-out successful.
      })
      .catch((error) => {
        toast.error(error.message);
        // An error happened.
      });
  };
  return (
    <header>
      <ToastContainer />
      {logo}
      <nav ref={navRef}>
        <NavLink to="/" className={activeLink} onClick={hideNavbar}>
          Home
        </NavLink>
        <NavLink to="/contact" className={activeLink} onClick={hideNavbar}>
          Contact
        </NavLink>
        <NavLink to="/login" className={activeLink} onClick={hideNavbar}>
          Login
        </NavLink>
        <a href="#">
          <FaUserCircle size={16} />
          Hi, {displayName}
        </a>
        <NavLink to="/register" className={activeLink} onClick={hideNavbar}>
          Register
        </NavLink>
        <NavLink
          to="/order-history"
          className={activeLink}
          onClick={hideNavbar}
        >
          My Orders
        </NavLink>
        <NavLink to="/" onClick={logoutHandler}>
          Logout
        </NavLink>
        {cart}

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn cart-div" onClick={showNavbar}>
        {cart}
        <FaBars />
      </button>
    </header>
  );
};

export default Header;
