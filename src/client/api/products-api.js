import {dispatch} from '../dispatcher';
import R from 'ramda';
import debounce from 'debounce';
import {get} from '../utils/server';
import * as actions from '../products/actions';

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
    .then(actions.onProductsQuerySuccess)
    .then(null, actions.onProductsQueryFail);
}

/**
 * GET lcboapi.com/products/{ id }
 *
 * Response:
 * https://lcboapi.com/docs/v1/products
 *
 */
function _getProduct(id, params) {
  get('/products/' + id, params)
    .then(_convertProductPrice)
    .then(actions.onProductDetailQuerySuccess)
    .then(null, actions.onProductQueryFail);
}

export var getProducts = debounce(_getProducts, 500);
export var getProduct = debounce(_getProduct, 500);
