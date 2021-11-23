import React, { useState }  from 'react';
import './login.css';
import PropTypes from 'prop-types';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import FormErrors from "./formErrors"




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
  const [open, setOpen] =useState();

  const [registername, setRegisterName] = useState();
  const [registeremail, setRegisterEmail] = useState();
  const [registerpassword, setRegisterPassword] = useState();
  const [er,setEr] = useState();
  const[formEr={Password:""}, setFormEr]= useState();
  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };

const handleRegisterSubmit = async e => {
    e.preventDefault();
    const result = await register( registername, registeremail, registerpassword);
    if(!result.error)
    setToken(result);
    else
    { setEr(result.error);
      console.log(er);
      setOpen(true);}
  }

const  handleLoginPassword = async e=>{
  let password=e.target.value;
  setRegisterPassword(password);
 let formErrors={Password:""};

 if(e.target.value.length<=6)
 formErrors.Password+="Password length must be greater than 6.";
 if(!(/\d/.test(password)))
  formErrors.Password+=" Password should have atleast a digit ";

  
  setFormEr(formErrors);


  }

  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      loginusername,
      loginpassword,
    });
    console.log(token);
    setToken(token);

  }
    return(
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
       
    

    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username(email)</p>
          <input type="text" onChange={e => setLoginUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setLoginPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>   
    </div>

    <div className="register-wrapper">
    <h1>Register</h1>
    <form onSubmit={handleRegisterSubmit}>
        <label>
          <p>Name</p>
          <input type="text" onChange={e => setRegisterName(e.target.value)} />
        </label>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => setRegisterEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={handleLoginPassword} />
        </label>
        <div className="panel panel-default">
 <FormErrors formErrors={formEr} />
</div> 
        <button type="submit" disabled={formEr.Password.length>0?true:false}>Submit</button>
        </form>
     
    </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
