import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, RouteProps} from 'react-router';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  UserData
} from "amazon-cognito-identity-js"
import { userPool } from '../awsConfiguration' 
import { storeData } from '../reducer'
import { loginUser } from '../actions/User'
import { User } from '../DefineInfo'

export const AuthWrap: FC<RouteProps> = (props) => {

  const [isLogin,setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state:storeData) => state.user);

  const cognitoUser = userPool.getCurrentUser();

  useEffect(() => { 
    checkLogin();
  },[]);

  const checkLogin = () => {
    
    if (cognitoUser != null) {
        cognitoUser.getSession(function(err: any, session: any) {
            if (err) {
                alert(err);
                dispatch(loginUser({userName: "", isSignIn: false}));
                return;
            }
            cognitoUser.getUserData(function(err: any, userData: any) {
              if (err) {
                alert(err.message || JSON.stringify(err));
                dispatch(loginUser({userName: "", isSignIn: false}));
                return;
              }
              dispatch(loginUser({userName: userData.Username, isSignIn: true}));
            });
          
        });
    }
    else {
      dispatch(loginUser({userName: "", isSignIn: false}));
    }
  }

  return(
    <Route
      render={() =>(
        user.isSignIn ? <Route {...props} /> : <Redirect to='/'/>    
      )}
    />
  )
}

export const getIdToken = (): string => {
  const cognitoUser = userPool.getCurrentUser();
  let result: string = ''
  if (cognitoUser != null) {
    cognitoUser.getSession(function(err: any, session: any) {
      if (err) {
        alert(err.message || JSON.stringify(err));
      }
      else{
        const idToken: string = session.getIdToken().getJwtToken();
        result = idToken;
      }
    });
  }
  return result;
}