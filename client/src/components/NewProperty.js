import { useLocation } from "react-router";
import { useState } from "react";
import axios from 'axios';

async function saveProperty(formData)
 {   
   
await axios({
  method: "post",
  url: "http://localhost:5000/editProperty",
  data: formData,
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
   
    window.location.href = '/';
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

}


const NewProperty = () => {
  const { state } = useLocation();
  const {
    propertyItem,
  } = state;
  let formData= new FormData();
  let data ={bedrooms:propertyItem.bedrooms,bathrooms:propertyItem.bathrooms,location:propertyItem.location,area:propertyItem.area,pricePerSqft:propertyItem.pricePerSqft,description:propertyItem.description};
  const [editDetails, seteditDetails] = useState(false);

  console.log(propertyItem)
  const costOfApartment = '$' + Number(propertyItem.pricePerSqft) * Number(propertyItem.area);
  const token = JSON.parse(sessionStorage.getItem('token'));
  
  
  const handleClick = async () => {
  const result=  await fetch("http://localhost:5000/softDelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({_id:propertyItem._id}),
    }).then((data) => data.json());

  if(result.matchedCount && result.matchedCount>0)
  {
    window.location.href = '/';
  }
    
  }
 
  const handlePhoto = async (e) => {  console.log("SUCCESS");
    formData.append( 'photo', e.target.files[0]);
}

const handleSubmit = async(e) => {
  
  
e.preventDefault();  formData.append('bedrooms',data.bedrooms);
formData.append('bathrooms', data.bathrooms);
formData.append('location', data.location);
formData.append('area',data.area);
formData.append('pricePerSqft',data.pricePerSqft);
formData.append('description',data.description);
formData.append('_id',propertyItem._id)
 
const result = await saveProperty(formData);




}

const setEdit = async() => {seteditDetails(true);}
const resetEdit = async() => {seteditDetails(false);}

  return (
    <>
    <div className="container mt-3 ">
        <h3 className="mb-3">Overview</h3>
        <hr/>
      <h3 class="my-4">Facts and Features</h3>
        <div class="card mt-2 mb-2" style={{ width: "30rem" }}>
        <div class="card-header text-center h3">
                
                { costOfApartment }
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
          <div class="card-body">
          <form onSubmit={handleSubmit}>
  <div className="form-group">
  
    <label htmlFor="bedrooms">Bedrooms</label>
    <input className="form-control" onChange={ (event) => data.bedrooms=event.target.value } disabled={!editDetails}type="number" defaultValue={propertyItem.bedrooms}  id="bedrooms" />
  </div>
  <div className="form-group">
  
    <label htmlFor="bathrooms">Bathrooms</label>
    <input className="form-control" onChange={ (event) => data.bathrooms=event.target.value } disabled={!editDetails}type="number" defaultValue={propertyItem.bathrooms}  id="bathrooms" />
  </div>
  <div className="form-group">
  
  <label htmlFor="location">Location</label>
  <input className="form-control" onChange={ (event) => data.location=event.target.value } disabled={!editDetails}type="text" defaultValue={propertyItem.location}  id="location" />
</div>
<div className="form-group">
  
  <label htmlFor="area">Area(sq Ft.)</label>
  <input className="form-control" onChange={ (event) => data.area=event.target.value } disabled={!editDetails}type="number" defaultValue={propertyItem.area}  id="area" />
</div>

<div className="form-group">
  
  <label htmlFor="sqft">Price per Sq Ft.</label>
  <input className="form-control" onChange={ (event) => data.pricePerSqft=event.target.value } disabled={!editDetails}type="number" defaultValue={propertyItem.pricePerSqft}  id="sqft" />
</div>
<div className="form-group">
  
  <label htmlFor="description">Description</label>
  <textarea className="form-control" onChange={ (event) => data.description=event.target.value } disabled={!editDetails} rows="4" defaultValue={propertyItem.description}  id="description" ></textarea>
</div>
<input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name={propertyItem.image}
                onChange={handlePhoto}
                hidden={!editDetails}
            />

<button type="submit" hidden={!editDetails}  className="btn btn-info my-4" >Submit</button>
<button type="button" hidden={!editDetails} onClick={resetEdit}  className="btn btn-warning my-4" >Cancel</button>
  
  
</form>






      <button style={{ display: (token.role==='Admin' ? 'block' : 'none') }} type="button" onClick={setEdit} className="btn btn-primary my-4" >Edit property details</button>

      <button style={{ display: (token.role==='Admin' ? 'block' : 'none') }} type="button" onClick={handleClick} className="btn btn-danger my-4" >Delete this property</button>
 
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProperty;
