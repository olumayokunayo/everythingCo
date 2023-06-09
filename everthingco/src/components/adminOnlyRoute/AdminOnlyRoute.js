import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../redux/slice/authSlice";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "test@gmail.com") {
    return children;
  } else {
    return (
      <section>
        <div>
          <h2>Permission Denied</h2>
          <p>This page can only be accessed by an Admin user.</p>
          <Link to='/'>
            <button>
              <FaArrowLeft />
              Back To Home
            </button>
          </Link>
        </div>
      </section>
    );
  }
};
export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "test@gmail.com") {
    return children;
  } else {
    return null;
  }
};

export default AdminOnlyRoute;
