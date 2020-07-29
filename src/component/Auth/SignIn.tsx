import React, { FC, useState } from "react";
import { withRouter } from 'react-router';
import { loginUser } from '../../actions/User'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router'
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js"
import { userPool } from '../../awsConfiguration' 

import { Button, Form, Header, Input, Message, Label } from "semantic-ui-react";
import "./SignIn.css";

export const SignInForm: FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState(''); 
  const [isLogin,setIsLogin] =useState(true);
  const [isTypedUser,setisTypedUser] = useState(true)
  const [isTypedPass,setisTypedPass] = useState(true)

  const signIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username : userName,
      Password : password
    })
    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getIdToken().getJwtToken()
        
        console.log(accessToken)
        console.log("user",userName)
        dispatch(loginUser({userName: userName,isSignIn: true}))
        history.push('/ProjectList')
      },
      onFailure: (err) => {
        console.error(err.code)
        if(err.code == "NotAuthorizedException"){   
          setIsLogin(false)
        }
        else if(err.code == "InvalidParameterException"){
          if(userName == ""){
            setisTypedUser(false);
          }
          if(password == ""){
            setisTypedPass(false);
          }
        }
      }
    })
  }
  return (
    <div className='signin-form'>
      <Header as='h1' textAlign='center'>Sign-In</Header>
      <Form>
        <Form.Field>
          <label>User Name</label>
          <Input 
            placeholder="User Name" 
            value={userName} 
            onChange={(e) => {setUserName(e.target.value); setisTypedUser(true); setIsLogin(true)} }
          />
          {isTypedUser? <div/>: <InstType/>}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            placeholder="Password"
            value={password} 
            onChange={(e) => {setPassword(e.target.value); setisTypedPass(true); setIsLogin(true)} }
          />
          {isTypedPass? <div/>: <InstType/>}
        </Form.Field>
        <Button fluid type="submit" onClick={() =>signIn()}>Sign In</Button>
      </Form>
      {isLogin ? 
        <div/>: 
        <Message negative>
          <Message.Header>failed login attempts</Message.Header>
        </Message>
      }
    </div>
  );
};

const InstType: FC = () => {
  return(
    <Label basic color='red' pointing>
      Please enter a value
    </Label>
  )
}