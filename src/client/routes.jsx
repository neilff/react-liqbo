import App from './components/app';
import Home from './components/home';
import NotFound from './components/notfound';
import React from 'react';
import Locator from './components/locator';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={ App } path="/">
    <DefaultRoute handler={ Home } name="home" />
    <NotFoundRoute handler={ NotFound } name="not-found" />
    <Route handler={ Locator } name="locator" path="/locator" />
  </Route>
);
