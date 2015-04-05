import React from 'react/addons';
import Immutable from 'immutable';
import {addons} from 'react/addons';
import classNames from 'classnames';

require('../../../../assets/css/components/loading-panel.scss');

var spinner = require('../../../../assets/img/loading.svg');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    status: React.PropTypes.instanceOf(Immutable.Map)
  },

  render() {
    const status = this.props.status;

    var classes = classNames({
      'loading-panel': true,
      'loading-panel--visible': status.get('isQuerying')
    });

    return (
      <div className={ classes }>
        <div className="loading-panel__wrapper">
          <img src={ spinner } />
        </div>
      </div>
    );
  }
});
