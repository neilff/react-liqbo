import DocumentTitle from 'react-document-title';
import React from 'react';
import {IntlMixin} from 'react-intl';
import {Link, RouteHandler} from 'react-router';
import {state} from '../state';
import Sidebar from './sidebar';
import {onGeoLocateRequest} from '../locator/actions';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../assets/css/core/normalize.scss');
require('../../../assets/css/core/skeleton.scss');
require('../../../assets/css/core/body.scss');

export default React.createClass({
  mixins: [IntlMixin],

  componentDidMount() {
    require('fastclick').attach(document.body);

    onGeoLocateRequest();

    state.on('change', () => {
      // console.time('whole app rerender')
      this.forceUpdate(() => {
        // console.timeEnd('whole app rerender')
      });
    });
  },

  render() {
    return (
      <DocumentTitle title="Liqbo">
        <div className="layout">
          <Sidebar />
          <RouteHandler />
        </div>
      </DocumentTitle>
    );
  }
});
