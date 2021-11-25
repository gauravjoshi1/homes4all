import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Navbar from "./components/navbar";
import Edit from "./components/edit";

import HomeComponent from "./components/home_component";
import Login from "./components/login";
import useToken from "./useToken";
import NewProperty from "./components/NewProperty";
import AddPropertyComponent from "./components/addproperty_component";
import CartComponent from "./components/cart_component";



const App = () => {
  const { token, setToken } = useToken();
  
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomeComponent />} />
      
        <Route path="/property" element={<NewProperty />} />
        <Route exact path="/cart" element={<CartComponent />}/>
        <Route exact path="/" element={<HomeComponent />}>
        


        </Route>
 
        <Route path="/edit/:id" component={Edit} />
        
        <Route path="/addProp" element={<AddPropertyComponent/>}/>

        
      </Routes>
    </div>
  );
};

export default App;
