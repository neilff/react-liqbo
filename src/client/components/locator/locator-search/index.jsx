import React from 'react';
import immutable from 'immutable';
import {IntlMixin} from 'react-intl';
import classNames from 'classnames';
import {addons} from 'react/addons';
import LoadingButton from '../../ui/loading-button';
import SearchOptionList from '../../search/search-options';
import {onLocatorQuerySubmit, onLocatorQueryChange, onLocatorParamToggle} from '../../../core/locator/actions';

export default React.createClass({
  mixins: [addons.PureRenderMixin, IntlMixin],

  propTypes: {
    query: React.PropTypes.instanceOf(immutable.Map),
    location: React.PropTypes.instanceOf(immutable.Map),
    status: React.PropTypes.instanceOf(immutable.Map)
  },

  getInitialState() {
    return {
      isOptionsOpen: false
    };
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

  toggleOptions() {
    var open = this.state.isOptionsOpen;

    this.setState({
      isOptionsOpen: !open
    });
  },

  render() {
    const status = this.props.status;
    const open = this.state.isOptionsOpen;
    const query = this.props.query;

    var expandedItem = classNames({
      'search-component__options': true,
      'search-component__options--expanded': open
    });

    var isLoading = status.get('isQuerying');

    return (
      <div className="search-component">
        <form
          className="search-component__form"
          noValidate
          onSubmit={ this.onSubmit }>
          <input
            autoFocus
            className="u-full-width"
            name="q"
            type="text"
            onChange={ this.onChange }
            placeholder={ this.getIntlMessage('locator.searchText') }
            value={ query.get('q') }
          />
          <LoadingButton
            isLoading={ isLoading }>
            Search
          </LoadingButton>
        </form>
        <div
          className="search-component__options-button"
          onClick={ this.toggleOptions }>
          { this.getIntlMessage('locator.searchOptions') }
        </div>
        <div
          className={ expandedItem }>
          <SearchOptionList
            onSelected={ onLocatorParamToggle }
            type="locator"
            options={ query.get('where') } />
        </div>
      </div>
    );
  }
});
