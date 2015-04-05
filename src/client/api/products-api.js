import {dispatch} from '../dispatcher';
import R from 'ramda';
import debounce from 'debounce';
import {get} from '../utils/server';
import {onProductsQuerySuccess, onProductsQueryFail} from '../products/actions';

/**
 * Converts product price to a human readable format
 *
 * @param {object} product LCBO API Product Object
 * @return {object} Modified API object
 */
function _convertProductPrice(product) {
  product.price = (product.price_in_cents / 100).toFixed(2);

  return product;
}

var buildProductVM = R.pipeP(
  R.map(_convertProductPrice)
);

/**
 * GET lcboapi.com/products
 *
 * Response:
 * https://lcboapi.com/docs/v1/products#many
 *
 */
function _getProducts(params) {
  get('/products', params)
    .then(buildProductVM)
    .then(onProductsQuerySuccess)
    .then(null, onProductsQueryFail);
}

export var getProducts = debounce(_getProducts, 500);
