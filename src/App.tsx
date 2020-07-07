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


const App: FC = () => {
  
  
  return (
    <div className="container">
      <Switch>
        <Route exact path="/SignIn" render={() => <SignInForm/>} />
        <Route exact path="/SignUp" render={() => <SignUpForm/>} />
        <Route exact path="/Project/:userName/:projectID" render={() => <Project/>} />
        <Route exact path="/NewProject" render={() => <NewProjectForm/>} />
        <Route exact path="/Verification/:userName" render={() => <Verification/>} />
        <Route exact path="/ProjectList/:userName" render={() => <ProjectList/>} />
        <Route exact path="/" render={() => <Home/>} />
      </Switch>
    </div>
  )
}


export default App;
