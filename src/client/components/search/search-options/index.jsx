import React from 'react';
import {addons} from 'react/addons';
import Immutable from 'immutable';
import {IntlMixin} from 'react-intl';
import SearchOption from './search-option';

export default React.createClass({
  mixins: [addons.PureRenderMixin, IntlMixin],

  propTypes: {
    options: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    type: React.PropTypes.string.isRequired,
    onSelected: React.PropTypes.func.isRequired
  },

  render() {
    const options = this.props.options;
    const type = this.props.type;
    const onSelected = this.props.onSelected;

    // Map over the list of 'where' options, use the key as the
    // value and keypath for i18n
    var list = options.map((isSelected, i) => {

      return (
        <li>
          <SearchOption
            key={ i }
            selected={ isSelected }
            value={ i }
            onSelected={ onSelected }>
            { this.getIntlMessage(type + '.' + i) }
          </SearchOption>
        </li>
      );
    }).toArray();

    return (
      <ul className="search-component__list">
        { list }
      </ul>
    );
  }
});
