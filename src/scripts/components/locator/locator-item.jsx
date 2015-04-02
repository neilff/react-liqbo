import React from 'react';
import Immutable from 'immutable';
import {addons} from 'react/addons';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    store: React.PropTypes.instanceOf(Immutable.Map)
  },

  render() {
    const store = this.props.store;

    return (
      <li className="search-list__list--item">
        <div className="media-object">
          <div className="media-object__figure">
            <i className="icon ion-android-star-outline" />
          </div>
          <div className="media-object__body">
            <div className="media-object__title">{ store.get('name') }</div>
            <div>{ store.get('address') }</div>
          </div>
        </div>
      </li>
    );
  }
});
