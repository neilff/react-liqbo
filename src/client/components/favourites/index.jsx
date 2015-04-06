import DocumentTitle from 'react-document-title';
import React from 'react';
import {getUIState} from '../../ui/store';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../../assets/css/core/layout.scss');

export default React.createClass({
  render() {
    const uiState = getUIState();

    return (
      <DocumentTitle title="Liqbo - Product Finder">
        <main className="layout__body">
          <header className="layout__header">
            <h3>Favourites</h3>
          </header>
          <section className="layout__content">
            <h3>Favourites</h3>
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
