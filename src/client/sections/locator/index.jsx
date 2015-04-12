import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import LocatorSearch from '../../components/locator/locator-search';
import Map from '../../components/locator/map';
import LocatorList from '../../components/locator/locator-list';
import LoadingPanel from '../../components/ui/loading-panel';
import {getUIState} from '../../core/ui/store';
import {Gmaps, Marker} from 'react-gmaps';
import GeoLocate from '../../components/geolocator';
import * as storeCursors from '../../core/locator/store';
import * as favouriteCursors from '../../core/favourites/store';

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
            <LocatorSearch
              query={ newQuery }
              location={ currentLocation }
              status={ uiState } />
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
