import React from 'react/addons';
import Immutable from 'immutable';
import {addons} from 'react/addons';
import classNames from 'classnames';
import LoadingButton from '../ui/loading-button/loading-button';
import {onGeoLocateRequest} from '../../locator/actions';

require('../../../../assets/css/components/geolocator.scss');

var spinner = require('../../../../assets/img/loading.svg');

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
