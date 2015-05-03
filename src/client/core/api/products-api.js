import {dispatch} from '../dispatcher';
import R from 'ramda';
import debounce from 'debounce';
import {get} from '../server';
import * as productCursors from '../products/store';
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
function _getProducts(query) {
  var params = {
    where_not: 'is_dead',
    per_page: 100
  };

  get('/products', R.merge(params, query))
    .then(buildProductVM)
    .then(actions.onProductsQuerySuccess)
    .then(null, actions.onProductsQueryFail);
}

/**
 * GET lcboapi.com/products/{ productId }
 *
 * Response:
 * https://lcboapi.com/docs/v1/products
 *
 */
function _getProduct(productId, query) {

  // Scan the product cursor for the provided ID, if it exists, use it
  // Otherwise, request it from the API
  const products = productCursors.getProductQuery();

  var foundProduct = products.find(i => {
    return i.get('id').toString() === productId;
  });

  if (foundProduct) {
    actions.onProductDetailQuerySuccess(foundProduct);
  } else {
    get('/products/' + productId, query)
      .then(_convertProductPrice)
      .then(actions.onProductDetailQuerySuccess)
      .then(null, actions.onProductQueryFail);
  }
}

export var getProducts = debounce(_getProducts, 500);
export var getProduct = debounce(_getProduct, 500);
