import DocumentTitle from 'react-document-title';
import React from 'react';
import {IntlMixin} from 'react-intl';
import {Link, RouteHandler} from 'react-router';
import {state} from '../../core/state';
import Sidebar from '../../components/sidebar';
import {onGeoLocateRequest} from '../../core/locator/actions';
import {onProductsQuerySubmit} from '../../core/products/actions';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../styles/normalize.scss');
require('../../../styles/skeleton.scss');
require('../../../styles/main.scss');

export default React.createClass({
  mixins: [IntlMixin],

  componentDidMount() {
    require('fastclick').attach(document.body);

    onProductsQuerySubmit();
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
