import { Fragment, React, useState } from "react";
import loginImg from "../../../assets/login.png";
import classes from "../auth/auth.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../card/Card";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../loader/Loader";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successful");
        navigate("/");
        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();

  const googleLoginHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        toast.success("Login Successful");
        navigate('/')
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error(error.message);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });

  };
  return (
    <Fragment>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className={classes.loginDiv}>
        <div className={classes.imageDiv}>
          <img src={loginImg} width={400} alt="" />
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
              <button className={classes.button} onClick={googleLoginHandler}>
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
    </Fragment>
  );
};

export default Login;
