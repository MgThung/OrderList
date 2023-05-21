import React, {
	useState,
	useEffect,
} from "react";
import { Link } from "react-router-dom";
import "../style/main.css";
import "../style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./RatingStars";
import ShoppingCart from "./ShoppingCart";
import { Grid } from "@mui/material";
import axios from "axios";

function Home(props) {
    const [products,setproduct]=useState([]);
	
  	let qty=1;
	
	const getData = async () => {
		const respone = await fetch("http://localhost:8080/products").then(
		  (respone) => respone.json()
		);
		setproduct(respone);
		console.log(products)
	  };
	  useEffect(() => {
		getData();
	  }, []);

	const addItem=async (a,b)=>{
		let isExisting=false;
		const result=await axios.get("http://localhost:8080/order-list");
		if(result.data.length===0){
			const order={name:a,price:b,qty:qty}
			axios.post("http://localhost:8080/order-list",order)
		}
		else
			{ result.data.map((orderItem)=>{
				if(a=== orderItem.name){
					orderItem.qty+=1;
					const order={
						name:a,
						price:b,
						qty:orderItem.qty
					}
					axios.put(`http://localhost:8080/order-list/${orderItem.id}`,order);
					isExisting=true;
				}
			})
			if(isExisting == false){
				const order={
					name:a,
					price:b,
					qty:qty 
				}
				axios.post("http://localhost:8080/order-list",order)
			}
		}
	}




	
	return (
    <div>
        	<div className="navbar">
				<h3 className="logo">Logo</h3>
				<Link to="/order">
					<button className="btn shopping-cart-btn">
						<GiShoppingBag size={24} />
					</button>
				</Link>
				
			</div>
			<main >
			<Grid container my={2}>
                <Grid item xs={12} sm={12} md={8}><div>
			<h2 className="title">
					Products
				</h2>
				<div className="products">
                    <Grid container>
                    {products && products.map((product,index) => (
                       <Grid item xs={12} sm={6} md={4} key={product.id}>
						<div className="product" key={product.id}>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p className="product-des">
								{
									product.description
								}
							</p>
							<span className="product-price">
								{product.price}$
							</span>
							<div className="buttons">
								<button className="btn">
									Detail
								</button>
								<button
									className="btn"
									onClick={() =>
										addItem(
											product.name,product.price
										)
									}>
									Add to cart
								</button>
							</div>
						</div>
                        </Grid>
					))}
                    </Grid>
				
				</div>
			</div>
            </Grid>
                <Grid item xs={12} sm={12} md={4}>	<ShoppingCart/>
            </Grid>
            </Grid>
			
		
			</main>
      
    </div>
  )
}

export default Home
