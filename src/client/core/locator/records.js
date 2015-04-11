import Immutable from 'immutable';

export const LocatorItem = Immutable.Record({
  id: '',
  name: '',
  address: '',
  postal_code: '',
  city: '',
  latitude: '',
  longitude: '',
  telephone: '',
  distance: '',
  operatingHours: {},
  isOpen: ''
});

export const LocatorCoordinates = Immutable.Record({
  id: '',
  latitude: '',
  longitude: ''
});

export const UserGeoLocation = Immutable.Record({
  latitude: '',
  longitude: ''
});
