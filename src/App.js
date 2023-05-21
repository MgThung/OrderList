import React from "react";
import "./style/main.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register"
import { ToastContainer } from "react-toastify";
import Order from "./components/Order";

function App() {


	return (
		<div className="App">
			    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
		<BrowserRouter>
			<Routes >
				<Route path="/home" element={<Home />}></Route>
       			<Route path="/" element={< Login/>}></Route>
       			<Route path="/register" element={<Register />}></Route>
				<Route path="/order" element={<Order />}></Route>
			</Routes>
		</BrowserRouter>
		
		</div>
	);
}

export default App;
