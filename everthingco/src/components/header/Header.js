import React from "react";
import { useRef } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "../header/header.css";
import { FaTimes, FaBars } from "react-icons/fa";
const activeLink = ({ isActive }) => (isActive ? "active" : "");
const Header = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const hideNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  const cart = (
    <div className="span">
      <span className="cartName">Cart</span>
      <span>
        {" "}
        <AiOutlineShoppingCart size={40} color="orangered"/>
      </span>{" "}
      <span className="number">0</span>
    </div>
  );
  return (
    <header>
      <NavLink to="/" className="logo">
        <h1>
          {" "}
          everything<span>Co.</span>
        </h1>
      </NavLink>
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
