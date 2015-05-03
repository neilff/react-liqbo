import DocumentTitle from 'react-document-title';
import React from 'react';
import {addons} from 'react/addons';
import Immutable from 'immutable';
import HoursList from '../hours-list';
import R from 'ramda';
import {Link} from 'react-router';
import {onAddLocationFavourite, onRemoveLocationFavourite} from '../../../core/favourites/actions';

require('./_locator-description.scss');

var notAvailableImg = require('./not-available.svg');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    favourite: React.PropTypes.bool
  },

  addFavourite(location, e) {
    e.preventDefault();
    onAddLocationFavourite(location.toJS());
  },

  removeFavourite(location, e) {
    e.preventDefault();
    onRemoveLocationFavourite(location.get('id'));
  },

  render() {
    const location = this.props.location;
    const isFavourite = this.props.favourite;
    const hours = Immutable.OrderedMap(location.get('operatingHours'));

    var addFavourite = R.partial(this.addFavourite, location);
    var removeFavourite = R.partial(this.removeFavourite, location);

    console.log(location.toJS());

    return (
      <div className="locator-description">
        <div className="locator-description__row">
          <div className="locator-description__column locator-description__title">
            <strong>{ location.get('address_line_1') }</strong>
            <div>{ location.get('address_line_2') }</div>
            <div>{ location.get('city') }, { location.get('postal_code') }</div>
            <strong>{ location.get('isOpen') }</strong>
          </div>
          <div className="locator-description__column locator-description__add-favourite">
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
        </div>
        <div className="locator-description__row">
          <div className="locator-description__column">
            <div>
              <strong>Details</strong>
            </div>
            <div className="media-object">
              <div className="media-object__body">
                <ul>
                  <li>Store #{ location.get('id') }</li>
                  <li>{ location.get('telephone') }</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="locator-description__column">
            <div>
              <strong>Hours of Operation</strong>
            </div>
            <div className="media-object">
              <div className="media-object__body">
                <HoursList hours={ hours }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
