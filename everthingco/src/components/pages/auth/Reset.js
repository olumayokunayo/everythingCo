import { React, useState } from "react";
import classes from "./auth.module.css";
import resetImg from "../../../assets/forgot.png";
import { NavLink } from "react-router-dom";
import Card from "../../card/Card";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";

const Reset = () => {
  const [email, setEmail] = useState("");

  const resetSubmitHandler = (e) => {
    e.preventDefault();
    console.log(email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Reset link has been sent to your email.");
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        toast.error("Email is not registered!");
        // ..
      });
  };
  return (
   
      <div className={classes.resetDiv}>
        <ToastContainer />
        <div>
          <img src={resetImg} alt="" width={400}/>
        </div>
        <div>
        <Card>
          <h1>Reset Password</h1>
          <form className={classes.form} onSubmit={resetSubmitHandler}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className={classes["r-button"]}>Reset</button>

            <div className={classes.loginRegister}>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          </form>
          </Card>
        </div>
      </div>
    
  );
};

export default Reset;
