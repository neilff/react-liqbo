import {onGeoLocationSuccess, onGeoLocationFail} from '../locator/actions';

export function requestGeoLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    onGeoLocationSuccess(position);
  }, function(error) {
    onGeoLocationFail(error);
  });
}
