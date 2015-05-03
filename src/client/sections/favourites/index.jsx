import DocumentTitle from 'react-document-title';
import React from 'react';
import {getUIState} from '../../core/ui/store';
import {getStoreFavourites, getProductFavourites} from '../../core/favourites/store';

require('./_favourites.scss');

export default React.createClass({
  render() {
    const uiState = getUIState();
    const favouriteLocations = getStoreFavourites();
    const favouriteProducts = getProductFavourites();

    var productList = favouriteProducts.map((product, i) => {
      return <li>{ product.get('name') }</li>
    }).toArray();

    productList = productList.length > 0 ? productList : 'You have no favourite products.';

    var locatorList = favouriteLocations.map((location, i) => {
      return <li>{ location.get('name') }</li>
    }).toArray();

    locatorList = locatorList.length > 0 ? locatorList : 'You have no favourite locations.';

    return (
      <DocumentTitle title="Liqbo - Product Finder">
        <main className="layout__body">
          <header className="layout__header">
            <h3>Favourites</h3>
          </header>
          <section className="layout__content favourites">
            <div className="favourites__column">
              Locations
              <ul>
                { locatorList }
              </ul>
            </div>
            <div className="favourites__column">
              Products
              <ul>
                { productList }
              </ul>
            </div>
          </section>
        </main>
      </DocumentTitle>
    );
  }
});
