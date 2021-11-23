import React, { useRef, useState, useEffect } from "react";

import Script from "react-load-script";
import SearchBar from "material-ui-search-bar";
import PropertyList from "./PropertyList";
import Paginate from "./Paginate";
import axios from "axios";

const listOfProperties = [
  {
    propertyName: "A building in Seattle",
    imageName:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    description:
      "Come check out this charming 2 bedroom, 2 bathroom townhouse centrally located between Lewisville Lake and Lavon Lake. This home offers a bonus area, lots of storage space, vaulted ceilings, and tons of natural light. The kitchen boasts sleek countertops, stainless steel appliances, a pantry, and a breakfast bar. The primary bedroom includes an en suite bathroom featuring dual sinks, a relaxing soaking tub, a separate shower, and a large closet. Unwind outside on a second-level patio or first-level front porch that has access to a common green space. This home offers convenient access to tons of recreational amenities, shopping, dining, schools, and I-75.",
    type: "building",
    bedrooms: "2",
    bathrooms: "2",
    yearBuilt: "2006",
    pricePerSqft: "213",
    area: "1485",
    location: "Seattle",
  },
  {
    propertyName: "A lavish Villa in Spain",
    imageName:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Nicely updated tri-level condo in Canyon Creek! Very well-kept home with a basement. Private courtyard near the community pool. Living room features hardwood flooring and granite clad wood burning fireplace. Kitchen includes lovely granite counter tops, recently replaced cabinets. Spacious floorplan is great for entertaining. 3 bedrooms and 2 bathrooms upstairs. Master suite with bamboo flooring, 3 closets, and private bath. Guest bedrooms have recent carpet. Basement has 2 rooms a full bath and utility room. Finished basement is great game room, play room, study, media room, or craft room. Residents attend highly-desired Plano ISD schools. Near shopping, dining, golf, major business centers. Welcome home.",
    type: "villa",
    bedrooms: "3",
    bathrooms: "4",
    yearBuilt: "1973",
    pricePerSqft: "146",
    area: "1814",
    location: "Spain",
  },
  {
    propertyName: "A House in Australia",
    imageName:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Hurry!! Tremendous real estate value! Nestled in established Pitman Creek w access to Hackberry Park, adjacent to prestige Sibine Park Estate; unique open floor plan w abundance of natural light. Move In Ready! Freshly painted, new flooring, 1 story, 3 bedrooms, 2 full baths,1,696 sf, well-maintained pool, 2016 new roof, 2020 new AC, 2020 new Heater, vaulted ceiling, fireplace, Master connects to adjacent bedroom-can be used as connecting study. Tranquil backyard, pool, 10'+ privacy fence. Envious extra-long rear driveway for ample recreational vehicle parking to fit your adventurous life style.  Super clean 2-car garage w epoxy flooring, new garage opener; surrounded with mature landscape.  Welcome Home!",
    type: "house",
    bedrooms: "3",
    bathrooms: "2",
    yearBuilt: "1981",
    pricePerSqft: "233",
    area: "1696",
    location: "Australia",
  },
  {
    propertyName: "House in Neatherlands",
    imageName:
      "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Updated 1 story beauty in the heart of Plano with SPLIT MASTER BEDROOMS-Yes there are 2!!New laminate flooring,Brand new windows,Quartz countertops in kitchen & baths,new cooktop,fully renovated bathrooms with contemporary tiles,toilets & cabinetry,New landscape,new sewer line.Flex Bonus room near spacious laundry room.Large,private family room with wall of windows.Lifetime warranty on the foundation work.Close to Liberty park,stores & HWY",
    type: "house",
    bedrooms: "4",
    bathrooms: "3",
    yearBuilt: "1972",
    pricePerSqft: "183",
    area: "2620",
    location: "Neatherlands",
  },
  {
    propertyName: "A building in Seattle",
    imageName:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    description:
      "Come check out this charming 2 bedroom, 2 bathroom townhouse centrally located between Lewisville Lake and Lavon Lake. This home offers a bonus area, lots of storage space, vaulted ceilings, and tons of natural light. The kitchen boasts sleek countertops, stainless steel appliances, a pantry, and a breakfast bar. The primary bedroom includes an en suite bathroom featuring dual sinks, a relaxing soaking tub, a separate shower, and a large closet. Unwind outside on a second-level patio or first-level front porch that has access to a common green space. This home offers convenient access to tons of recreational amenities, shopping, dining, schools, and I-75.",
    type: "building",
    bedrooms: "2",
    bathrooms: "2",
    yearBuilt: "2006",
    pricePerSqft: "213",
    area: "1485",
    location: "Seattle",
  },
  {
    propertyName: "A lavish Villa in Spain",
    imageName:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Nicely updated tri-level condo in Canyon Creek! Very well-kept home with a basement. Private courtyard near the community pool. Living room features hardwood flooring and granite clad wood burning fireplace. Kitchen includes lovely granite counter tops, recently replaced cabinets. Spacious floorplan is great for entertaining. 3 bedrooms and 2 bathrooms upstairs. Master suite with bamboo flooring, 3 closets, and private bath. Guest bedrooms have recent carpet. Basement has 2 rooms a full bath and utility room. Finished basement is great game room, play room, study, media room, or craft room. Residents attend highly-desired Plano ISD schools. Near shopping, dining, golf, major business centers. Welcome home.",
    type: "villa",
    bedrooms: "3",
    bathrooms: "4",
    yearBuilt: "1973",
    pricePerSqft: "146",
    area: "1814",
    location: "Spain",
  },
  {
    propertyName: "A House in Australia",
    imageName:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Hurry!! Tremendous real estate value! Nestled in established Pitman Creek w access to Hackberry Park, adjacent to prestige Sibine Park Estate; unique open floor plan w abundance of natural light. Move In Ready! Freshly painted, new flooring, 1 story, 3 bedrooms, 2 full baths,1,696 sf, well-maintained pool, 2016 new roof, 2020 new AC, 2020 new Heater, vaulted ceiling, fireplace, Master connects to adjacent bedroom-can be used as connecting study. Tranquil backyard, pool, 10'+ privacy fence. Envious extra-long rear driveway for ample recreational vehicle parking to fit your adventurous life style.  Super clean 2-car garage w epoxy flooring, new garage opener; surrounded with mature landscape.  Welcome Home!",
    type: "house",
    bedrooms: "3",
    bathrooms: "2",
    yearBuilt: "1981",
    pricePerSqft: "233",
    area: "1696",
    location: "Australia",
  },
  {
    propertyName: "House in Neatherlands",
    imageName:
      "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Updated 1 story beauty in the heart of Plano with SPLIT MASTER BEDROOMS-Yes there are 2!!New laminate flooring,Brand new windows,Quartz countertops in kitchen & baths,new cooktop,fully renovated bathrooms with contemporary tiles,toilets & cabinetry,New landscape,new sewer line.Flex Bonus room near spacious laundry room.Large,private family room with wall of windows.Lifetime warranty on the foundation work.Close to Liberty park,stores & HWY",
    type: "house",
    bedrooms: "4",
    bathrooms: "3",
    yearBuilt: "1972",
    pricePerSqft: "183",
    area: "2620",
    location: "Neatherlands",
  },
  {
    propertyName: "A building in Seattle",
    imageName:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    description:
      "Come check out this charming 2 bedroom, 2 bathroom townhouse centrally located between Lewisville Lake and Lavon Lake. This home offers a bonus area, lots of storage space, vaulted ceilings, and tons of natural light. The kitchen boasts sleek countertops, stainless steel appliances, a pantry, and a breakfast bar. The primary bedroom includes an en suite bathroom featuring dual sinks, a relaxing soaking tub, a separate shower, and a large closet. Unwind outside on a second-level patio or first-level front porch that has access to a common green space. This home offers convenient access to tons of recreational amenities, shopping, dining, schools, and I-75.",
    type: "building",
    bedrooms: "2",
    bathrooms: "2",
    yearBuilt: "2006",
    pricePerSqft: "213",
    area: "1485",
    location: "Seattle",
  },
  {
    propertyName: "A lavish Villa in Spain",
    imageName:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Nicely updated tri-level condo in Canyon Creek! Very well-kept home with a basement. Private courtyard near the community pool. Living room features hardwood flooring and granite clad wood burning fireplace. Kitchen includes lovely granite counter tops, recently replaced cabinets. Spacious floorplan is great for entertaining. 3 bedrooms and 2 bathrooms upstairs. Master suite with bamboo flooring, 3 closets, and private bath. Guest bedrooms have recent carpet. Basement has 2 rooms a full bath and utility room. Finished basement is great game room, play room, study, media room, or craft room. Residents attend highly-desired Plano ISD schools. Near shopping, dining, golf, major business centers. Welcome home.",
    type: "villa",
    bedrooms: "3",
    bathrooms: "4",
    yearBuilt: "1973",
    pricePerSqft: "146",
    area: "1814",
    location: "Spain",
  },
  {
    propertyName: "A House in Australia",
    imageName:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Hurry!! Tremendous real estate value! Nestled in established Pitman Creek w access to Hackberry Park, adjacent to prestige Sibine Park Estate; unique open floor plan w abundance of natural light. Move In Ready! Freshly painted, new flooring, 1 story, 3 bedrooms, 2 full baths,1,696 sf, well-maintained pool, 2016 new roof, 2020 new AC, 2020 new Heater, vaulted ceiling, fireplace, Master connects to adjacent bedroom-can be used as connecting study. Tranquil backyard, pool, 10'+ privacy fence. Envious extra-long rear driveway for ample recreational vehicle parking to fit your adventurous life style.  Super clean 2-car garage w epoxy flooring, new garage opener; surrounded with mature landscape.  Welcome Home!",
    type: "house",
    bedrooms: "3",
    bathrooms: "2",
    yearBuilt: "1981",
    pricePerSqft: "233",
    area: "1696",
    location: "Australia",
  },
  {
    propertyName: "House in Neatherlands",
    imageName:
      "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Updated 1 story beauty in the heart of Plano with SPLIT MASTER BEDROOMS-Yes there are 2!!New laminate flooring,Brand new windows,Quartz countertops in kitchen & baths,new cooktop,fully renovated bathrooms with contemporary tiles,toilets & cabinetry,New landscape,new sewer line.Flex Bonus room near spacious laundry room.Large,private family room with wall of windows.Lifetime warranty on the foundation work.Close to Liberty park,stores & HWY",
    type: "house",
    bedrooms: "4",
    bathrooms: "3",
    yearBuilt: "1972",
    pricePerSqft: "183",
    area: "2620",
    location: "Neatherlands",
  },
];





const HomeComponent = () => {


  

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");

  const [property, setProperty] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(1);

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
