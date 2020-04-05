import React, {Suspense} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const Home = React.lazy(() => import('./views/home/index.js'))
const Login = React.lazy(() => import('./views/login/index.js'))
const City = React.lazy(() => import('./views/city/index.js'))
const TestRenderProps = React.lazy(() => import('./views/test/index1.js'))
const MapTest = React.lazy(() => import('./views/map/index.js'))
const HouseDetail = React.lazy(() => import('./views/detail/index.js'))
const AuthCheck = React.lazy(() => import('./components/AuthCheck/index.js'))
const Rent = React.lazy(() => import('./views/rent/index.js'))
const RentAdd = React.lazy(() => import('./views/rent/Add/index.js'))
const RentSearch = React.lazy(() => import('./views/rent/Search/index.js'))
const TestProxy = React.lazy(() => import('./views/test/test-proxy.js'))

function NotFound () {
  return <div>NotFound</div>
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path='/login' component={Login}/>
          <AuthCheck path='/home' component={Home}/>
          <AuthCheck exact path='/rent' component={Rent}/>
          <AuthCheck path='/rent/add' component={RentAdd}/>
          <AuthCheck path='/rent/search' component={RentSearch}/>
          <AuthCheck path='/home' component={Home}/>
          <Route path='/city' component={City}/>
          <Route path='/map' component={MapTest}/>
          <Route path='/detail' component={HouseDetail}/>
          <Route path='/rp' component={TestRenderProps}/>
          <Route path='/proxy' component={TestProxy}/>
          <Route component={NotFound}/>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
