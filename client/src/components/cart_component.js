import React, { useRef, useState, useEffect } from "react";

import PropertyList from "./PropertyList";


const CartComponent = () => {


  

  const [cartData, setCartData] = useState([]);
  
  
  
  

  useEffect(() => {
    

    const fetchCart = async () => { 
      
      const token =  await JSON.parse(sessionStorage.getItem('token'));
      const res =  await fetch("http://localhost:5000/getCartProperties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body:JSON.stringify({id:token._id}),
      }).then((data) => data.json());
      
    if(res)
    { 
      setCartData(res);
    
    }
     
      }
      
    fetchCart();
  }, []);

 

  

  return (
    <div>
         <h3 className="mt-4 mx-2">Your cart</h3>

     {cartData.length<=0 && <p style={{textAlign:'center'}}>Looks like you haven't added any properties to your cart..</p>}

  <PropertyList property={cartData} loading="" isCart={true} />
    </div>
  );
};

export default CartComponent;
