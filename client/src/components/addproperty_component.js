import React, { Component, useRef, useState } from "react";
import axios from "axios";
import "./addproperty.css";

async function saveProperty(formData) {
  await axios({
    method: "post",
    url: "http://localhost:5000/addProperty",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

export default class addproperty_component extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);

    this.state = { typeData: [] };
    this.data = {
      type:"",
      bedrooms: "",
      bathrooms: "",
      location: "",
      area: "",
      pricePerSqft: "",
      description: "",
    };
    this.formData = new FormData();
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/getTypes/")
      .then((response) => {
        this.setState({ typeData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.formData.append("type", this.data.type);
    this.formData.append("bedrooms", this.data.bedrooms);
    this.formData.append("bathrooms", this.data.bathrooms);
    this.formData.append("location", this.data.location);
    this.formData.append("area", this.data.area);
    this.formData.append("pricePerSqft", this.data.pricePerSqft);
    this.formData.append("description", this.data.description);

    const result = await saveProperty(this.formData);
    //     if(!result.error){

    //      window.location.href = '/';

    //  }
    window.location.href = "/";
  };

  handlePhoto = async (e) => {
    console.log(e);
    this.formData.append("photo", e.target.files[0]);
  };

  render() {
    return (
      <div className="container mt-3 ">
        <h3 className="mb-3">Add a new Property</h3>
        <div className="card mt-2 mb-2" style={{ width: "30rem" }}>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label for="type" class="form-label">
                  Property Type
                </label>
                <select class="form-select" onChange={(event) =>
                    (this.data.type = event.target.value)
                  } >
                  {this.state.typeData.map((e, key) => {
                    return (
                      <option key={key} value={e.value}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="mb-3">
                <label for="location" class="form-label">
                  Location
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="location"
                  placeholder="Enter your location..."
                  onChange={(event) =>
                    (this.data.location = event.target.value)
                  }
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="Enter your description..."
                  onChange={(event) =>
                    (this.data.description = event.target.value)
                  }
                />
              </div>
              <div class="mb-3">
                <label for="bedroom" class="form-label">
                  Bedrooms
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="bedroom"
                  placeholder="Enter number of bedrooms..."
                  onChange={(event) =>
                    (this.data.bedrooms = event.target.value)
                  }
                />
              </div>
              <div class="mb-3">
                <label for="bathroom" class="form-label">
                  Bathrooms
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="bathroom"
                  placeholder="Enter number of bathroom..."
                  onChange={(event) =>
                    (this.data.bathrooms = event.target.value)
                  }
                />
              </div>
              <div class="mb-3">
                <label for="area" class="form-label">
                  Area
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="area"
                  placeholder="Enter your area in sqft..."
                  onChange={(event) => (this.data.area = event.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">
                  Price
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  placeholder="Enter your price..."
                  onChange={(event) =>
                    (this.data.pricePerSqft = event.target.value)
                  }
                />
              </div>
              <div class="mb-4">
                <label for="photo" class="form-label">
                  Default file input example
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={this.handlePhoto}
                />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
