import * as actions from './actions';
import Immutable from 'immutable';
import {favouriteStoresCursor, favouriteProductsCursor} from '../state';
import {register} from '../dispatcher';
import {LocatorItem} from '../locator/records';
import {ProductItem} from '../products/records';

export const dispatchToken = register(({action, data}) => {

  let query;

  switch (action) {

    /**
     * When store favourites are updated
     */
    case actions.onUpdatedLocationFavourites:
      favouriteStoresCursor(favourites => {
        return favourites.withMutations(list => {
          list.clear();

          data.forEach(i => {
            list.push(new LocatorItem(i).toMap());
          });
        });
      });
      break;

    /**
     * When product favourites are updated
     */
    case actions.onUpdatedProductFavourites:
      favouriteProductsCursor(favourites => {
        return favourites.withMutations(list => {
          list.clear();

          data.forEach(i => {
            list.push(new ProductItem(i).toMap());
          });
        });
      });
      break;
  };
})

export function getStoreFavourites() {
  return favouriteStoresCursor();
}

export function getProductFavourites() {
  return favouriteProductsCursor();
}
