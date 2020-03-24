import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/home/index.js'
import Login from './views/login/index.js'

function NotFound () {
  return <div>NotFound</div>
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from='/' to='/home' />
        <Route path='/login' component={Login}/>
        <Route path='/home' component={Home}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
