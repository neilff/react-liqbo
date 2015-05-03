import DocumentTitle from 'react-document-title';
import React from 'react';
import {addons} from 'react/addons';
import Immutable from 'immutable';
import R from 'ramda';
import {Link} from 'react-router';
import {onProductDetailRequest, onProductDetailQuerySuccess} from '../../../core/products/actions';
import {getUIState} from '../../../core/ui/store';
import * as productCursors from '../../../core/products/store';
import * as favouriteCursors from '../../../core/favourites/store';
import {onAddProductFavourite, onRemoveProductFavourite} from '../../../core/favourites/actions';

require('./_product-description.scss');

var notAvailableImg = require('./not-available.svg');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    favourite: React.PropTypes.bool
  },

  addFavourite(product, e) {
    e.preventDefault();
    onAddProductFavourite(product.toJS());
  },

  removeFavourite(product, e) {
    e.preventDefault();
    onRemoveProductFavourite(product.get('id'));
  },

  render() {
    const product = this.props.product;
    const isFavourite = this.props.favourite;
    const productImg = product.get('image_url');
    const productSale = product.get('has_limited_time_offer');
    const productClearance = product.get('has_clearance_sale');

    var addFavourite = R.partial(this.addFavourite, product);
    var removeFavourite = R.partial(this.removeFavourite, product);

    return (
      <div className="product-description">
        <div className="product-description__image">
          <img src={ productImg ? productImg : notAvailableImg  } />
          {
            !isFavourite ?
              <button className="btn btn--blue" onClick={ addFavourite }>
                <i className="icon ion-android-add"></i> Add as Favourite
              </button> :
              <button className="btn btn--red" onClick={ removeFavourite }>
                <i className="icon ion-android-remove"></i> Remove Favourite
              </button>
          }
        </div>
        <div className="product-description__body">
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

          <div className="product-description__price"><strong>${ product.get('price') }</strong></div>
          <div>
            { productSale ? <span className="bubble blue">On Sale</span> : '' }
            { productClearance ? <span className="bubble red">On Clearance</span> : ''  }
          </div>
        </div>
      </div>
    );
  }
});
