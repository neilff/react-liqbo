import treo from 'treo';
import promise from 'treo/plugins/treo-promise';
import * as actions from '../favourites/actions';

var schema = treo.schema()
  .version(1)
  .addStore('favouriteStores', { key: 'id' });

var db = treo('liqbo-dev', schema)
  .use(promise());

var favouriteStores = db.store('favouriteStores');

export function loadFavouriteStores() {
  favouriteStores.all()
    .then(result => {
      console.log('loadFavouriteStores :: ', result);
      actions.onUpdatedStoreFavourites(result);
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
