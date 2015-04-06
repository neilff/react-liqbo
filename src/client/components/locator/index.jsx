import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import SearchInput from './search';
import Map from './map';
import LocatorList from './locator-list';
import LoadingPanel from './loading-panel';
import {getUIState} from '../../ui/store';
import {Gmaps, Marker} from 'react-gmaps';
import GeoLocate from '../geolocator/geolocator';
import * as storeCursors from '../../locator/store';
import * as favouriteCursors from '../../favourites/store';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../../assets/css/core/layout.scss');

var coords = {
  lat: 43.7182713,
  lng: -79.3777061
};

export default React.createClass({
  render() {
    const newQuery = storeCursors.getNewQuery();
    const locatorQuery = storeCursors.getLocatorQuery();
    const mapFocus = storeCursors.getMapFocus();
    const currentLocation = storeCursors.getUserLocation();

    const storeFavourites = favouriteCursors.getStoreFavourites();

    const uiState = getUIState();

    return (
      <DocumentTitle title="Liqbo - Store Locator">
        <main className="layout__body">
          <header className="layout__header">
            <h3>Stores</h3>
            <SearchInput query={ newQuery } location={ currentLocation } status={ uiState } />
            <GeoLocate status={ uiState } />
          </header>
          <section className="layout__content">
            <div className="layout__content--left search-list">
              <LoadingPanel status={ uiState } />
              <LocatorList stores={ locatorQuery } favourites={ storeFavourites } />
            </div>
            <div className="layout__content--right map">
              <Map stores={ locatorQuery } focus={ mapFocus } user={ currentLocation } />
            </div>
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
