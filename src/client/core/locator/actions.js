import setToString from '../utils/settostring';
import {dispatch} from '../dispatcher';
import {getStores} from '../api/stores-api';
import {requestGeoLocation} from '../utils/geolocation';

export function onLocatorQueryChange({target: {name, value}}) {
  dispatch(onLocatorQueryChange, {name, value});
  getStores({
    q: encodeURI(value).replace(/%20/g,'+')
  });
}

export function onLocatorQuerySubmit(query, location) {
  query = query || '';

  dispatch(onLocatorQuerySubmit, query);
  getStores({
    q: encodeURI(query).replace(/%20/g,'+')
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
  dispatch(onGeoLocationSuccess, location);
  getStores({
    lat: location.coords.latitude,
    lon: location.coords.longitude
  });
}

export function onGeoLocationFail(error) {
  dispatch(onGeoLocationFail, error);
}

// Override actions toString for logging.
setToString('locator', {
  onLocatorQueryChange,
  onLocatorQuerySubmit,
  onLocatorQuerySuccess,
  onLocatorQueryFail,
  onMapFocus,
  onGeoLocateRequest,
  onGeoLocationSuccess,
  onGeoLocationFail
});
