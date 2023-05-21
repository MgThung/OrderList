import React from 'react';
import { useState,useEffect } from "react";
import axios from 'axios';
import { Grid } from '@mui/material';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { Link } from "react-router-dom";
import "../style/main.css";

function Order() {
    const [order,setOrder]=useState([]);

   	

	const getOrder = async () => {
		const respone = await fetch("http://localhost:8080/order").then(
		  (respone) => respone.json()
		);
		setOrder(respone);
		
	  };
	  useEffect(() => {
		getOrder();
	  }, []);

	  const deleteOrder=async(id)=>{
		let isDelete= window.confirm("Are you sure? This item will be removed from your Order!");
		if (isDelete){
			await axios.delete(`http://localhost:8080/order/${id}`)
			getOrder();
		}
	}
    
  return (
    <div>
		<div className="navbar">
			<Link to="/home">
				<h3 className="logo">Logo</h3>
			</Link>
				<div className="right">
				<Grid container my={2}>
					<Grid item xs={6}>
					<Link to="/">Log Out</Link>
					</Grid>
					<Grid item xs={6}>
					<Link to="/order">
					<button className="btn shopping-cart-btn">
						<GiShoppingBag size={24} />
					</button>
					</Link>
					</Grid>				
				</Grid>
				</div>
				
			</div>
      <h1 className='oderh1'>Oder List</h1>
	  <div className="shoppingCart">
				<div className="header">
					<h2>Shopping cart</h2>
				</div>
				<div className="cart-products">
					{order.length === 0 && (
						<span className="empty-text">
							Your basket is
							currently empty
						</span>
					)}
					<Grid container>
					{order && order.map((products) => (
						products.a.map((product)=>{
						<Grid xs={12} sm={6} md={4} key={product.id}>
							<div
							className="cart-product"
							key={product.id}>
						
							<div className="product-info">
								<h3>
									{product.name}
								</h3>
								<span className="product-price">
									{Number(product.price) *
										product.qty}
									$
								</span>
							</div>
							
							
							<button
								className="btn remove-btn"
								onClick={() =>
									deleteOrder(product.id)
								}>
								<RiDeleteBin6Line
									size={20}
								/>
							</button>
						</div>
						<div className="order-total">
						<Grid container my={2} sx={{width:"100%"}}>
							<Grid item xs={6}>	<div className="Total">Total</div></Grid>
							<Grid item xs={6}>	<div className="Total-price">${order.b}</div></Grid>
						</Grid>
					</div>
						</Grid>
						})
						
						
					))}
				
					
					</Grid>
					
			</div>
    </div>
	</div>
  )
}

export default Order
