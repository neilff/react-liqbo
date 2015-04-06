import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import {onProductDetailRequest, onProductDetailQuerySuccess} from '../../../products/actions';
import {getUIState} from '../../../ui/store';
import * as productCursors from '../../../products/store';
import * as favouriteCursors from '../../../favourites/store';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../../../assets/css/core/layout.scss');
require('../../../../../assets/css/components/product-detail.scss');

var notAvailableImg = require('../../../../../assets/img/not-available.svg');

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

    const uiState = getUIState();

    const productImg = product.get('image_url');
    const productSale = product.get('has_limited_time_offer');
    const productClearance = product.get('has_clearance_sale');

    return (
      <DocumentTitle title="Liqbo - Product Detail">
        <main className="layout__body product-detail">
          <header className="layout__header">
            <h3>{ product.get('name') }</h3>
            <Link to="products">Return to Products</Link>
          </header>
          <div className="row">
            <div className="col-sm-4">
              <img src={ productImg ? productImg : notAvailableImg  } />
            </div>
            <div className="col-sm-4">
              <div className="product-detail__description">
                <strong>{ product.get('package') }</strong>
                <div>{ product.get('primary_category') }</div>
                <p>{ product.get('varietal') }</p>

                <div>{ product.get('description') }</div>

                <strong>Style</strong>
                <p>{ product.get('style') }</p>

                <strong>Tasting Notes</strong>
                <p>{ product.get('tasting_note') }</p>

                <strong>Producer</strong>
                <div>{ product.get('producer_name') }</div>
                <p>{ product.get('origin') }</p>

                <div className="product-detail__price"><strong>${ product.get('price') }</strong></div>
                <div>
                  { productSale ? <span className="bubble blue">On Sale</span> : '' }
                  { productClearance ? <span className="bubble red">On Clearance</span> : ''  }
                </div>
              </div>
            </div>
          </div>
        </main>
      </DocumentTitle>
    );
  }
});
