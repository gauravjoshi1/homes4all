/* eslint-disable jsx-a11y/img-redundant-alt */
import {React,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const PropertyList = ({ property, loading }) => {
  const propertyArr = Array.from(property);
  const navigate = useNavigate();


  const handleClick = (propertyItem) =>
    navigate("/property", {
      state: {
        propertyItem: propertyItem,
      },
    });

    const favorite = async (propertyItem) =>{
     
      const token = JSON.parse(sessionStorage.getItem('token'));
      const userID=token._id;
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
   
   
  




  if (loading) {
    return <h2>Loading .... </h2>;
  }

  return (
    <>
      {propertyArr.map((propertyItem) => {
       
        const imageSource =
          "../../../server/images/" + JSON.stringify(propertyItem.image).slice(1, -1);
        
        return (
          <div
            key={JSON.stringify(propertyItem.id)}
            className="card col-md-2 card-styling style-photos m-2 mx-4 p-1"
          >
            <img
              className="card-img-top p-3"
              src= {"/"+propertyItem.image}
              alt="An image of a building in Seattle"
            />
            <div className="card-body">
              <p className="card-text text-center">
                {JSON.stringify(propertyItem.location).slice(1, -1)}
              </p>
              <div
                className="btn-toolbar"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group me-2 mx-3"
                  role="group"
                  aria-label="view and search buttons"
                >
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => handleClick(propertyItem)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                    </svg>
                    View
                  </button>
                </div>
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="view and search buttons"
                >
                  <button type="button" disabled={propertyItem.disable} onClick={() => favorite(propertyItem)} className="btn btn-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      ></path>
                    </svg>
                    Favorite
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
