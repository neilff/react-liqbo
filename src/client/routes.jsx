import React from 'react';
import Main from './sections/main';
import Home from './sections/home';
import NotFound from './sections/404';
import Locator from './sections/locator';
import Products from './sections/products';
import ProductDetail from './sections/products/detail';
import Favourites from './sections/favourites';
import About from './sections/about';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={ Main } path="/">
    <DefaultRoute handler={ Home } name="home" />
    <NotFoundRoute handler={ NotFound } name="not-found" />
    <Route handler={ Locator } name="locator" path="/locator" />
    <Route handler={ Products } name="products" path="/products" />
    <Route handler={ ProductDetail } name="product" path="/products/:productId" />
    <Route handler={ Favourites } name="favourites" path="/favourites" />
    <Route handler={ About } name="about" path="/about" />
  </Route>
);
