import React from 'react';
import Router from 'react-router';
import routes from './routes';
import {i18nCursor} from './state';
import {loadFavouriteStores} from './api/favourites-api';

const app = document.getElementById('root');

// Load favourites stored in IndexedDB
loadFavouriteStores();

Router.run(routes, (Handler) => {
  React.render(<Handler {...i18nCursor().toJS()} />, app)
});
