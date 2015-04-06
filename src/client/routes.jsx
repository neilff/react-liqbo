import App from './components/app';
import Home from './components/home';
import NotFound from './components/notfound';
import React from 'react';
import Locator from './components/locator';
import Products from './components/products';
import ProductDetail from './components/products/detail';
import Favourites from './components/favourites';
import About from './components/about';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={ App } path="/">
    <DefaultRoute handler={ Home } name="home" />
    <NotFoundRoute handler={ NotFound } name="not-found" />
    <Route handler={ Locator } name="locator" path="/locator" />
    <Route handler={ Products } name="products" path="/products" />
    <Route handler={ ProductDetail } name="product" path="/products/:productId" />
    <Route handler={ Favourites } name="favourites" path="/favourites" />
    <Route handler={ About } name="about" path="/about" />
  </Route>
);
