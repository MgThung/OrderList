import React from 'react';
import { useState,useEffect } from "react";
import axios from 'axios';

function Order() {
    const [order,setOrder]=useState([]);

   	

	const getOrder = async () => {
		const respone = await fetch("http://localhost:8080/order-list").then(
		  (respone) => respone.json()
		);
		setOrder(respone);
		console.log("totalprice  "+order)
	  };
	  useEffect(() => {
		getOrder();
	  }, []);
    
  return (
    <div>
      Oder List
      {console.log("totalprice  "+order)}
    </div>
  )
}

export default Order
