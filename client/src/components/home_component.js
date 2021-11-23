import React, { useRef, useState, useEffect } from "react";

import Script from "react-load-script";
import SearchBar from "material-ui-search-bar";
import PropertyList from "./PropertyList";
import Paginate from "./Paginate";
import axios from "axios";


const HomeComponent = () => {


  

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");

  const [property, setProperty] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(4);

  useEffect(() => {
    const fetchProperty = async () => {
      setloading(true);
      const res = await axios.get('http://localhost:5000/properties');
      setProperty(res.data)
      setloading(false);
    };

    fetchProperty();
  }, []);

  console.log("property " + property);

  const indexOfLatestProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLatestProperty - propertiesPerPage;
  const currentProperty = Array.from(property).slice(
    indexOfFirstProperty,
    indexOfLatestProperty
  );

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  console.log("currentProperty == " + JSON.stringify(currentProperty));
  function searchsend(city, query) {
    const searchParam = { city: city, query: query };
    const res = fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(searchParam),
    }).then((data) => data.json());

    return res;
  }

  // Store autocomplete object in a ref.
  // This is done because refs do not trigger a re-render when changed.
  const autocompleteRef = useRef(null);

  const handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ["(cities)"],
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete
    /*global google*/ autocompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    autocompleteRef.current.setFields([
      "address_components",
      "formatted_address",
    ]);

    // Fire Event when a suggested name is selected
    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    // Extract City From Address Object
    console.log(autocompleteRef);
    const addressObject = autocompleteRef.current.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address.length > 0) {
      setCity(address[0].long_name);
      setQuery(addressObject.formatted_address);

      const val = searchsend(
        address[0].long_name,
        addressObject.formatted_address
      );
    }
  };

  return (
    <div>
      <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDVzrusSOTLiMsSL3phSsJGw7QjZphoUE&libraries=places"
        onLoad={handleScriptLoad}
      />
      <SearchBar
        id="autocomplete"
        placeholder=""
        value={query}
        style={{
          margin: "0 auto",
          maxWidth: 800,
        }}
      />
      <h3 className="mt-4 mx-2">Available Properties</h3>
      <div className="row">
        <PropertyList property={currentProperty} loading={loading} />
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
