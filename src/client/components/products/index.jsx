import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import SearchInput from './search';
import ProductGrid from './product-grid';
import {getUIState} from '../../ui/store';
import * as productCursors from '../../products/store';
import * as favouriteCursors from '../../favourites/store';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../../assets/css/core/layout.scss');

export default React.createClass({
  render() {
    const newQuery = productCursors.getNewQuery();
    const products = productCursors.getProductQuery();
    const productFavourites = favouriteCursors.getProductFavourites();

    const uiState = getUIState();

    return (
      <DocumentTitle title="Liqbo - Product Finder">
        <main className="layout__body">
          <header className="layout__header">
            <h3>Products</h3>
            <SearchInput query={ newQuery } status={ uiState } />
          </header>
          <section className="layout__content">
            <ProductGrid products={ products } favourites={ productFavourites } />
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
