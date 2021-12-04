import React, { useRef, useState, useEffect } from "react";

import Script from "react-load-script";
import SearchBar from "material-ui-search-bar";
import PropertyList from "./PropertyList";
import Paginate from "./Paginate";
import axios from "axios";

const HomeComponent = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [types,setTypes] = useState([]);
  const [property, setProperty] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);

  useEffect(() => {
    const fetchProperty = async () => {
      setloading(true);
      const res = await axios.get("http://localhost:5000/getTypes");
      let dropdown=[{name:'Select your value',value:''}];
       dropdown.push(...res.data);
      setTypes(dropdown);
      setloading(false);
    };
    const fetchTypes = async () => {
      setloading(true);
      const res = await axios.get("http://localhost:5000/properties");
      setProperty(res.data);
      setloading(false);
    };

    const fetchCart = async () => {
      const token = await JSON.parse(sessionStorage.getItem("token"));
    

      let res = await axios.get("http://localhost:5000/Cart/"+token._id);
       res=res.data;
      if (res.length > 0 && res[0].propertyid && res[0].propertyid.length > 0) { 
        setCart(res[0].propertyid);
      }
    };
    fetchTypes();
    fetchProperty();
    fetchCart();
  }, []);

  const indexOfLatestProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLatestProperty - propertiesPerPage; console.log(cart);
  property.forEach((prop) => {
    if (cart.includes(prop._id)) {prop.disable = true; console.log("prop "+prop)}
    else prop.disable = false;
  });

  const currentProperty = Array.from(property).slice(
    indexOfFirstProperty,
    indexOfLatestProperty
  );

 

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function searchSend(city,filter) { console.log(filter);
    const searchParam = { city: city,filter:filter };
    const res = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(searchParam),
    }).then((data) => data.json());

    return res;
  }


  const autocompleteRef = useRef(null);

  const handleScriptLoad = () => {
 
    const options = {
      types: ["(cities)"],
    }; 

   
    /*global google*/ autocompleteRef.current =
      new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        options
      );

  
    autocompleteRef.current.setFields([
      "address_components",
      "formatted_address",
    ]);

   
    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };


  const handleFilter = async (propertyType) =>
   { 
     const filterVal = propertyType.target.value;
     let addressObject = autocompleteRef.current.getPlace();
     let address,val,city="";
     if(addressObject)
      address = addressObject.address_components;
    if (address && address.length > 0) {
     
      city = address[0].long_name;
      
    }
    val = await searchSend(
     city,filterVal
      
    ).then((e) => {
      setProperty(e);
    });  



   }

   const resetPage = () =>{window.location.reload(false);}

  const handlePlaceSelect = async () => {
    const filterVal= document.getElementById("filter").value; 
    const addressObject = autocompleteRef.current.getPlace();
    const address = addressObject.address_components;
    let val;

    if (address && address.length > 0) {
      setCity(address[0].long_name);
      setQuery(addressObject.formatted_address);

      val = await searchSend(
        address[0].long_name,filterVal
        
      ).then((e) => {
        setProperty(e);
      });
    }
  };

  return (
    <div>
      <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDVzrusSOTLiMsSL3phSsJGw7QjZphoUE&libraries=places"
        onLoad={handleScriptLoad}
      />
     
      <span className="border border-primary">
        <SearchBar
          id="autocomplete"
          placeholder="Search with your favourite locations..."
          value={query}
          style={{
            margin: "0 auto",
            maxWidth: 800,
          }}
        />
      </span>
       <div className="row d-flex justify-content-center">
    
      <select className="form-select w-25" id="filter" onChange={(event) =>
                    handleFilter(event)
                  } >
                  {types.map((e, key) => {
                    return (
                      <option key={key} value={e.value}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              <button className="btn btn-primary col-md-1"  onClick={() => resetPage()}> Reset </button>

               </div> 
    
      <h3 className="text-dark mt-4 mx-2">Available Properties</h3>
      <hr />
      <div className="row ms-3">
        <PropertyList
          property={currentProperty}
          loading={loading}
          isCart={false}
        />
        <Paginate
          propertiesPerPage={propertiesPerPage}
          totalProperties={Array.from(property).length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default HomeComponent;
