
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";



const logout=()=> {
  sessionStorage.clear();
  window.location.href = '/';
}


const Navbar = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const userName = token.name;



 
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          Homes4All
        </NavLink>
        Welcome,{userName}

        <a href="#" onClick={logout}>Logout</a>
       
 
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Record
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
 
export default Navbar;