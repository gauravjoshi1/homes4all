import { useLocation } from "react-router";

const NewProperty = () => {
  const { state } = useLocation();
  const {
    propertyItem,
  } = state;
  console.log(propertyItem)
  const costOfApartment = '$' + Number(propertyItem.pricePerSqft) * Number(propertyItem.area);

  return (
    <>
      <h1 class="mt-4">{propertyItem.propertyName} {costOfApartment}</h1>
      <div> 
        <img src={propertyItem.imageName} class="img-responsive" alt={propertyItem.propertyName} width="304" height="236" />
      </div>
      <h3 class="mt-4">Overview</h3>
      <p>{propertyItem.description}</p>
      <h3 class="mt-4">Facts and Features</h3>
      <ul>
          <li>{propertyItem.type}</li>
          <li>{propertyItem.bedrooms} bedrooms</li>
          <li>{propertyItem.bathrooms} bathrooms</li>
          <li>Built in {propertyItem.yearBuilt}</li>
          <li>${propertyItem.pricePerSqft} price/sqft</li>
          <li>Total cost: {costOfApartment}</li>
          <li>Located in {propertyItem.location}</li>

      </ul>
propertyItem
    </>
  );
};

export default NewProperty;
