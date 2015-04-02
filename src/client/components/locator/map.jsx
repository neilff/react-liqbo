import React from 'react';
import _ from 'ramda';
import {Gmaps, Marker} from 'react-gmaps';;
import Immutable from 'immutable';
import {addons} from 'react/addons';

// Toronto
var coords = {
  lat: 43.7182713,
  lng: -79.3777061
};

let map = null;
let markers = [];

function removeMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

  markers = [];
}

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  componentWillUpdate(props) {
    removeMarkers();
  },

  componentDidUpdate(props) {
    if (!map || !google) {
      return;
    }

    this.props.stores.map((store, i) => {
      var latLng = new google.maps.LatLng(store.get('latitude'), store.get('longitude'));

      var marker = new google.maps.Marker({
          position: latLng,
          map: map
      });

      markers.push(marker);
    });

    // Center map around new markers
    map.fitBounds(markers.reduce(function(bounds, marker) {
      return bounds.extend(marker.getPosition());
    }, new google.maps.LatLngBounds()));
  },

  propTypes: {
    stores: React.PropTypes.instanceOf(Immutable.List)
  },

  onMapCreated(component) {
    console.log('onMapCreated', component);

    map = component.map;

    component.getMap().setOptions({
      disableDefaultUI: true
    });
  },

  render() {
    console.log('Stores :: ', this.props.stores);

    return (
      <Gmaps
        ref={ this.onMapCreated }
        width={'100%'}
        height={'100%'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}>
      </Gmaps>
    );
  }
});
