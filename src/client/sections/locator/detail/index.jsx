import DocumentTitle from 'react-document-title';
import React from 'react';
import R from 'ramda';
import {Link} from 'react-router';
import LocatorDescription from '../../../components/locator/locator-description';
import {onLocatorDetailRequest} from '../../../core/locator/actions';
import {getUIState} from '../../../core/ui/store';
import * as locatorCursors from '../../../core/locator/store';
import * as favouriteCursors from '../../../core/favourites/store';

require('./_locator-detail.scss');

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount() {
    var locatorId = this.context.router.getCurrentParams().locatorId;

    onLocatorDetailRequest(locatorId);
  },

  render() {
    const locatorId = this.context.router.getCurrentParams().locatorId;
    const location = locatorCursors.getLocatorDetail();
    const favourites = favouriteCursors.getStoreFavourites();

    const uiState = getUIState();

    var checkIfFavourite = R.find(favourite => {
      return favourite.id.toString() === locatorId;
    })(favourites.toJS());

    var isFavourite = typeof checkIfFavourite !== 'undefined';
    var icon = isFavourite ? <i className="icon ion-android-star"></i> : null;
    var storeImg = location ? 'http://maps.googleapis.com/maps/api/staticmap?' +
                   'center=' + location.get('address_line_1') +
                   '&zoom=13&scale=false&size=600x600&maptype=roadmap&sensor=false' +
                   '&format=png&visual_refresh=false&' +
                   'markers=size:mid%7Ccolor:red%7C' + location.get('address_line_1') : null;

    return (
      <DocumentTitle title="Liqbo - Store Detail">
        <main className="layout__body locator-detail">
          <header className="layout__header">
            <Link to="home" className="layout__header--breadcrumb"><i className="icon ion-android-arrow-back"></i> Back to Stores</Link>
            <h3>{ icon }{ location.get('name') }</h3>
          </header>
          <section className="layout__content">
            <div className="layout__content--left">
              <img src={ storeImg } />
            </div>
            <div className="layout__content--right search-list">
              <LocatorDescription location={ location } favourite={ isFavourite } />
            </div>
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
