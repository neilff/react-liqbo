import React from 'react';
import immutable from 'immutable';
import {IntlMixin} from 'react-intl';
import {addons} from 'react/addons';
import {onLocatorQuerySubmit, onLocatorQueryChange} from '../../locator/actions';

export default React.createClass({
  mixins: [addons.PureRenderMixin, IntlMixin],

  propTypes: {
    query: React.PropTypes.instanceOf(immutable.Map)
  },

  onSubmit(e) {
    e.preventDefault();
    onLocatorQuerySubmit(this.props.query);
  },

  onKeyDown(e) {
    if (e.key == 'Enter') {
      onLocatorQuerySubmit(this.props.query);
    }
  },

  onChange(e) {
    e.persist();
    onLocatorQueryChange(e);
  },

  render() {
    return (
      <form className="search-list__input" noValidate onSubmit={ this.onSubmit }>
        <input
          autoFocus
          className="u-full-width"
          name="q"
          type="text"
          onChange={ this.onChange }
          placeholder={ this.getIntlMessage('locator.searchText') }
          value={this.props.query.get('q')}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
});
