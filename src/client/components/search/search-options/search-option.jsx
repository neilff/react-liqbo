import React from 'react';
import {addons} from 'react/addons';
import immutable from 'immutable';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    selected: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string.isRequired,
    onSelected: React.PropTypes.func.isRequired
  },

  toggleSelect(e) {
    e.persist();
    this.props.onSelected(e);
  },

  render() {
    const selected = this.props.selected;
    const value = this.props.value;

    return (
      <label>
        <input
          className="search-component__checkbox"
          type="checkbox"
          name={ value }
          value={ value }
          checked={ selected }
          onChange={ this.toggleSelect }/>
          { this.props.children }
      </label>
    );
  }
});
