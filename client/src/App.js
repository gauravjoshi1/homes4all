import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import HomeComponent from "./components/home_component";
import Login from "./components/login";
import useToken from "./useToken";
import NewProperty from "./components/NewProperty";

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
        {/* <Route path="/edit/:id" component={Edit} /> */}
        <Route path="/create" element={<Create />} />
        <Route path="/property" element={<NewProperty />} />
      </Routes>
    </div>
  );
};

export default App;
