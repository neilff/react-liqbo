import React from 'react';
import Immutable from 'immutable';
import {addons} from 'react/addons';
import {IntlMixin} from 'react-intl';
import {Link} from 'react-router';

require('./_product-card.scss');

var notAvailableImg = require('./not-available.svg');

export default React.createClass({
  mixins: [addons.PureRenderMixin, IntlMixin],

  propTypes: {
    product: React.PropTypes.instanceOf(Immutable.Map),
    favourite: React.PropTypes.bool
  },

  render() {
    const product = this.props.product;
    const favourite = this.props.favourite;
    const productImg = product.get('image_thumb_url');
    const productSale = product.get('has_limited_time_offer');
    const productClearance = product.get('has_clearance_sale');
    const productDiscontinued = product.get('is_discontinued');
    const productPromotion = product.get('has_value_added_promotion');
    const translate = this.getIntlMessage;

    var isFavourite = null;

    if (favourite) {
      isFavourite = <i className="icon ion-android-star"></i>
    }

    return (
      <Link to="product" params={ {productId: product.get('id')} } className="product-card">
        <div className="media-object product-card--inner">
          <div className="media-object__figure product-card__image">
            <img src={ productImg ? productImg : notAvailableImg  } />
          </div>
          <div className="media-object__body">
            <div className="product-card__title">
              <strong>{ isFavourite } { product.get('name') }</strong>
            </div>
            <div className="product-card__description">
              <div>{ product.get('package') }</div>
              <div>{ product.get('origin') }</div>
              <div><strong>${ product.get('price') }</strong></div>
              <div>
                { productSale ? <span className="bubble blue">{ translate('products.on_sale') }</span> : '' }
                { productClearance ? <span className="bubble red">{ translate('products.on_clearance') }</span> : ''  }
                { productDiscontinued ? <span className="bubble red">{ translate('products.is_discontinued') }</span> : ''  }
                { productPromotion ? <span className="bubble">{ translate('products.on_promotion') }</span> : ''  }
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
});
