
import React,{Component, useRef, useState } from 'react';
import axios from 'axios';





async function saveProperty(formData)
 {   
   

   
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

    this.state = { typeData: [],imageData: new FormData() };
    this.data ={bedrooms:"",bathrooms:"",location:"",area:"",pricePerSqft:"",description:""};
   this.formData= new FormData();
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
      
       this.formData.append('bedrooms',this.data.bedrooms);
       this.formData.append('bathrooms', this.data.bathrooms);
       this.formData.append('location', this.data.location);
       this.formData.append('area',this.data.area);
       this.formData.append('pricePerSqft',this.data.pricePerSqft);
       this.formData.append('description',this.data.description);
        
       
        const result = await saveProperty(this.formData);
    //     if(!result.error){
            
    //      window.location.href = '/';
        
    //  }
    
      }

  

     handlePhoto = async (e) => { console.log(e);
      this.formData.append( 'photo', e.target.files[0]);
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
          <input onChange={ (event) => this.data.bedrooms=event.target.value } type="number" className="form-control"  />
        </label>
        <label>
          <p>Bathrooms</p>
          <input onChange={ (event) => this.data.bathrooms=event.target.value } type="number" className="form-control"  />
        </label>
        <label>
          <p>Area(Sqft.)</p>
          <input onChange={ (event) => this.data.area=event.target.value } type="number" className="form-control" />
        </label>
        <label>
          <p>Price/sqft.</p>
          <input onChange={ (event) => this.data.pricePerSqft=event.target.value } type="number" className="form-control"  />
        </label>
        <label>
          <p>Description</p>
          <input onChange={ (event) => this.data.description=event.target.value } type="text" className="form-control" />
        </label>
        <label>
          <p>Location</p>
          <input onChange={ (event) => this.data.location=event.target.value } type="text" className="form-control"  />
        </label>
        <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={this.handlePhoto}
            />




       

     
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>   
    </div>

   
  );
};
}

