import {dispatch} from '../dispatcher';
import R from 'ramda';
import debounce from 'debounce';
import {get} from '../utils/server';
import {onProductsQuerySuccess, onProductsQueryFail} from '../products/actions';

function buildProductVM(products) {
  console.log('buildProductVM :: ', products);

  return products;
}

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
