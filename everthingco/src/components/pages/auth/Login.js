import { React, useState } from "react";
import loginImg from "../../../assets/login.png";
import classes from "../auth/auth.module.css";
import { NavLink } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../card/Card";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <>
      <div className={classes.loginDiv}>
        <div className={classes.imageDiv}>
          <img src={loginImg} width={400} alt=""/>
        </div>
        <Card>
          <div className={classes.formDiv}>
            <h1>Login</h1>
            <form className={classes.form} onSubmit={formSubmitHandler}>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={classes["l-button"]}>Login</button>
              <div className={classes.link}>
                <NavLink to="/reset">Reset Password</NavLink>
              </div>
              <p>-- or --</p>
              <button className={classes.button}>
                Login with Google <FaGoogle />
              </button>
              <span className={classes.link}>
                <p>
                  Don't have an account?{" "}
                  <NavLink to="/register">Register</NavLink>
                </p>
              </span>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
