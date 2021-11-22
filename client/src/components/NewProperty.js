import { useLocation } from "react-router";

const NewProperty = () => {
  const { state } = useLocation();
  const {
    propertyName,
    imageName,
    description,
    type,
    bedrooms,
    bathrooms,
    yearBuilt,
    pricePerSqft,
    area,
    location,
  } = state;

  const costOfApartment = '$' + Number(pricePerSqft) * Number(area);

  return (
    <>
      <h1 class="mt-4">{propertyName} {costOfApartment}</h1>
      <div> 
        <img src={imageName} class="img-responsive" alt={propertyName} width="304" height="236" />
      </div>
      <h3 class="mt-4">Overview</h3>
      <p>{description}</p>
      <h3 class="mt-4">Facts and Features</h3>
      <ul>
          <li>{type}</li>
          <li>{bedrooms} bedrooms</li>
          <li>{bathrooms} bathrooms</li>
          <li>Built in {yearBuilt}</li>
          <li>${pricePerSqft} price/sqft</li>
          <li>Total cost: {costOfApartment}</li>
          <li>Located in {location}</li>

      </ul>

    </>
  );
};

export default NewProperty;
