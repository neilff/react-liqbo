import messages from './messages';
import State from '../lib/state';

const initialLocale = 'en';
const initialState = {
  i18n: {
    formats: {},
    locales: initialLocale,
    messages: messages[initialLocale]
  },
  query: { q: '' },
  locator: [],
  ui: {
    isQuerying: false
  }
};

export const state = new State(initialState);
export const i18nCursor = state.cursor(['i18n']);
export const queryCursor = state.cursor(['query']);
export const locatorCursor = state.cursor(['locator']);
export const uiCursor = state.cursor(['ui']);
