import React,{useState, useContext} from "react";
//Bootstrap Stuff
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
//Axios
import axios from 'axios';
import AuthContext from "../Store/auth-context";
import { useHistory } from "react-router";


const Login = () => {
  const [enteredName, setName] = useState("")
  const [enteredPass, setPass] = useState("")

  //store and get JWL token
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  let history = useHistory();

  const userNamerHandler = (event) =>{
    setName(event.target.value);
  }

  const passwordHandler = (event) =>{
    setPass(event.target.value);
  }

  const submitHandler = (event) =>{
    event.preventDefault();

    //Putting data into a object
    let loginData = {
      username: enteredName,
      password: enteredPass
    };

    //clear fields
    setName("");
    setPass("");
    //axios.post(`http://localhost:5000/user/login/${enteredName}`);


    axios.post('http://localhost:5000/users/login', loginData)
    .then(res => {
      const expirationTime = new Date( new Date().getTime() + (+res.data.expiresIn) );
      authCtx.login(res.data.token, expirationTime.toISOString())
    })
    .catch(error =>{
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });

    if(isLogedIn){
      
      history.replace("/profile")
    }

  }

  return (
    <div className = "container-fluid bg-dark text-white">
      <h1 className = "text-center">Login to Squad Seek</h1>
      <div className = "d-flex flex-wrap justify-content-center mt-auto">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formLoginName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={userNamerHandler}
            value={enteredName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLoginPass">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
            value={enteredPass}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    </div>
  );
};

export default Login;
