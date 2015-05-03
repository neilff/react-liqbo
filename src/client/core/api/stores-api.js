import {dispatch} from '../dispatcher';
import R from 'ramda';
import debounce from 'debounce';
import {get} from '../server';
import {onLocatorQuerySuccess, onLocatorDetailQuerySuccess, onMapFocus, onLocatorQueryFail} from '../locator/actions.js';
import {onProductAvailableQuerySuccess} from '../products/actions.js';
import {msmTo24time, msmTo12time, daysOfWeek, prettify12Hr} from '../utils/conversion';

/**
 * Builds the operating hours for the provided day of the week
 *
 * @param {object} item LCBO API Store Object
 * @param {object} accObject Accumulator object
 * @param {string} day Day of the week
 * @return {object} Accumulator object
 */
function _buildOperatingHours(item, accObject, day) {
  var open = msmTo12time(item[day + '_open']);
  var close = msmTo12time(item[day + '_close']);
  var prettyOpen = prettify12Hr(open);
  var prettyClose = prettify12Hr(close);

  accObject[day] = {
    open: msmTo24time(item[day + '_open']),
    close: msmTo24time(item[day + '_close']),
    displayOpen: prettyOpen,
    displayClose: prettyClose,
    displayFull: prettyOpen && prettyClose ?
      prettyOpen + ' - ' + prettyClose :
      'Closed'
  };

  return accObject;
}

/**
 * Converts store hours for display purposes
 *
 * @param {object} item LCBO API Store Object
 * @return {object} Modified API object
 */
function _convertStoreHours(item) {
  var dow = R.clone(daysOfWeek);

  item.operatingHours = R.reduce(R.partial(_buildOperatingHours, item), {}, dow);

  return item;
}

/**
 * Calculates if the store is current open based on the clients time
 *
 * @param {object} item LCBO API Store Object
 * @return {object} Modified API object
 */
function _calculateIsOpen(item) {
  var dow = R.clone(daysOfWeek);
  var d = new Date();
  var currentDayNum = d.getDay();
  var currentHour = d.getHours();
  var currentMinute = d.getMinutes();

  var currentDayString = dow[currentDayNum];
  var openHour = item.operatingHours[currentDayString].open[0];
  var openMinute = item.operatingHours[currentDayString].open[1];
  var closeHour = item.operatingHours[currentDayString].close[0];
  var closeMinute = item.operatingHours[currentDayString].close[1];

  item.isOpen = currentHour >= openHour && currentMinute >= openMinute &&
                (currentHour < closeHour || currentHour < closeHour && currentMinute < closeMinute) ?
                'Open' : 'Closed';

  return item;
}

/**
 * Compresses store address into a single line for display purposes
 *
 * @param {object} item LCBO API Store Object
 * @return {object} Modified API object
 */
function _compressAddress(item) {
  item.address = item.address_line_2 ?
    item.address_line_1 + ', ' + item.address_line_2 :
    item.address_line_1;

  return item;
}

function _convertDistance(item) {
  item.distance = item.distance_in_meters ?
    (item.distance_in_meters / 1000).toFixed(2) :
    null;

  return item;
}

var _buildStoreVM = R.pipeP(
  R.map(_convertStoreHours),
  R.map(_compressAddress),
  R.map(_calculateIsOpen),
  R.map(_convertDistance)
);

var _buildDetailVM = R.pipeP(
  _convertStoreHours,
  _compressAddress,
  _calculateIsOpen,
  _convertDistance
);

function _extractCoordinates(stores) {
  onLocatorQuerySuccess(stores);
  onMapFocus(stores);
}

/**
 * Retrieves stores based on the provided query params
 *
 * GET lcboapi.com/stores
 *
 * Response:
 * https://lcboapi.com/docs/v1/stores#many
 *
 */
function _getStores(query) {
  var params = {
    where_not: 'is_dead',
    per_page: 25
  };

  get('/stores', R.merge(params, query))
    .then(_buildStoreVM)
    .then(_extractCoordinates)
    .then(null, onLocatorQueryFail);
}

/**
 * Retrieves a stores details
 *
 * GET lcboapi.com/stores
 *
 * Response:
 * https://lcboapi.com/docs/v1/stores#many
 *
 */
function _getLocation(id) {
  get('/stores/' + id)
    .then(_buildDetailVM)
    .then(onLocatorDetailQuerySuccess)
    .then(null, onLocatorQueryFail);
}

/**
 * Retrieves stores containing the provided product ID
 *
 * GET lcboapi.com/stores?product_id={id}
 *
 * Response:
 * https://lcboapi.com/docs/v1/stores#many
 *
 */
function _getStoresWithProduct(id) {
  var params = {
    product_id: id
  };

  get('/stores', params)
    .then(_buildStoreVM)
    .then(function(stores) {
      return {
        id: id,
        stores: stores
      };
    })
    .then(onProductAvailableQuerySuccess)
    .then(null, onLocatorQueryFail);
}

export var getStores = debounce(_getStores, 500);
export var getLocation = debounce(_getLocation, 500);

export function getStoresWithProduct(id) {
  return debounce(_getStoresWithProduct(id), 500);
}
