import React, { FC } from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router';

import { ProjectList } from './component/ProjectList/ProjectList'
import { NewProjectForm } from './component/ProjectList/NewProjectForm';
import Project from './component/Project/Project';
import { SignInForm } from './component/Auth/SignIn';
import { SignUpForm } from './component/Auth/SignUp'
import { Verification } from './component/Auth/Verification'
import { Home } from './component/Home'
import { AuthWrap } from './container/Auth'


const App: FC = () => {
  
  
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" render={() => <Home/>} />
        <Route exact path="/SignIn" render={() => <SignInForm/>} />
        <Route exact path="/SignUp" render={() => <SignUpForm/>} />
        <AuthWrap>
          <Route exact path="/Project/:projectID" render={() => <Project/>} />
          <Route exact path="/NewProject" render={() => <NewProjectForm/>} />
          <Route exact path="/Verification" render={() => <Verification/>} />
          <Route exact path="/ProjectList" render={() => <ProjectList/>} />
        </AuthWrap>
      </Switch>
    </div>
  )
}


export default App;
