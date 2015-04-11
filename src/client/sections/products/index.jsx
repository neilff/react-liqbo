import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import ProductSearch from '../../components/products/product-search';
import ProductGrid from '../../components/products/product-grid';
import {getUIState} from '../../core/ui/store';
import * as productCursors from '../../core/products/store';
import * as favouriteCursors from '../../core/favourites/store';

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
            <ProductSearch query={ newQuery } status={ uiState } />
          </header>
          <section className="layout__content">
            <ProductGrid products={ products } favourites={ productFavourites } />
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
