import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';
import {getProducts} from '../api/products-api';

export function onProductsQueryChange({target: {name, value}}) {
  dispatch(onProductsQueryChange, {name, value});
  getProducts({
    q: encodeURI(value).replace(/%20/g,'+')
  });
}

export function onProductsQuerySubmit(query) {
  dispatch(onProductsQuerySubmit, query);
  getProducts({
    q: encodeURI(query.get('q')).replace(/%20/g,'+')
  });
}

export function onProductsQuerySuccess(result) {
  dispatch(onProductsQuerySuccess, result);
}

export function onProductsQueryFail(error) {
  console.error(error);
  dispatch(onProductsQueryFail, error);
}

// Override actions toString for logging.
setToString('products', {
  onProductsQueryChange,
  onProductsQuerySubmit,
  onProductsQuerySuccess,
  onProductsQueryFail
});
