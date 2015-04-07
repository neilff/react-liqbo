import React from 'react';
import R from 'ramda';
import classNames from 'classnames';
import Immutable from 'immutable';
import {addons} from 'react/addons';
import HoursList from './hours-list';
import {onMapFocus} from '../../locator/actions';
import {onAddLocationFavourite, onRemoveLocationFavourite} from '../../favourites/actions';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    store: React.PropTypes.instanceOf(Immutable.Map),
    favourite: React.PropTypes.bool
  },

  getInitialState() {
    return {
      isDetailsOpen: false
    };
  },

  focusStore(store, e) {
    e.preventDefault();
    onMapFocus([store]);
  },

  addFavourite(store, e) {
    e.preventDefault();
    onAddLocationFavourite(store.toJS());
  },

  removeFavourite(store, e) {
    e.preventDefault();
    onRemoveLocationFavourite(store.get('id'));
  },

  toggleDetails() {
    var open = this.state.isDetailsOpen;

    this.setState({
      isDetailsOpen: !open
    });
  },

  render() {
    const store = this.props.store;
    const favourite = this.props.favourite;
    const open = this.state.isDetailsOpen;
    const hours = Immutable.OrderedMap(store.get('operatingHours'));

    var focusStore = R.partial(this.focusStore, store);
    var addFavourite = R.partial(this.addFavourite, store);
    var removeFavourite = R.partial(this.removeFavourite, store);

    var expandedClasses = classNames({
      'media-object__expanded': true,
      'media-object__expanded--visible': open
    });

    var expandedItem = classNames({
      'search-list__list--item': true,
      'search-list__list--item--expanded': open
    });

    var arrowClasses = classNames({
      'icon': true,
      'icon--small': true,
      'ion-ios-arrow-down': !open,
      'ion-ios-arrow-up': open
    });

    var distanceInMeters = null;
    var isFavourite = null;

    if (store.get('distance')) {
      distanceInMeters = <div className="media-object__figure">
        { store.get('distance') } km
      </div>
    }

    if (favourite) {
      isFavourite = <i className="icon ion-android-star"></i>
    }

    return (
      <li className={ expandedItem }>
        <div className="media-object clickable" onClick={ this.toggleDetails }>
          <div className="media-object__body">
            <strong className="media-object__title">{ isFavourite } { store.get('name') }</strong>
            <div>{ store.get('address') }</div>
            <div>{ store.get('city') }</div>
            <strong>{ store.get('isOpen') }</strong>
          </div>
          { distanceInMeters }
          <div className="media-object__figure">
            <i className={ arrowClasses } />
          </div>
        </div>
        <div className={ expandedClasses }>
          <div>
            <strong>Details</strong>
          </div>
          <div className="media-object">
            <div className="media-object__body">
              <ul>
                <li>Store #{ store.get('id') }</li>
                <li>{ store.get('telephone') }</li>
              </ul>
            </div>
            <div className="media-object__body">
              <div>
                <strong></strong>
              </div>
              <ul>
                <li className="text-right">
                  <a href onClick={ focusStore }>Find on Map</a>
                </li>
                <li className="text-right">
                  {
                    isFavourite ?
                      <a href onClick={ removeFavourite }>Remove Favourite</a> :
                      <a href onClick={ addFavourite }>Add as Favourite</a>
                  }
                </li>
              </ul>
            </div>
          </div>
          <div className="media-object">
            <div className="media-object__body">
              <div>
                <strong>Hours of Operation</strong>
              </div>
              <HoursList hours={ hours }/>
            </div>
          </div>
        </div>
      </li>
    );
  }
});
