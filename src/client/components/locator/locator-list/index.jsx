import React from 'react'
import LocatorItem from '../locator-item'
import Immutable from 'immutable'
import {addons} from 'react/addons'

require('./_search-list.scss');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    stores: React.PropTypes.instanceOf(Immutable.List),
    favourites: React.PropTypes.instanceOf(Immutable.List)
  },

  render() {
    const stores = this.props.stores;
    const favourites = this.props.favourites;

    var storeList = stores.map((store, i) => {
      var id = store.get('id');

      var checkIfFavourite = favourites.find(i => {
        return i.get('id') === id;
      });

      var idx = (i + 1);

      var isFavourite = typeof checkIfFavourite !== 'undefined';

      return (
        <LocatorItem
          idx={ idx }
          key={ id }
          store={ store }
          favourite={ isFavourite } />
      );
    }).toArray()

    return (
      <div className="search-list__container">
        <ul className="search-list__list">
          { storeList }
        </ul>
      </div>
    );
  }
});
