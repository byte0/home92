import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

function Login () {
  return <div>Login</div>
}

function Home () {
  return <div>Home</div>
}

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
