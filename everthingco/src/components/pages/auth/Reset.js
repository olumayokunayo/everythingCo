import { React, useState } from "react";
import classes from "./auth.module.css";
import { NavLink } from "react-router-dom";
import Card from "../../card/Card";
const Reset = () => {
  const [email, setEmail] = useState("");

  const resetSubmitHandler = () => {};
  return (
    <Card>
      <div className={classes.resetDiv}>
      <div>
        <h1>Reset</h1>
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
        </div>
      </div>
    </Card>
  );
};

export default Reset;
