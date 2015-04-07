import DocumentTitle from 'react-document-title';
import React from 'react';
import R from 'ramda';
import {Link} from 'react-router';
import ProductDescription from './product-description';
import {onProductDetailRequest, onProductDetailQuerySuccess} from '../../../products/actions';
import {getUIState} from '../../../ui/store';
import * as productCursors from '../../../products/store';
import * as favouriteCursors from '../../../favourites/store';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../../../assets/css/core/layout.scss');
require('../../../../../assets/css/components/product-detail.scss');

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount() {
    var productId = this.context.router.getCurrentParams().productId;

    // Scan the product cursor for the provided ID, if it exists, use it
    // Otherwise, request it from the API
    const products = productCursors.getProductQuery();

    var foundProduct = products.find(i => {
      return i.get('id').toString() === productId;
    });

    if (foundProduct) {
      onProductDetailQuerySuccess(foundProduct);
    } else {
      onProductDetailRequest(productId);
    }
  },

  render() {
    const product = productCursors.getProductDetail();
    const favourites = favouriteCursors.getProductFavourites();

    const uiState = getUIState();

    return (
      <DocumentTitle title="Liqbo - Product Detail">
        <main className="layout__body product-detail">
          <header className="layout__header">
            <h3>{ product.get('name') }</h3>
            <Link to="products">Return to Products</Link>
          </header>
          <section className="layout__content">
            <div className="layout__content--left">
              <ProductDescription product={ product } favourites={ favourites } />
            </div>
            <div className="layout__content--right">
            </div>
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
