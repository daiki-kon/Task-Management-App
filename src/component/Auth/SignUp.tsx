import React, { FC, useState } from "react";
import { withRouter, useHistory } from 'react-router';

import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js"
import awsConfiguration from '../../awsConfiguration'
import { userPool } from '../../awsConfiguration' 

import { Button, Form, Header } from "semantic-ui-react";
import './SignUp.css'



export const SignUpForm: FC = () => {
  const history = useHistory();
  const [userName,setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      }),
      
    ]
    userPool.signUp(userName, password, attributeList, [], (err, result) => {
      if (err) {
        console.error(err)
        return
      }
      setUserName('')
      setEmail('')
      setPassword('')
      console.log(result)
      history.push('/Verification/' + userName)
    })
    
    
  }

  return (
    <div　className='signup-form'>
      <Header as='h1' textAlign='center'>Sign-Up</Header>
      <Form>
        <Form.Field className='user-name'>
          <label>User Name</label>
          <input placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
        </Form.Field>
        <Form.Field className='email'>
          <label>Email</label>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Field>
        <Button fluid type="submit" onClick={() =>signUp()}>Sign Up</Button>
      </Form>
    </div>
  );
};