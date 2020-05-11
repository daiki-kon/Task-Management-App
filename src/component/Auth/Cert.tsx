import React, { FC } from "react";
import { withRouter } from 'react-router';
import useReactRouter from 'use-react-router';

import { Button, Checkbox, Form } from "semantic-ui-react";
import "./Cert.css";

export const CertInfo: FC = () => {
  
  const { history, location, match } = useReactRouter();

  return (
    <div className="intro-cert">
      <Button onClick={() => history.push('/SignIn')}>SignIn</Button>
      <Button onClick={() => history.push('/SignUp')}>SignUp</Button>
    </div>
  );
};

export const SignInForm: FC = () => {
  return (
    <div>
      <Form>
        <Form.Field>
          <label>UserName or Email</label>
          <input placeholder="AcountID or Email" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" />
        </Form.Field>
        <Button type="submit">Sign In</Button>
      </Form>
    </div>
  );
};

