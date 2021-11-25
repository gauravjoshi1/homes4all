/* eslint-disable jsx-a11y/img-redundant-alt */
import {React,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const PropertyList = ({ property, loading,isCart }) => {
  const token = JSON.parse(sessionStorage.getItem('token'));
      const userID=token._id;
  const propertyArr = Array.from(property);
  const navigate = useNavigate();


  const handleClick = (propertyItem) =>
    navigate("/property", {
      state: {
        propertyItem: propertyItem,
      },
    });

    const favorite = async (propertyItem) =>{
     
   
       const body ={userid:userID, propertyid:propertyItem._id}

      await axios({
        method: "post",
        url: "http://localhost:5000/addToCart",
        data: body,
        headers: { "Content-Type": "application/json",},
      })
        .then(function (response) {
          window.location.href = '/';
       
        })
        .catch(function (response) {
          //handle error
          
        });


    }


    const remove = async (propertyItem) =>{
     
     
       const body ={userid:userID, propertyid:propertyItem._id}

      await axios({
        method: "post",
        url: "http://localhost:5000/removeFromCart",
        data: body,
        headers: { "Content-Type": "application/json",},
      })
        .then(function (response) {
          window.location.href = '/cart';
       
        })
        .catch(function (response) {
          //handle error
          
        });


    }
   
   
  




  if (loading) {
    return <h2>Loading .... </h2>;
  }

  return (
    <>
      {propertyArr.map((propertyItem) => {
        return (
          <div
            key={JSON.stringify(propertyItem.id)}
            className="card col-md-2 card-styling style-photos m-2 mx-4 p-1"
          >
            <img
              className="card-img-top p-3"
              src= {"/"+propertyItem.image} onError={(e)=>{e.target.onerror = null; e.target.src="/default.png"}}
              alt="Property Image"
            />
            <div className="card-body">
              <p className="card-text text-center">
                {JSON.stringify(propertyItem.location).slice(1, -1)}
              </p>

              <div class="btn-group" role="group" aria-label="options">
  <button type="button" onClick={() => handleClick(propertyItem)} class="btn btn-primary">View</button>
  <button type="button" hidden={isCart} disabled={propertyItem.disable} onClick={() => favorite(propertyItem)} class="btn btn-danger">Favorite</button>
  <button type="button" hidden={!isCart} onClick={() => remove(propertyItem)} class="btn btn-danger">Remove</button>
  
</div>

              
                </div>
              </div>
            
        );
      })}
    </>
  );
};

export default PropertyList;
