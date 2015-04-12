import messages from '../messages';
import State from '../utils/state';

const initialLocale = 'en';

const initialState = {
  i18n: {
    formats: {},
    locales: initialLocale,
    messages: messages[initialLocale]
  },
  locatorQuery: {
    q: '',
    where: {
      has_wheelchair_accessability: false,
      has_bilingual_services: false,
      has_product_consultant: false,
      has_tasting_bar: false,
      has_beer_cold_room: false,
      has_special_occasion_permits: false,
      has_vintages_corner: false,
      has_parking: false,
      has_transit_access: false
    }
  },
  locatorItems: [],
  productQuery: {
    q: '',
    where: {
      is_discontinued: false,
      has_value_added_promotion: false,
      has_limited_time_offer: false,
      has_bonus_reward_miles: false,
      is_seasonal: false,
      is_vqa: false,
      is_ocb: false,
      is_kosher: false
    }
  },
  productItems: [],
  productDetails: {},
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
export const productDetailCursor = state.cursor(['productDetails']);
export const uiCursor = state.cursor(['ui']);
export const mapFocusCursor = state.cursor(['mapFocus']);
export const userLocationCursor = state.cursor(['userLocation']);
export const favouriteStoresCursor = state.cursor(['favouriteStores']);
export const favouriteProductsCursor = state.cursor(['favouriteProducts']);
