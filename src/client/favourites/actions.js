import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';
import * as favourites from '../api/favourites-api';

/**
 * Store (Locator) Favourites
 */
export function onAddLocationFavourite(store) {
  favourites.addFavouriteStore(store);
}

export function onRemoveLocationFavourite(id) {
  favourites.removeFavouriteStore(id);
}

export function onUpdatedLocationFavourites(stores) {
  dispatch(onUpdatedLocationFavourites, stores);
}

/**
 * Product Favourites
 */
export function onAddProductFavourite(product) {
  favourites.addFavouriteProduct(product);
}

export function onRemoveProductFavourite(id) {
  favourites.removeFavouriteProduct(id);
}

export function onUpdatedProductFavourites(products) {
  dispatch(onUpdatedProductFavourites, products);
}

// Override actions toString for logging.
setToString('locator', {
  onAddLocationFavourite,
  onRemoveLocationFavourite,
  onUpdatedLocationFavourites,
  onAddProductFavourite,
  onRemoveProductFavourite,
  onUpdatedProductFavourites
});
