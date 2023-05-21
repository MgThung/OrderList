import React from "react";
import "../style/shoppingCart.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState,useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
function ShoppingCart() {
	
	const [items,setItems]=useState([]);
	// const [order,setOrder]=useState([]);
	const [total,setTotal]=useState();
	const [updateqty,setupdateqty]=useState();
	// var totalPrice=0;

	useEffect(()=>{
		loadItems();
		
	},[])	

	const loadItems=async ()=>{
		const result1=await axios.get("http://localhost:8080/order-list")
		setItems(result1.data);
		// result1.data.map((prices)=>{
		// 	totalPrice+=prices.qty*Number(prices.price);
		// 	console.log("price1 "+prices.price)
		// 	console.log("totalprice1 "+totalPrice)
		// });
		const totalPrice=result1.data.reduce((price,item)=>price+item.qty*item.price,0)
		setTotal(totalPrice.toFixed(2))
		// console.log("totalprice  "+total)
	}

	

	const deleteOrder=async(id)=>{
		let isDelete= window.confirm("Are you sure? This item will be removed from your Order!");
		if (isDelete){
			await axios.delete(`http://localhost:8080/order-list/${id}`)
			loadItems();
		}
	}
	// const deleteOrderAll=async()=>{
	// 	let isDelete= window.confirm("Are you sure? This order will be bought !");
	// 	if (isDelete){
	// 		await axios.delete(`http://localhost:8080/order-list/`)
	// 		loadItems();
	// 	}
	// }

	const inDec=async(a,b,c,d,e)=>{
		if(c==="dec"){
			if(a===1){
				a=1;
			}else{
				a-=1;
			}
		}else{
			if(a===20){
				a=20;
				alert("Quantity Cannot Exceed 20!");
				return;
			}else{
				a+=1;
			}
		}
		const order={name:d,price:e,qty:a};
		await axios.put(`http://localhost:8080/order-list/${b}`,order)
		loadItems();
	}
	

	// let isExisting=false;
	// const addOrder=async (a,b)=>{
	// 	const result=await axios.get("http://localhost:8080/order");
	// 	if(result.data.length===0){
	// 		const order={name:a,price:totalPrice,}
	// 		axios.post("http://localhost:8080/order",order)
	// 	}
	// 	else{
	// 		result.data.map((orderItem)=>{
	// 			if(a=== orderItem.name){
	// 				orderItem.qty+=1;
	// 				const order={
	// 					name:a,
	// 					price:totalPrice,
						
	// 				}
	// 				axios.put(`http://localhost:8080/order/${orderItem.id}`,order)
	// 			}
	// 		})
	// 		if(isExisting == false){
	// 			const order={
	// 				name:a,
	// 				price:totalPrice,
				
	// 			}
	// 			axios.post("http://localhost:8080/order",order)
	// 		}
	// 	}
	// }

	
	return (
		<div
			className="modal"
			>
			<div className="shoppingCart">
				<div className="header">
					<h2>Shopping cart</h2>
				</div>
				<div className="cart-products">
					{items.length === 0 && (
						<span className="empty-text">
							Your basket is
							currently empty
						</span>
					)}
					
					{items && items.map((product) => (
					
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
							<div className="count">
								<Grid container my={3} sx={{alignContent:"center",textAlign:"center"}}>
									<Grid item xs={3}>
										<button className="qty-btn" onClick={()=>inDec(product.qty,product.id,"dec",product.name,product.price)}>-</button>
									</Grid>
									<Grid item xs={6}>
										<input type="text" className="qty-input" value={product.qty} onChange={(e)=>{updateqty(e.target.value)}}/>
									</Grid>
									<Grid item xs={3}>
										<button className="qty-btn" onClick={()=>inDec(product.qty,product.id,"inc",product.name,product.price)}>+</button>
									</Grid>
								</Grid>
								
								
								
							</div>
							{/* <select
								className="count"
								value={
									product.count
								}
								onChange={(
									event
								) => {
									onQuantityChange(
										product.id,
										event
											.target
											.value
									);
								}}>
								{[
									...Array(
										10
									).keys(),
								].map(
									(number) => {
										const num =
											number +
											1;
										return (
											<option
												value={
													num
												}
												key={
													num
												}>
												{
													num
												}
											</option>
										);
									}
								)}
							</select> */}
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
					))}
				
					<div className="order-total">
						<Grid container my={2} sx={{width:"100%"}}>
							<Grid item xs={6}>	<div className="Total">Total</div></Grid>
							<Grid item xs={6}>	<div className="Total-price">${total}</div></Grid>
						</Grid>
					
					
					</div>
						<button className="btn checkout-btn" >
							Add to oder-list
						</button>
				
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
