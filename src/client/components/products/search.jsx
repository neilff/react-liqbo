import React from 'react';
import Immutable from 'immutable';
import {IntlMixin} from 'react-intl';
import {addons} from 'react/addons';
import LoadingButton from '../ui/loading-button/loading-button';
import {onProductsQuerySubmit, onProductsQueryChange} from '../../products/actions';

export default React.createClass({
  mixins: [addons.PureRenderMixin, IntlMixin],

  propTypes: {
    query: React.PropTypes.instanceOf(Immutable.Map),
    status: React.PropTypes.instanceOf(Immutable.Map)
  },

  onSubmit(e) {
    e.preventDefault();
    onProductsQuerySubmit(this.props.query, this.props.location);
  },

  onKeyDown(e) {
    if (e.key == 'Enter') {
      onProductsQuerySubmit(this.props.query, this.props.location);
    }
  },

  onChange(e) {
    e.persist();
    onProductsQueryChange(e, this.props.location);
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
