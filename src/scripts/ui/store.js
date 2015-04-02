import {register} from '../dispatcher';
import {uiCursor} from '../state';
import * as locatorActions from '../locator/actions';

export const dispatchToken = register(({action, data}) => {

  let state;

  switch (action) {

    /**
     * When a store query occurs
     */
    case locatorActions.onLocatorQueryChange:
      uiCursor(state => state.set('isQuerying', true));
      break;

    case locatorActions.onLocatorQuerySubmit:
      uiCursor(state => state.set('isQuerying', true));
      break;

    /**
     * When a store query returns successfully
     */
    case locatorActions.onLocatorQuerySuccess:
      uiCursor(state => state.set('isQuerying', false));
      break;
  };
});

export function getUIState() {
  return uiCursor();
}
