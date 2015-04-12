import treo from 'treo';
import promise from 'treo/plugins/treo-promise';
import * as actions from '../favourites/actions';

var schema = treo.schema()
  .version(1)
  .addStore('favouriteStores', { key: 'id' })
  .addStore('favouriteProducts', { key: 'id' });

var db = treo('liqbo-dev', schema)
  .use(promise());

var favouriteStores = db.store('favouriteStores');
var favouriteProducts = db.store('favouriteProducts');

/**
 * Stores (Locations)
 */
export function loadFavouriteStores() {
  favouriteStores.all()
    .then(result => {
      actions.onUpdatedLocationFavourites(result);
    })
    .then(null, err => {
      console.error(err);
    });
}

export function addFavouriteStore(store) {
  favouriteStores.put(store)
    .then(result => {
      loadFavouriteStores();
    })
    .then(null, err => {
      console.error(err);
    });
}

export function removeFavouriteStore(id) {
  favouriteStores.del(id)
    .then(result => {
      loadFavouriteStores();
    })
    .then(null, err => {
      console.error(err);
    });
}

/**
 * Products
 */
export function loadFavouriteProducts() {
  favouriteProducts.all()
    .then(result => {
      actions.onUpdatedProductFavourites(result);
    })
    .then(null, err => {
      console.error(err);
    });
}

export function addFavouriteProduct(product) {
  favouriteProducts.put(product)
    .then(result => {
      loadFavouriteProducts();
    })
    .then(null, err => {
      console.error(err);
    });
}

export function removeFavouriteProduct(id) {
  favouriteProducts.del(id)
    .then(result => {
      loadFavouriteProducts();
    })
    .then(null, err => {
      console.error(err);
    });
}
