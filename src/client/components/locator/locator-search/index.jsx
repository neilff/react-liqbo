import React from 'react';
import immutable from 'immutable';
import {IntlMixin} from 'react-intl';
import {addons} from 'react/addons';
import LoadingButton from '../../ui/loading-button';
import {onLocatorQuerySubmit, onLocatorQueryChange} from '../../../core/locator/actions';

export default React.createClass({
  mixins: [addons.PureRenderMixin, IntlMixin],

  propTypes: {
    query: React.PropTypes.instanceOf(immutable.Map),
    location: React.PropTypes.instanceOf(immutable.Map),
    status: React.PropTypes.instanceOf(immutable.Map)
  },

  onSubmit(e) {
    e.preventDefault();
    onLocatorQuerySubmit(this.props.query.get('q'), this.props.location);
  },

  onKeyDown(e) {
    if (e.key == 'Enter') {
      onLocatorQuerySubmit(this.props.query.get('q'), this.props.location);
    }
  },

  onChange(e) {
    e.persist();
    onLocatorQueryChange(e, this.props.location);
  },

  render() {
    const status = this.props.status;

    var isLoading = status.get('isQuerying');

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
        <LoadingButton isLoading={ isLoading }>
          Search
        </LoadingButton>
      </form>
    );
  }
});
