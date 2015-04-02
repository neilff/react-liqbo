import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import SearchInput from './search';
import LocatorList from './locator-list';
import LoadingPanel from './loading-panel';
// import Map from '../map/map';
import {getUIState} from '../../ui/store';
import {getNewQuery, getLocatorQuery} from '../../locator/store';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../../assets/css/core/layout.scss');

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
              <h4>Map Content</h4>
            </div>
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
