import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { Button} from "semantic-ui-react";
import './Home.css'

export const Home: FC = () => {
  const history = useHistory();
  return(
    <div　className='start'>
      <div className='cert-start'>
        <Button.Group >
          <Button onClick={() => history.push('/SignUp')}>Sign Up</Button>
          <Button.Or />
          <Button onClick={() => history.push('/SignIn')}>Sign In</Button>
        </Button.Group>
      </div>
    </div>
    
  )
}