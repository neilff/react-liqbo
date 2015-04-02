import setToString from '../../lib/settostring'
import {dispatch} from '../dispatcher'
import {getStores} from '../api/stores-api'

export function onLocatorQueryChange({target: {name, value}}) {
  dispatch(onLocatorQueryChange, {name, value});
  getStores({q: encodeURI(value).replace(/%20/g,'+')});
}

export function onLocatorQuerySubmit(query) {
  dispatch(onLocatorQuerySubmit, query);
  getStores({q: encodeURI(query.get('q')).replace(/%20/g,'+')});
}

export function onLocatorQuerySuccess(result) {
  dispatch(onLocatorQuerySuccess, result);
}

// Override actions toString for logging.
setToString('locator', {
  onLocatorQueryChange, onLocatorQuerySubmit, onLocatorQuerySuccess
});
