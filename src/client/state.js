import messages from './messages';
import State from '../lib/state';

const initialLocale = 'en';

const initialState = {
  i18n: {
    formats: {},
    locales: initialLocale,
    messages: messages[initialLocale]
  },
  locatorQuery: { q: '' },
  locatorItems: [],
  productQuery: { q: '' },
  productItems: [],
  mapFocus: [{
    id: null,
    latitude: 43.7182713,
    longitude: -79.3777061
  }],
  userLocation: {
    latitude: null,
    longitude: null
  },
  ui: {
    isQuerying: true
  },
  favouriteStores: [],
  favouriteProducts: []
};

export const state = new State(initialState);
export const i18nCursor = state.cursor(['i18n']);
export const locatorQueryCursor = state.cursor(['locatorQuery']);
export const locatorCursor = state.cursor(['locatorItems']);
export const productQueryCursor = state.cursor(['productQuery']);
export const productCursor = state.cursor(['productItems']);
export const uiCursor = state.cursor(['ui']);
export const mapFocusCursor = state.cursor(['mapFocus']);
export const userLocationCursor = state.cursor(['userLocation']);
export const favouriteStoresCursor = state.cursor(['favouriteStores']);
export const favouriteProductsCursor = state.cursor(['favouriteProducts']);
