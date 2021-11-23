/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState, useNavigate } from "react-router-dom";

const PropertyList = (props) => {
  const navigate = useNavigate();

  const handleClick = () =>
    navigate("/property", {
      state: {
        propertyName: props.propertyName,
        imageName: props.imageName,
        description: props.description,
        type: props.type,
        bedrooms: props.bedrooms,
        bathrooms: props.bathrooms,
        yearBuilt: props.yearBuilt,
        pricePerSqft: props.pricePerSqft,
        area: props.area,
        location: props.location,
      },
    });

  return (
    <div className="card col-sm card-styling style-photos m-2 p-1">
      <img
        className="card-img-top p-3"
        src={props.imageName}
        alt="An image of a building in Seattle"
      />
      <div className="card-body">
        <p className="card-text text-center">{props.propertyName}</p>
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
            <button type="button" className="btn btn-info" onClick={handleClick}>
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
            <button type="button" className="btn btn-danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
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
};

export default PropertyList;
