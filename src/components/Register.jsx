import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Grid,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "../style/main.css";
function Register() {
  const [id, idchange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");

  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("female");
  const navigate = useNavigate();
  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (id === null || id === "") {
      isproceed = false;
      errormessage += " Username";
    }
    
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }
    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warn("Please enter valid email");
      }
    }
    return isproceed;
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { id, password, email, phone, address, gender };
    if (IsValidate()) {
      //console.log(regobj);
      fetch("http://localhost:8080/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/");
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };
  return (
    <div className="login">
      <h1>Resgister Now</h1>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={handlesubmit}
      >
        <div>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={id}
            onChange={(e) => idchange(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => emailchange(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => passwordchange(e.target.value)}
            type="password"
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Phone"
            variant="standard"
            value={phone}
            onChange={(e) => phonechange(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Address"
            variant="standard"
            value={address}
            onChange={(e) => addresschange(e.target.value)}
          />
        </div>
        <div className="Gender">
          <FormControl >
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup onChange={(e) => genderchange(e.target.value)}>
              <Grid container my={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
          <Grid container my={2} sx={{width:"80%",margin:"2rem auto"}}>
          <Grid item xs={6}>
        <Button variant="contained"  type="submit" >
          Sign up
          </Button>
          </Grid>
          <Grid item xs={6}> 
        <Button variant="contained">
          <Link to={"/"} className="btn btn-danger">
            Back
          </Link>
        </Button>
          </Grid>
        </Grid>
        </div>
      </Box>
    
    </div>
  );
}

export default Register;
