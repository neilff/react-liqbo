import React from 'react';
import {Link} from 'react-router';

require('./_sidebar.scss');

export default React.createClass({

  render() {
    return (
      <nav className="layout__sidebar sidebar">
        <Link to="home" className="sidebar__logo">
          <h1>Liqbo</h1>
        </Link>
        <div className="sidebar__links">
          <Link to="products" className="sidebar__links--item">
            <div>
              <i className="icon ion-wineglass" />
            </div>
            <div>
              <span className="icon-label">Products</span>
            </div>
          </Link>
          <Link to="locator" className="sidebar__links--item">
            <div>
              <i className="icon ion-android-cart" />
            </div>
            <div>
              <span className="icon-label">Stores</span>
            </div>
          </Link>
          <Link to="favourites" className="sidebar__links--item">
            <div>
              <i className="icon ion-bookmark" />
            </div>
            <div>
              <span className="icon-label">Favourites</span>
            </div>
          </Link>
          <Link to="about" className="sidebar__links--item">
            <div>
              <i className="icon ion-ios-help" />
            </div>
            <div>
              <span className="icon-label">About</span>
            </div>
          </Link>
        </div>
      </nav>
    );
  }
});
