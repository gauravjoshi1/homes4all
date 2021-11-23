import { Route, Routes } from "react-router-dom";
import React, { useState } from 'react';

import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import HomeComponent from "./components/home_component";
import AddPropertyComponent from "./components/addproperty_component";
import Login from "./components/login"
import useToken from './useToken';

const App = () => { 
  const { token, setToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomeComponent />}>

        </Route>
 
        <Route path="/edit/:id" component={Edit} />
        <Route path="/create" element={<Create />}/>
        <Route path="/addProp" element={<AddPropertyComponent/>}/>

        
      </Routes>
    </div>
  );
};

export default App;