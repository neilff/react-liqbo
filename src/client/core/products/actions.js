import R from 'ramda';
import setToString from '../utils/settostring';
import {dispatch} from '../dispatcher';
import {getProducts, getProduct} from '../api/products-api';
import {getStoresWithProduct} from '../api/stores-api';
import {productQueryCursor} from '../state';

function _getQueryParams() {
  return R.keys(productQueryCursor()
          .get('where')
          .filter(val => val === true)
          .toJS()).join(',');
}

export function onProductsQueryChange({target: {name, value}}) {
  var where = _getQueryParams();

  dispatch(onProductsQueryChange, {name, value});
  getProducts({
    q: encodeURI(value).replace(/%20/g,'+'),
    where: where
  });
}

export function onProductsQuerySubmit(query) {
  query = query || '';

  var where = _getQueryParams();

  dispatch(onProductsQuerySubmit, query);
  getProducts({
    q: encodeURI(query).replace(/%20/g,'+'),
    where: where
  });
}

export function onProductsParamToggle({target: {value, checked}}) {
  var obj = {
    keyPath: ['where', value],
    value: checked
  };

  dispatch(onProductsParamToggle, obj);
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

/**
 * Product Availability Actions
 */
export function onProductAvailableQueryRequest(id) {
  dispatch(onProductAvailableQueryRequest, id);
  getStoresWithProduct(id);
}

export function onProductAvailableQuerySuccess(result) {
  dispatch(onProductAvailableQuerySuccess, result);
}

// Override actions toString for logging.
setToString('products', {
  onProductsQueryChange,
  onProductsQuerySubmit,
  onProductsParamToggle,
  onProductsQuerySuccess,
  onProductsQueryFail,
  onProductDetailRequest,
  onProductAvailableQueryRequest,
  onProductDetailQuerySuccess,
  onProductAvailableQuerySuccess,
  onProductDetailQueryFail
});
