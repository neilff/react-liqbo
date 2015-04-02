import React from 'react';
import {Link} from 'react-router';

require('../../../../assets/css/components/navigator.scss');

export default React.createClass({

  render() {
    return (
      <nav className="layout__navigation navigator">
        <div className="navigator__logo">
          <h1>Liqbo</h1>
        </div>
        <div className="navigator__links">
          <Link to="home" className="navigator__links--item">
            <div>
              <i className="icon ion-wineglass" />
            </div>
            <div>
              <span className="icon-label">Drinks</span>
            </div>
          </Link>
          <Link to="locator" className="navigator__links--item">
            <div>
              <i className="icon ion-android-cart" />
            </div>
            <div>
              <span className="icon-label">Stores</span>
            </div>
          </Link>
        </div>
      </nav>
    );
  }
});
