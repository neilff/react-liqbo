import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';
import * as favourites from '../api/favourites-api';

export function onAddStoreFavourite(store) {
  favourites.addFavouriteStore(store);
}

export function onRemoveStoreFavourite(id) {
  favourites.removeFavouriteStore(id);
}

export function onUpdatedStoreFavourites(stores) {
  dispatch(onUpdatedStoreFavourites, stores);
}

// Override actions toString for logging.
setToString('locator', {
  onAddStoreFavourite,
  onRemoveStoreFavourite,
  onUpdatedStoreFavourites
});
