import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../header/header.css";
import { FaTimes, FaBars, FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../redux/slice/authSlice";
import ShowOnLogin from "../hiddenLinks/hiddenLink";
import { ShowOnLogOut } from "../hiddenLinks/hiddenLink";
import AdminOnlyRoute, {
  AdminOnlyLink,
} from "../adminOnlyRoute/AdminOnlyRoute";
const activeLink = ({ isActive }) => (isActive ? "active" : "");
const Header = () => {
  const dispatch = useDispatch();
  const navRef = useRef();
  const [displayName, setdisplayName] = useState("");
  const navigate = useNavigate();

  // monitor active user

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const username = user.email.substring(0, user.email.indexOf("@"));
          const userName = username.charAt(0).toUpperCase() + username.slice(1);
          setdisplayName(userName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  });
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
  );

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
        <AdminOnlyLink>
        <Link to='/admin/home'>
        <button>Admin</button>
        </Link>
        
        </AdminOnlyLink>
        <NavLink to="/" className={activeLink} onClick={hideNavbar}>
          Home
        </NavLink>
        <NavLink to="/contact" className={activeLink} onClick={hideNavbar}>
          Contact
        </NavLink>
        <ShowOnLogOut>
          <NavLink to="/login" className={activeLink} onClick={hideNavbar}>
            Login
          </NavLink>
        </ShowOnLogOut>
        <ShowOnLogin>
          <a href="#" style={{ color: "orangered" }}>
            <FaUserCircle size={16} />
            Hi, {displayName}
          </a>
        </ShowOnLogin>
        <ShowOnLogin>
          <NavLink
            to="/order-history"
            className={activeLink}
            onClick={hideNavbar}
          >
            My Orders
          </NavLink>
        </ShowOnLogin>
        <ShowOnLogin>
          <NavLink to="/login" onClick={logoutHandler}>
            Logout
          </NavLink>
        </ShowOnLogin>
        <ShowOnLogin>{cart}</ShowOnLogin>

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
