
import React,{Component, useRef, useState } from 'react';
import axios from 'axios';




async function saveProperty(formData)
 {
   
  return fetch('http://localhost:5000/addProperty', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then( 
      data => data.json()) 
 }

export default class HomeComponent extends Component {
    // This is the constructor that shall store our data retrieved from the database
    constructor(props) {
    super(props);

    this.state = { typeData: [] };
    this.formData={
      bathrooms:"", bedrooms:"", area:"", pricePerSqft:"",description:"", location:""
    }
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
    
    
 
    
     handleSubmit = async e => {
       
        e.preventDefault();
        const result = await saveProperty(this.formData);
        if(!result.error){
          console.log("NO");  
          window.location.href = '/';
        
      }
    
      }





render(){
  return (
    <div>
     <h1>Add a new Property</h1>
      <form onSubmit={this.handleSubmit} >
         
        <label>
          <p>Property type</p>
          <select className="form-select" >
    { this.state.typeData.map((e, key) => {
        return <option key={key} value={e.value}>{e.name}</option>;
    })}
</select>
        </label>
        <label>
          <p>Bedrooms</p>
          <input onChange={ (event) => this.formData.bedrooms=event.target.value } type="number" className="form-control"  />
        </label>
        <label>
          <p>Bathrooms</p>
          <input onChange={ (event) => this.formData.bathrooms=event.target.value } type="number" className="form-control"  />
        </label>
        <label>
          <p>Area(Sqft.)</p>
          <input onChange={ (event) => this.formData.area=event.target.value } type="number" className="form-control" />
        </label>
        <label>
          <p>Price/sqft.</p>
          <input onChange={ (event) => this.formData.pricePerSqft=event.target.value } type="number" className="form-control"  />
        </label>
        <label>
          <p>Description</p>
          <input onChange={ (event) => this.formData.description=event.target.value } type="text" className="form-control" />
        </label>
        <label>
          <p>Location</p>
          <input onChange={ (event) => this.formData.location=event.target.value } type="text" className="form-control"  />
        </label>
        
     
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>   
    </div>

   
  );
};
}

