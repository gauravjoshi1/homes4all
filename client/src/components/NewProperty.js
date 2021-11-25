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
      <h1 class="mt-4">{propertyItem.propertyName} {costOfApartment}</h1>
      <div> 
        <img src={"/"+propertyItem.image} onError={(e)=>{e.target.onerror = null; e.target.src="/default.png"}} class="img-responsive" alt={propertyItem.description} width="304" height="236" />
      </div>
      <h3 class="mt-4">Overview</h3>
      <p>{propertyItem.description}</p>
      <h3 class="mt-4">Facts and Features</h3>
  

      <form onSubmit={handleSubmit}>
  <div className="form-group w-25">
  
    <label htmlFor="bedrooms">Bedrooms</label>
    <input className="form-control" onChange={ (event) => data.bedrooms=event.target.value } disabled={!editDetails}type="number" defaultValue={propertyItem.bedrooms}  id="bedrooms" />
  </div>
  <div className="form-group w-25">
  
    <label htmlFor="bathrooms">Bathrooms</label>
    <input className="form-control" onChange={ (event) => data.bathrooms=event.target.value } disabled={!editDetails}type="number" defaultValue={propertyItem.bathrooms}  id="bathrooms" />
  </div>
  <div className="form-group w-25">
  
  <label htmlFor="location">Location</label>
  <input className="form-control" onChange={ (event) => data.location=event.target.value } disabled={!editDetails}type="text" defaultValue={propertyItem.location}  id="location" />
</div>
<div className="form-group w-25">
  
  <label htmlFor="area">Area(sq Ft.)</label>
  <input className="form-control" onChange={ (event) => data.area=event.target.value } disabled={!editDetails}type="number" defaultValue={propertyItem.area}  id="area" />
</div>

<div className="form-group w-25">
  
  <label htmlFor="sqft">Price per Sq Ft.</label>
  <input className="form-control" onChange={ (event) => data.pricePerSqft=event.target.value } disabled={!editDetails}type="number" defaultValue={propertyItem.pricePerSqft}  id="sqft" />
</div>
<div className="form-group w-25">
  
  <label htmlFor="description">Description</label>
  <input className="form-control" onChange={ (event) => data.description=event.target.value } disabled={!editDetails}type="text" defaultValue={propertyItem.description}  id="description" />
</div>

<input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name={propertyItem.image}
                onChange={handlePhoto}
                hidden={!editDetails}
            />

<button type="submit" hidden={!editDetails}  className="btn btn-info" >Submit</button>
<button type="button" hidden={!editDetails} onClick={resetEdit}  className="btn btn-warning" >Cancel</button>
  
  
</form>






      <button style={{ display: (token.role==='Admin' ? 'block' : 'none') }} type="button" onClick={setEdit} className="btn btn-primary" >Edit property details</button>

      <button style={{ display: (token.role==='Admin' ? 'block' : 'none') }} type="button" onClick={handleClick} className="btn btn-danger" >Delete this property</button>
    </>
  );
};

export default NewProperty;
