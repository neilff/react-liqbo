import React from 'react'
import LocatorItem from './locator-item'
import immutable from 'immutable'
import {addons} from 'react/addons'

require('../../../../assets/css/components/search-list.scss');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    stores: React.PropTypes.instanceOf(immutable.List)
  },

  render() {
    return (
      <div className="search-list__container">
        <ul className="search-list__list">
          {this.props.stores.map((store, i) => {
            return <LocatorItem store={store} key={store.get('id')} />
          }).toArray()}
        </ul>
      </div>
    );
  }
});
