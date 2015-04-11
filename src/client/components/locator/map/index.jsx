import React from 'react';
import debounce from 'debounce';
import R from 'ramda';
import {Gmaps, Marker} from 'react-gmaps';;
import Immutable from 'immutable';
import {addons} from 'react/addons';

require('./_map-icons.scss');

let map = null;
let markers = [];
let coords = [];
let userLocation = null;

function removeMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

  if (userLocation && userLocation.setMap) {
    userLocation.setMap(null);
  }

  markers = [];
  coords = [];
  userLocation = null;
}

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  componentWillUpdate() {
    removeMarkers();
  },

  componentDidUpdate() {
    if (!map || !google) {
      return;
    }

    debounce(this.createMarkers(), 100);
    debounce(this.focusMap(), 100);
    debounce(this.markUser(), 100);
  },

  componentWillUnmount() {
    map = null;
    removeMarkers();
  },

  propTypes: {
    stores: React.PropTypes.instanceOf(Immutable.List),
    focus: React.PropTypes.instanceOf(Immutable.List),
    user: React.PropTypes.instanceOf(Immutable.Map)
  },

  createMarkers() {
    let stores = this.props.stores;

    stores.map((store, i) => {
      var latLng = new google.maps.LatLng(store.get('latitude'), store.get('longitude'));

      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });

      marker['infoWindow'] = new google.maps.InfoWindow({
        content: '<strong>Store #' + store.get('id') + '</strong> ' +
                 '<div>' + store.get('name') + '</div>'
      });

      google.maps.event.addListener(marker, 'click', function() {
        this['infoWindow'].open(map, this);
      });

      markers.push(marker);
    });
  },

  markUser() {
    let user = this.props.user;

    var latLng = new google.maps.LatLng(user.get('latitude'), user.get('longitude'));

    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      zIndex: 9,
      draggable: false,
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|19A3F4|1b1f2a',
      label: '<i class="icon ion-location"></i>'
    });

    userLocation = marker;
  },

  focusMap() {
    let focus = this.props.focus;

    focus.map((coord, i) => {
      var latLng = new google.maps.LatLng(coord.get('latitude'),
        coord.get('longitude'));

      coords.push(latLng);
    });

    if (coords.length > 0) {
      map.fitBounds(coords.reduce(function(bounds, i) {
        return bounds.extend(i);
      }, new google.maps.LatLngBounds()));
    }
  },

  onMapCreated(component) {
    if (!component) {
      return;
    }

    map = component.map;

    component.getMap().setOptions({
      disableDefaultUI: true,
      maxZoom: 18
    });

    this.createMarkers();
  },

  render() {
    const initialFocus = {
      latitude: 43.7182713,
      longitude: -79.3777061
    };

    return (
      <Gmaps
        ref={ this.onMapCreated }
        width={'100%'}
        height={'100%'}
        lat={ initialFocus.latitude }
        lng={ initialFocus.longitude }
        zoom={12}>
      </Gmaps>
    );
  }
});
