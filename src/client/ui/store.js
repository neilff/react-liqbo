import {register} from '../dispatcher';
import {uiCursor} from '../state';
import * as locatorActions from '../locator/actions';

export const dispatchToken = register(({action, data}) => {

  let state;

  switch (action) {

    /**
     * Store Query Events
     */
    case locatorActions.onLocatorQueryChange:
      uiCursor(state => state.set('isQuerying', true));
      break;

    case locatorActions.onLocatorQuerySubmit:
      uiCursor(state => state.set('isQuerying', true));
      break;

    case locatorActions.onLocatorQuerySuccess:
      uiCursor(state => state.set('isQuerying', false));
      break;

    /**
     * Geolocation Query Events
     */
    case locatorActions.onGeoLocateRequest:
      uiCursor(state => state.set('isQuerying', true));
      break;

    case locatorActions.onGeoLocationFail:
      uiCursor(state => state.set('isQuerying', false));
      break;
  };
});

export function getUIState() {
  return uiCursor();
}
