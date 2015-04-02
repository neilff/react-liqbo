import React from 'react/addons';
import Immutable from 'immutable';
import {addons} from 'react/addons';

require('../../../../assets/css/components/loading-panel.scss');

var image = require('file?!../../../../assets/img/loading.svg');

console.log(image);

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    status: React.PropTypes.instanceOf(Immutable.Map)
  },

  render() {
    const status = this.props.status;

    var cx = React.addons.classSet;

    var classes = cx({
      'loading-panel': true,
      'loading-panel--visible': status.get('isQuerying')
    });

    return (
      <div className={ classes }>
        <img src={image} />
      </div>
    );
  }
});
