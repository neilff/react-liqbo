import React from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';
import {IntlMixin} from 'react-intl';
import {addons} from 'react/addons';
import LoadingButton from '../../ui/loading-button';
import SearchOptionList from '../../search/search-options';
import {onProductsQuerySubmit, onProductsQueryChange, onProductsParamToggle} from '../../../core/products/actions';

require('./_search-component.scss');

export default React.createClass({
  mixins: [addons.PureRenderMixin, IntlMixin],

  propTypes: {
    query: React.PropTypes.instanceOf(Immutable.Map),
    status: React.PropTypes.instanceOf(Immutable.Map)
  },

  getInitialState() {
    return {
      isOptionsOpen: false
    };
  },

  onSubmit(e) {
    e.preventDefault();
    onProductsQuerySubmit(this.props.query.get('q'), this.props.location);
  },

  onKeyDown(e) {
    if (e.key == 'Enter') {
      onProductsQuerySubmit(this.props.query.get('q'), this.props.location);
    }
  },

  onChange(e) {
    e.persist();
    onProductsQueryChange(e, this.props.location);
  },

  toggleOptions() {
    var open = this.state.isOptionsOpen;

    this.setState({
      isOptionsOpen: !open
    });
  },

  render() {
    const status = this.props.status;
    const query = this.props.query;
    const open = this.state.isOptionsOpen;

    var expandedItem = classNames({
      'search-component__options': true,
      'search-component__options--expanded': open
    });

    var isLoading = status.get('isQuerying');

    return (
      <div className="search-component">
        <form className="search-component__form" noValidate onSubmit={ this.onSubmit }>
          <input
            autoFocus
            className="u-full-width"
            name="q"
            type="text"
            onChange={ this.onChange }
            placeholder={ this.getIntlMessage('products.searchText') }
            value={ query.get('q') }
          />
          <LoadingButton isLoading={ isLoading }>
            Search
          </LoadingButton>
        </form>
        <div
          className="search-component__options-button"
          onClick={ this.toggleOptions }>
           { this.getIntlMessage('products.searchOptions') }
        </div>
        <div
          className={ expandedItem }>
          <SearchOptionList
            onSelected={ onProductsParamToggle }
            type="products"
            options={ query.get('where') } />
        </div>
      </div>
    );
  }
});
