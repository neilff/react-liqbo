import React from 'react/addons';
import Immutable from 'immutable';
import {addons} from 'react/addons';
import classNames from 'classnames';
import LoadingButton from '../ui/loading-button';
import {onGeoLocateRequest} from '../../core/locator/actions';

require('./_geolocator.scss');

var spinner = require('./spinner.svg');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    status: React.PropTypes.instanceOf(Immutable.Map)
  },

  geoLocateUser() {
    onGeoLocateRequest();
  },

  render() {
    const status = this.props.status;

    var isLoading = status.get('isQuerying');

    return (
      <LoadingButton className="geolocator" isLoading={ isLoading } onClick={ this.geoLocateUser }>
        <i className="icon ion-navigate"></i>
      </LoadingButton>
    );
  }
});
