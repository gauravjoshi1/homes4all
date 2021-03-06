/* eslint-disable jsx-a11y/img-redundant-alt */
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PropertyList = ({ property, loading, isCart }) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const userID = token._id;
  const propertyArr = Array.from(property);
  const navigate = useNavigate();

  const handleClick = (propertyItem) =>
    navigate("/property", {
      state: {
        propertyItem: propertyItem,
      },
    });

  const favorite = async (propertyItem) => {
    const body = { userid: userID, propertyid: propertyItem._id };

    await axios({
      method: "post",
      url: "http://localhost:5000/addToCart",
      data: body,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        window.location.href = "/";
      })
      .catch(function (response) {
        //handle error
      });
  };

  const remove = async (propertyItem) => {
    const body = { userid: userID, propertyid: propertyItem._id };

    await axios({
      method: "post",
      url: "http://localhost:5000/Cart",
      data: body,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        window.location.href = "/cart";
      })
      .catch(function (response) {
        //handle error
      });
  };

  if (loading) {
    return <h2>Loading .... </h2>;
  }

  return (
    <>
      {propertyArr.map((propertyItem) => { 
        return ( 
          <div className="col-sm col-md-4">
            <div
              className="card mb-4"
              key={JSON.stringify(propertyItem.id)}
              style={{ width: "20rem", height: "30rem" }}
            > 
              <div className="card-header fw-bold text-center">
                <i className="fas fa-map-marker-alt me-2"></i>
                {JSON.stringify(propertyItem.location).slice(1, -1)}
              </div>
              <img
                className="card-img-top"
                src={"/" + propertyItem.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default.png";
                }}
                alt="Property Image"
              />
              <div className="card-body text-center">
             
                 
               
                <p className="card-text">
                {propertyItem.type} ${Number(propertyItem.pricePerSqft) * Number(propertyItem.area)}
                </p>
              </div>
              <div className="row justify-content-center m-2">
                <div className="btn-group" role="group" aria-label="options">
                  <button
                    type="button"
                    onClick={() => handleClick(propertyItem)}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    hidden={isCart|| propertyItem.disable}
                    
                    onClick={() => favorite(propertyItem)}
                    className="btn btn-sm btn-danger ms-2"
                    style={{ display: (token.role==='User' ? 'block' : 'none') }}
                  >
                    Favorite
                  </button>
                  <button
                    type="button"
                    hidden={isCart|| !propertyItem.disable}
                    
                    disabled={true}
                    className="btn btn-sm btn-success ms-2"
                    style={{ display: (token.role==='User' ? 'block' : 'none') }}
                  >
                    In cart
                  </button>
                  <button
                    type="button"
                    hidden={!isCart}
                    onClick={() => remove(propertyItem)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PropertyList;
