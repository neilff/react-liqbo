import R from 'ramda';
import React from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';
import {addons} from 'react/addons';
import {onProductAvailableQueryRequest} from '../../../core/products/actions';

require('./_product-local-search.scss');

export default React.createClass({
  mixins: [addons.PureRenderMixin, IntlMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    product: React.PropTypes.instanceOf(Immutable.Map),
    available: React.PropTypes.instanceOf(Immutable.Map)
  },

  componentWillMount() {
    var productId = this.context.router.getCurrentParams().productId;
    var productAvail = this.props.available.get(productId);

    if (!productAvail) {
      onProductAvailableQueryRequest(productId);
    }
  },

  render() {
    const productId = this.context.router.getCurrentParams().productId;
    const productAvail = this.props.available.get(productId);

    var list = null;

    if (productAvail) {
      list = productAvail.map((item, idx) => {
        return (
          <Link to="locatorDetails" params={ {locatorId: item.get('id')} }>
            <li
              className="search-list__list--item"
              key={ idx } >
              <div className="media-object">
                <div className="media-object__body">
                  { item.get('name') }
                </div>
                <div className="media-object__figure">
                  ({ item.get('quantity') })
                </div>
              </div>
            </li>
          </Link>
        )
      }).toArray();
    }

    return (
      <div className="product-local-search search-list__container">
        <h6 className="product-local-search__title"><i className="icon ion-search"></i> Find Locally</h6>
        <ul className="search-list__list">
          { list }
        </ul>
      </div>
    );
  }
});
