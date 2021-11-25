import React, { useState } from "react";
import "./login.css";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
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
  const [formEr = { passwordLength: "", passwordContains:"" }, setFormEr] = useState();
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
    <div >
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

      <div className="login-wrapper">
      <img class="img-fluid w-50 image-wrapper" src="\Homes4all-logos_transparent.png"/>
     

   

        <h1>Please Log In</h1>  
        <form className="w-50" onSubmit={handleSubmit}>
          
          <div className="form-control">
          <label for="username">Username</label>
            <input  className="form-control" id="username"
              type="text"
              onChange={(e) => setLoginUserName(e.target.value)}
            />
         
         
          <label for="passowrd">Password</label>
            
            <input
              type="password" className="form-control" id="password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
        
         
          <div>
          <button type="submit" class="btn btn-primary mt-3 ">Sign in</button>
          </div>
          </div>
        </form>
     
     

     
      

   
        <h1>Register</h1>
        <form className="w-50" onSubmit={handleRegisterSubmit}>
          
          <div className="form-control">
          <label for="name">Name</label>
           
            <input className="form-control" id="name"
              type="text"
              onChange={(e) => setRegisterName(e.target.value)}
            />
        
        <label for="email">Email</label>
           
            <input
              type="email" className="form-control" id="email"
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
      
      <label for="password">Password</label>
           
            <input className="form-control" id="password" type="password" onChange={handleLoginPassword} />
          
          <div className="panel panel-default ">
            <FormErrors formErrors={formEr} />
          </div>

          <button disabled={(  (formEr.passwordLength&& formEr.passwordLength.length > 0 )|| (formEr.passwordContains &&formEr.passwordContains.length>0)) ? true : false} type="submit" class="btn btn-success mt-3 ">Register</button>
         </div> 
        
        </form>
        </div>
       
        
      </div>
   
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
