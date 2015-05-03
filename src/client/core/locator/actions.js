import R from 'ramda';
import setToString from '../utils/settostring';
import {dispatch} from '../dispatcher';
import {getStores, getLocation} from '../api/stores-api';
import {locatorQueryCursor} from '../state';
import {requestGeoLocation} from '../utils/geolocation';

function _getQueryParams() {
  return R.keys(locatorQueryCursor()
          .get('where')
          .filter(val => val === true)
          .toJS()).join(',');
}

export function onLocatorQueryChange({target: {name, value}}) {
  var where = _getQueryParams();

  dispatch(onLocatorQueryChange, {name, value});
  getStores({
    q: encodeURI(value).replace(/%20/g,'+'),
    where: where
  });
}

export function onLocatorParamToggle({target: {value, checked}}) {
  var obj = {
    keyPath: ['where', value],
    value: checked
  };

  dispatch(onLocatorParamToggle, obj);
}

export function onLocatorQuerySubmit(query, location) {
  query = query || '';

  var where = _getQueryParams();

  dispatch(onLocatorQuerySubmit, query);
  getStores({
    q: encodeURI(query).replace(/%20/g,'+'),
    where: where
  });
}

export function onLocatorQuerySuccess(result) {
  dispatch(onLocatorQuerySuccess, result);
}

export function onLocatorQueryFail(error) {
  console.error(error);
  dispatch(onLocatorQueryFail, error);
}

export function onMapFocus(stores) {
  dispatch(onMapFocus, stores);
}

export function onGeoLocateRequest() {
  dispatch(onGeoLocateRequest);
  requestGeoLocation();
}

export function onGeoLocationSuccess(location) {
  var where = _getQueryParams();

  dispatch(onGeoLocationSuccess, location);
  getStores({
    lat: location.coords.latitude,
    lon: location.coords.longitude,
    where: where
  });
}

export function onGeoLocationFail(error) {
  dispatch(onGeoLocationFail, error);
}

/**
 * Locator Detail Query Actions
 */
export function onLocatorDetailRequest(id) {
  dispatch(onLocatorDetailRequest);
  getLocation(id);
}

export function onLocatorDetailQuerySuccess(result) {
  dispatch(onLocatorDetailQuerySuccess, result);
}

export function onLocatorDetailQueryFail(result) {
  dispatch(onLocatorDetailQueryFail, result)
}

// Override actions toString for logging.
setToString('locator', {
  onLocatorQueryChange,
  onLocatorQuerySubmit,
  onLocatorParamToggle,
  onLocatorQuerySuccess,
  onLocatorQueryFail,
  onMapFocus,
  onGeoLocateRequest,
  onGeoLocationSuccess,
  onGeoLocationFail,
  onLocatorDetailRequest,
  onLocatorDetailQuerySuccess,
  onLocatorDetailQueryFail
});
