import React from 'react';
import Immutable from 'immutable';
import {addons} from 'react/addons';
import ProductCard from './product-card';

require('../../../../assets/css/components/product-list.scss');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    products: React.PropTypes.instanceOf(Immutable.List),
    favourites: React.PropTypes.instanceOf(Immutable.List)
  },

  render() {
    const products = this.props.products;
    const favourites = this.props.favourites;

    var productList = products.map((product, i) => {
      return <ProductCard key={ product.get('id') } product={ product } />
    }).toArray();

    return (
      <div className="product-list">
        { productList }
      </div>
    );
  }
});
