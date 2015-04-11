import React from 'react/addons';
import Immutable from 'immutable';
import {addons} from 'react/addons';
import classNames from 'classnames';

require('./loading-button.scss');

var spinner = require('./spinner.svg');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  },

  render() {
    var isLoading = this.props.isLoading;
    var className = this.props.className;
    var onClick = this.props.onClick;

    var classes = {
      'loading-button': true,
      'is-loading': isLoading
    };

    if (className) {
      classes[className] = true;
    }

    var classes = classNames(classes);

    return (
      <button className={ classes } disabled={ isLoading } onClick={ onClick }>
        <span className="loading-button__spinner">
          <img src={ spinner } />
        </span>
        <span className="loading-button__content">
          { this.props.children }
        </span>
      </button>
    );
  }
});
