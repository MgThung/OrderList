import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, TextField, Button ,Grid} from "@mui/material";
import "../style/main.css";
const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:8080/user/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid username");
          } else {
            if (resp.password === password) {
              toast.success("Success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("userrole", resp.role);
              usenavigate("/home");
            } else {
              toast.error("Please Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    return result;
  };
  return (
    <div className="login">
      <h1>User LogIn</h1>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={ProceedLogin}
      >
        <div>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            onChange={(e) => usernameupdate(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            type="password"
            label="Password"
            value={password}
            variant="standard"
            onChange={(e) => passwordupdate(e.target.value)}
          />
        </div>
      <Grid container my={2} sx={{width:"80%",margin:"2rem auto"}}>
        <Grid item xs={6}><Button variant="contained"  type="submit" >  Login</Button></Grid>
    
        <Grid item xs={6}>  <Link className="newuser" to={"/register"}>
          <Button variant="contained"  > New User</Button>
          </Link></Grid>
        
      </Grid>
 
       
        
      
      </Box>
    </div>
  );
};

export default Login;
