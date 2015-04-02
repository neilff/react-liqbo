import * as actions from './actions';
import Immutable from 'immutable';
import {queryCursor, locatorCursor} from '../state';
import {register} from '../dispatcher';

const LocatorItem = Immutable.Record({
  id: '',
  name: '',
  address: '',
  postal_code: '',
  city: '',
  latitude: '',
  longitude: ''
});

export const dispatchToken = register(({action, data}) => {

  let query;

  switch (action) {

    /**
     * When the query input is modified
     */
    case actions.onLocatorQueryChange:
      const {name, value} = data;
      queryCursor(query => query.set(name, value));
      break;

    /**
     * When the query response comes in, cast the response as an immutable
     * map and register the items as new records.
     */
    case actions.onLocatorQuerySuccess:
      return locatorCursor(locations => {
        return locations.withMutations(list => {
          list.clear();

          data.forEach(i => {
            list.push(new LocatorItem(i).toMap());
          });
        });
      });
      break;
  };
})

export function getNewQuery() {
  return queryCursor();
}

export function getLocatorQuery() {
  return locatorCursor();
}
