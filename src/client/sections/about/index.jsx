import DocumentTitle from 'react-document-title';
import React from 'react';
import {getUIState} from '../../core/ui/store';

export default React.createClass({
  render() {
    const uiState = getUIState();

    return (
      <DocumentTitle title="Liqbo - Product Finder">
        <main className="layout__body">
          <header className="layout__header">
            <h3>About</h3>
          </header>
          <section className="layout__content">
            <h3>About Us</h3>
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
