import Immutable from 'immutable';

export const LocatorItem = Immutable.Record({
  id: '',
  name: '',
  address: '',
  address_line_1: '',
  address_line_2: '',
  postal_code: '',
  city: '',
  latitude: '',
  longitude: '',
  telephone: '',
  distance: '',
  operatingHours: {},
  isOpen: '',
  quantity: ''
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
