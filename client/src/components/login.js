import React, { useState }  from 'react';
import './login.css';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())

  }

   async function register(registername, registeremail, registerpassword)
   {
          
       return fetch('http://localhost:5000/register', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               registername, registeremail, registerpassword
           })
         })
           .then( 
             data => data.json()) 
   } 


 


export default function Login({ setToken }) {
    const [loginusername, setLoginUserName] = useState();
  const [loginpassword, setLoginPassword] = useState();

  const [registername, setRegisterName] = useState();
  const [registeremail, setRegisterEmail] = useState();
  const [registerpassword, setRegisterPassword] = useState();


const handleRegisterSubmit = async e => {
    e.preventDefault();
    const token = await register( registername, registeremail, registerpassword);
    setToken(token);
  }



  
 

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
        loginusername,
        loginpassword
    });
    console.log(token);
  
 // setToken(token);
  }
    return(
      <div>  
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
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
          <input type="text" onChange={e => setRegisterEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setRegisterPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
        </form>
    </div>



    </div>
     


  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
