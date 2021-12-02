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
  const [cart, setCart] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);

  useEffect(() => {
    const fetchProperty = async () => {
      setloading(true);
      const res = await axios.get("http://localhost:5000/properties");
      setProperty(res.data);
      setloading(false);
    };

    const fetchCart = async () => {
      const token = await JSON.parse(sessionStorage.getItem("token"));
      const res = await fetch("http://localhost:5000/getCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id: token._id }),
      }).then((data) => data.json());

      if (res.length > 0 && res[0].propertyid && res[0].propertyid.length > 0) {
        setCart(res[0].propertyid);
      }
    };

    fetchProperty();
    fetchCart();
  }, []);

  const indexOfLatestProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLatestProperty - propertiesPerPage;
  property.forEach((prop) => {
    if (cart.includes(prop._id)) prop.disable = true;
    else prop.disable = false;
  });

  const currentProperty = Array.from(property).slice(
    indexOfFirstProperty,
    indexOfLatestProperty
  );

  console.log("CP" + JSON.stringify(currentProperty));

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function searchsend(city) {
    const searchParam = { city: city };
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

  // Store autocomplete object in a ref.
  // This is done because refs do not trigger a re-render when changed.
  const autocompleteRef = useRef(null);

  const handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ["(cities)"],
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete
    /*global google*/ autocompleteRef.current =
      new google.maps.places.Autocomplete(
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

  const handlePlaceSelect = async () => {
    // Extract City From Address Object

    const addressObject = autocompleteRef.current.getPlace();
    const address = addressObject.address_components;
    let val;
    // Check if address is valid
    if (address && address.length > 0) {
      setCity(address[0].long_name);
      setQuery(addressObject.formatted_address);

      val = await searchsend(
        address[0].long_name,
        addressObject.formatted_address
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
      <span class="border border-primary">
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
