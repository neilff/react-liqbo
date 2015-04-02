import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import SearchInput from './search';
import Map from './map';
import LocatorList from './locator-list';
import LoadingPanel from './loading-panel';
import {getUIState} from '../../ui/store';
import {Gmaps, Marker} from 'react-gmaps';
import {getNewQuery, getLocatorQuery} from '../../locator/store';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../../assets/css/core/layout.scss');

var coords = {
  lat: 43.7182713,
  lng: -79.3777061
};

export default React.createClass({
  render() {
    const newQuery = getNewQuery();
    const locatorQuery = getLocatorQuery();
    const uiState = getUIState();

    return (
      <DocumentTitle title="Liqbo - Store Locator">
        <main className="layout__body">
          <header className="layout__header">
            <h2>Stores</h2>
            <SearchInput query={ newQuery } />
          </header>
          <section className="layout__content">
            <div className="layout__content--left search-list">
              <LoadingPanel status={ uiState } />
              <LocatorList stores={ locatorQuery } />
            </div>
            <div className="layout__content--right map">
              <Map stores={ locatorQuery } />
            </div>
          </section>
        </main>
      </DocumentTitle>
    );
  },

  onMapCreated(component) {
    console.log('onMapCreated', component.getMap());

    component.getMap().setOptions({
      disableDefaultUI: true
    });
  },

  onClick() {
    console.log('onClick');
  }
});
