import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/elements/Header'
import HomeScreen from './components/HomeScreen'
import ProductScreen from './components/ProductScreen'
import CartScreen from './components/CartScreen'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import ProfileScreen from './components/ProfileScreen'
import ShippingScreen from './components/ShippingScreen'

import UserListScreen from './components/UserListScreen'
import UserEditScreen from './components/UserEditScreen'
import ProductListScreen from './components/ProductListScreen'
import ProductEditScreen from './components/ProductEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
    </Router>
  )
}

export default App
