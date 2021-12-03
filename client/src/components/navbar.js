import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import HouseIcon from '@material-ui/icons/House';



const Navbar = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const userName = token.name;
  const role = token.role;

  const logout = () => {
    console.log("logout");
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <NavLink className="navbar-brand text-dark me-4 fw" to="/">
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
            <ul className="navbar-nav ml-2">
              {role == "Admin" && (
                <li className="ml-3 nav-item ">
                  <NavLink
                    className="nav-link btn btn-sm text-dark text-bold me-2 btn-nav"
                    to="/addProp"
                  >
                    <i class="far fa-plus-square"></i>&nbsp;Add a new property
                  </NavLink>
                </li>
              )}
              {role == "User" && (
                <li className=" ml-3 nav-item">
                  <NavLink
                    className="nav-link btn btn-sm text-dark text-bold me-2 btn-nav"
                    to="/cart"
                  >
                    <i class="fas fa-shopping-cart"></i>&nbsp;Cart
                  </NavLink>
                </li>
              )}
            </ul>
            <ul class="navbar-nav ms-auto">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle fw-bold"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome, {userName}
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  {/* <NavLink className="navbar-brand text-white me-4 fw dropdown-item" to="/log">
                  
                      <i class="px-2 fas fa-sign-out-alt"></i>Logout
                              
            
          </NavLink> */}
                  <li> 
                    <button class="dropdown-item" onClick={(e) => logout()}> 
                      <i class="px-2 fas fa-sign-out-alt"></i>Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
