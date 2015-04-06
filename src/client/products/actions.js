import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';
import {getProducts, getProduct} from '../api/products-api';

export function onProductsQueryChange({target: {name, value}}) {
  dispatch(onProductsQueryChange, {name, value});
  getProducts({
    q: encodeURI(value).replace(/%20/g,'+')
  });
}

/**
 * Products Query Actions
 */
export function onProductsQuerySubmit(query) {
  query = query || '';

  dispatch(onProductsQuerySubmit, query);
  getProducts({
    q: encodeURI(query).replace(/%20/g,'+')
  });
}

export function onProductsQuerySuccess(result) {
  dispatch(onProductsQuerySuccess, result);
}

export function onProductsQueryFail(error) {
  console.error(error);
  dispatch(onProductsQueryFail, error);
}

/**
 * Product Detail Query Actions
 */
export function onProductDetailRequest(id) {
  dispatch(onProductDetailRequest);
  getProduct(id);
}

export function onProductDetailQuerySuccess(result) {
  dispatch(onProductDetailQuerySuccess, result);
}

export function onProductDetailQueryFail(result) {
  dispatch(onProductDetailQueryFail, result)
}

// Override actions toString for logging.
setToString('products', {
  onProductsQueryChange,
  onProductsQuerySubmit,
  onProductsQuerySuccess,
  onProductsQueryFail,
  onProductDetailRequest,
  onProductDetailQuerySuccess,
  onProductDetailQueryFail
});
