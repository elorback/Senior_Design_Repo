import React, { useState } from 'react';
import Input from './input';
import Button from './button'

export default function RegisterPage1(props) {

  const [enteredFirstName, setFirstName] = useState("");
  const [eteredLastName, setLastName] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");

  const firstNameHandler = (event) =>{
    setFirstName(event.target.value);
  }

  const lastNameHandler = (event) =>{
    setLastName(event.target.value);
  }
  const emailHandler = (event) =>{
    setEmail(event.target.value);
  }
  const passwordHandler = (event) =>{
    setPassword(event.target.value);
  }

  const nextBtnHandler = ()=>{
    //creating group data object
    const firstPageData = {
      fName: enteredFirstName,
      lName: eteredLastName,
      email: enteredEmail,
      password: enteredPassword,
    };

    //console.log(firstPageData);
    
    //move to next page
    props.onSetActive(props.active + 1)

    //lift state up
    props.onDataInput(firstPageData);

  };



  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Account Creation Information</h3>

      <div style={{ display: 'flex'}}>
        <div style={{ flex: 1, paddingRight: 10}}>
        <Input type="text" placeholder="First Name" label="First Name" style={{marginRight: 10}}  onChange={firstNameHandler}/>
        </div>
        <div style={{ flex: 1}}>

        <Input type="text" placeholder="Last Name" label="Last Name" onChange={lastNameHandler}/>
        </div>
      </div>
      
      <Input type="email" placeholder="Enter your e-mail" label="Email Address" onChange={emailHandler}/>

      <Input type="password" placeholder="Enter a password" label="Password" onChange={passwordHandler}/>

      {props.active !== 1 && (
        <Button onClick={() => props.onSetActive(props.active - 1)}>Previous</Button>
      )}
      {props.active !== 3 && (
        <Button
          onClick={() => props.onSetActive(nextBtnHandler)}
          style={{ float: 'right' }}
        >
          Next
        </Button>
      )}
    </div>
  )
}