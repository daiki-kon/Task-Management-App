import React, { FC } from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router';

import { ProjectList } from './component/ProjectList/ProjectList'
import { NewProjectForm } from './component/ProjectList/NewProjectForm';
import Project from './component/Project/Project';
import { SignInForm } from './component/Auth/Cert';
import { SignUpForm } from './component/Auth/SignUp'
import { Verification } from './component/Auth/Verification'


const App: FC = () => {
  
  
  return (
    <div className="container">
      <Switch>
        <Route path="/SignIn" render={() => <SignInForm/>} />
        <Route path="/SignUp" render={() => <SignUpForm/>} />
        <Route path="/Project/:projectID" render={() => <Project/>} />
        <Route path="/NewProject" render={() => <NewProjectForm/>} />
        <Route path="/Verification/:userName" render={() => <Verification/>} />
        <Route path="/" render={() => <ProjectList/>} />

      </Switch>
    </div>
  )
}


export default App;
