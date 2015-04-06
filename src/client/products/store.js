import * as actions from './actions';
import Immutable from 'immutable';
import {productQueryCursor, productCursor, productDetailCursor} from '../state';
import {register} from '../dispatcher';
import {ProductItem} from '../records';

export const dispatchToken = register(({action, data}) => {

  let query;

  switch (action) {

    /**
     * When the query input is modified
     */
    case actions.onProductsQueryChange:
      const {name, value} = data;
      productQueryCursor(query => query.set(name, value));
      break;

    /**
     * When the query response comes in, cast the response as an immutable
     * map and register the items as new records.
     */
    case actions.onProductsQuerySuccess:
      console.log('onProductsQuerySuccess :: ', data);
      productCursor(products => {
        return products.withMutations(list => {
          list.clear();

          data.forEach(i => {
            list.push(new ProductItem(i).toMap());
          });
        });
      });
      break;

    case actions.onProductDetailQuerySuccess:
      console.log('onProductDetailQuerySuccess :: ', data);

      var productItem = new ProductItem(data).toMap();

      productDetailCursor(product => product.merge(productItem));
      break;
  };
})

export function getNewQuery() {
  return productQueryCursor();
}

export function getProductQuery() {
  return productCursor();
}

export function getProductDetail() {
  return productDetailCursor();
}
