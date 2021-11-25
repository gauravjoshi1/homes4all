
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HouseIcon from '@material-ui/icons/House';




const logout=()=> {
  sessionStorage.clear();
  window.location.href = '/';
}


const Navbar = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const userName = token.name;
  const role = token.role;



 
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <NavLink className="navbar-brand text-white" to="/">
        <HouseIcon/> Homes4All
        </NavLink>
        

       <span className="text-white">Welcome, {userName}</span>
       
       
 
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-2">
         
        
            
            { role=='Admin'&&<li className="ml-3 nav-item ">
              <NavLink className="nav-link" to="/addProp">
                Add a new property
              </NavLink>
              </li> }
              { role=='User'&&<li className=" ml-3 nav-item">
              <NavLink className="nav-link" to="/cart">
                <ShoppingCartIcon/>  Cart
              </NavLink>
              </li> }

              <li className="nav-item ml-3">
              <a className="nav-link" href="#" onClick={logout}>Logout</a>
                </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
 
export default Navbar;