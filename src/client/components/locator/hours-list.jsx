import React from 'react';
import LocatorItem from './locator-item';
import Immutable from 'immutable';
import {addons} from 'react/addons';
import {daysOfWeek} from '../../utils/conversion';

require('../../../../assets/css/components/flex-list.scss');
require('../../../../assets/css/components/search-list.scss');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    hours: React.PropTypes.instanceOf(Immutable.OrderedMap)
  },

  render() {
    const hours = this.props.hours;

    return (
      <ul>
        {daysOfWeek.map((day) => {
          return (
            <li key={ day }>
              <div className="flex-list">
                <div className="one">
                  <strong>{ day.toUpperCase() }</strong>
                </div>
                <div className="one">
                  <span>{ hours.get(day).displayFull }</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
});
