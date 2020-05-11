import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import {
  CognitoUserPool,
  CognitoUser
} from "amazon-cognito-identity-js"
import awsConfiguration from '../../awsConfiguration'
import { Label, Input, Button } from 'semantic-ui-react';

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
})

export const Verification: FC = () =>{

  const { userName } = useParams();
  const [verificationCode, setVerificationCode] = useState('')

  const verifyCode = () => {

    console.log(userName);
    
    
    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: userPool
    })

    cognitoUser.confirmRegistration(verificationCode, true, (err: any) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('verification succeeded')
      setVerificationCode('')
    })
  }


  return(
    <div>
      <Label>verification code</Label>
      <Input 
        icon='key'
        iconPosition='left'
        placeholder='Enter Verification Code'  
        value={verificationCode} 
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <Button onClick={() => verifyCode()}>Verify</Button>
    </div>
  )
}