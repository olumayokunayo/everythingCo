import { Fragment, React, useState } from "react";
import registerImg from "../../../assets/register.png";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./auth.module.css";
import Card from "../../card/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../loader/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        setIsLoading(false);

        toast.success("Registration Successful");
        navigate('/login')
        // ...
      })
      .catch((error) => {
        toast.error('Something went wrong!');
        setIsLoading(false);
        // ..
      });
  };
  return (
    <Fragment>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className={classes.loginDiv}>
        <Card>
          <div className={classes.formDiv}>
            <h1>Register</h1>
            <form className={classes.form} onSubmit={registerHandler}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className={classes["l-button"]}>Register</button>

              <span className={classes.link}>
                <p>
                  Already have an account? <NavLink to="/login">Login</NavLink>
                </p>
              </span>
            </form>
          </div>
        </Card>
        <div className={classes.imageDiv}>
          <img src={registerImg} width={400} alt="" />
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
