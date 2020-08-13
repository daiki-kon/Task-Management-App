import React, { FC, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import {
  CognitoUserPool,
  CognitoUser
} from "amazon-cognito-identity-js"
import awsConfiguration from '../../awsConfiguration'
import { Label, Input, Button, Form, Header } from 'semantic-ui-react';

import './Verification.css'

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
})

export const Verification: FC = () =>{
  const history = useHistory();
  const { userName } = useParams();
  const [verificationCode, setVerificationCode] = useState('')

  const verifyCode = () => {

    console.log(userName);
    
    
    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: userPool
    })

    cognitoUser.confirmRegistration(verificationCode, true, (err: any,result: any) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(result)
      setVerificationCode('')

      if (result === 'SUCCESS'){
        history.push('/SignIn')
      }
    })
  }

  return(
    <div className='verification-form'>
      <Form>
        <Header as='h1' textAlign='center'>Verification</Header>
        <Form.Field>
          <label>verification code</label>
          <Input 
            icon='key'
            iconPosition='left'
            placeholder='Enter Verification Code'  
            value={verificationCode} 
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </Form.Field>
        <Button fluid onClick={() => verifyCode()}>Verify</Button>
      </Form>
    </div>
  )
}