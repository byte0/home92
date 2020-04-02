import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/home/index.js'
import Login from './views/login/index.js'
import City from './views/city/index.js'
import TestRenderProps from './views/test/index1.js'
import MapTest from './views/map/index.js'
import HouseDetail from './views/detail/index.js'

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
        <Route path='/city' component={City}/>
        <Route path='/map' component={MapTest}/>
        <Route path='/detail' component={HouseDetail}/>
        <Route path='/rp' component={TestRenderProps}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
