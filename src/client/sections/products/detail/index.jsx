import DocumentTitle from 'react-document-title';
import React from 'react';
import R from 'ramda';
import {Link} from 'react-router';
import ProductDescription from '../../../components/products/product-description';
import {onProductDetailRequest, onProductDetailQuerySuccess} from '../../../core/products/actions';
import {getUIState} from '../../../core/ui/store';
import * as productCursors from '../../../core/products/store';
import * as favouriteCursors from '../../../core/favourites/store';

require('./_product-detail.scss');

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
            <Link to="products" className="layout__header--breadcrumb"><i className="icon ion-android-arrow-back"></i> Back to Products</Link>
            <h3>{ product.get('name') }</h3>
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
