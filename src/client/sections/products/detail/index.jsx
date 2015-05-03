import DocumentTitle from 'react-document-title';
import React from 'react';
import R from 'ramda';
import {Link} from 'react-router';
import ProductDescription from '../../../components/products/product-description';
import ProductLocalSearch from '../../../components/products/product-local-search';
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

    onProductDetailRequest(productId);
  },

  render() {
    const productId = this.context.router.getCurrentParams().productId;
    const product = productCursors.getProductDetail();
    const productAvail = productCursors.getProductAvailability();
    const favourites = favouriteCursors.getProductFavourites();

    const uiState = getUIState();

    var checkIfFavourite = R.find(favourite => {
      return favourite.id.toString() === productId;
    })(favourites.toJS());

    var isFavourite = typeof checkIfFavourite !== 'undefined';
    var icon = isFavourite ? <i className="icon ion-android-star"></i> : null;

    return (
      <DocumentTitle title="Liqbo - Product Detail">
        <main className="layout__body product-detail">
          <header className="layout__header">
            <Link to="products" className="layout__header--breadcrumb"><i className="icon ion-android-arrow-back"></i> Back to Products</Link>
            <h3>{ icon }{ product.get('name') }</h3>
          </header>
          <section className="layout__content">
            <div className="layout__content--left">
              <ProductDescription product={ product } favourite={ isFavourite } />
            </div>
            <div className="layout__content--right search-list">
              <ProductLocalSearch available={ productAvail } />
            </div>
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
