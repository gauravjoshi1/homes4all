import React, { useState } from "react";
import "./login.css";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";
import FormErrors from "./formErrors";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function register(registername, registeremail, registerpassword) {
  return fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      registername,
      registeremail,
      registerpassword,
    }),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [loginusername, setLoginUserName] = useState();
  const [loginpassword, setLoginPassword] = useState();
  const [open, setOpen] = useState();

  const [registername, setRegisterName] = useState();
  const [registeremail, setRegisterEmail] = useState();
  const [registerpassword, setRegisterPassword] = useState();
  const [er, setEr] = useState();
  const [formEr = { passwordLength: "", passwordContains: "" }, setFormEr] =
    useState();
  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const result = await register(
      registername,
      registeremail,
      registerpassword
    );
    if (!result.error) setToken(result);
    else {
      setEr(result.error);
      console.log(er);
      setOpen(true);
    }
  };

  const handleLoginPassword = async (e) => {
    let password = e.target.value;
    setRegisterPassword(password);
    let formErrors = { Password: "" };

    if (e.target.value.length <= 6)
      formErrors.passwordLength = "Password length > than 6.";
    if (!/\d/.test(password))
      formErrors.passwordContains = " Add atleast 1 digit ";

    setFormEr(formErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      loginusername,
      loginpassword,
    });

    if (token.error) {
      setEr(token.error);

      setOpen(true);
    } else setToken(token);
  };

  

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        open={open}
        autoHideDuration={5000}
        message={er}
        onClose={handleToClose}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleToClose}
            >
              X
            </IconButton>
          </React.Fragment>
        }
      />
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <NavLink className="navbar-brand text-white me-4 fw" to="/">
            <i class="fas fa-house-damage me-1"></i>
            Homes4All
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              class="d-flex navbar-nav ms-auto me-2"
              onSubmit={handleSubmit}
            >
              <input
                class="form-control me-2"
                id="username"
                type="text"
                placeholder="User Name..."
                aria-label="username"
                onChange={(e) => setLoginUserName(e.target.value)}
              />
              <input
                class="form-control me-2"
                type="password"
                placeholder="Password..."
                aria-label="Password"
                id="password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button
                class="btn btn-outline-light text-white me-2"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="maincontainer">
        <div class="container-fluid">
          <div class="row no-gutter">
            <div class="col-md-6 d-none d-md-flex bg-image"></div>
            <div class="col-md-6 bg-light">
              <div class="login d-flex align-items-center py-5">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-10 col-xl-7 mx-auto">
                      <h4 className="text-dark mb-4">Dont have an account?</h4>
                      <h3 class="display-5 mb-5 text-primary">Register</h3>
                      <form onSubmit={handleRegisterSubmit}>
                        <div class="mb-5">
                          <input
                            id="name"
                            type="text"
                            placeholder="User Name..."
                            required=""
                            autofocus=""
                            class="form-control border-0 shadow-sm px-4"
                            onChange={(e) => setRegisterName(e.target.value)}
                          />
                        </div>
                        <div class="mb-5">
                          <input
                            type="email"
                            id="email"
                            placeholder="Email Address..."
                            required=""
                            autofocus=""
                            class="form-control border-0 shadow-sm px-4"
                            onChange={(e) => setRegisterEmail(e.target.value)}
                          />
                        </div>
                        <div class="mb-5">
                          <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password..."
                            required=""
                            class="form-control border-0 shadow-sm px-4 text-primary"
                            onChange={handleLoginPassword}
                          />
                        </div>
                        <div className="panel panel-default ">
                          <FormErrors formErrors={formEr} />
                        </div>
                        <div class="d-grid gap-2 mb-4">
                          <button
                            type="submit"
                            class="btn btn-primary btn-block text-uppercase mb-2shadow-sm"
                          >
                            Sign Up
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
