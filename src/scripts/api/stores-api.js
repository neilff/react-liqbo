import {dispatch} from '../dispatcher';
import R from 'ramda';
import debounce from 'debounce';
import {get} from '../utils/server';
import {onLocatorQuerySuccess} from '../locator/actions.js';

function msmTo24time(msm) {
  var hour = Math.floor(parseInt(msm) / 60);
  var mins = Math.floor(parseInt(msm) % 60);

  return [hour, mins];
}

function convertStoreHours(item) {
  item.sunday_open = msmTo24time(item.sunday_open);
  item.sunday_close = msmTo24time(item.sunday_close);
  item.monday_open = msmTo24time(item.monday_open);
  item.monday_close = msmTo24time(item.monday_close);
  item.tuesday_open = msmTo24time(item.tuesday_open);
  item.tuesday_close = msmTo24time(item.tuesday_close);
  item.wednesday_open = msmTo24time(item.wednesday_open);
  item.wednesday_close = msmTo24time(item.wednesday_close);
  item.thursday_open = msmTo24time(item.thursday_open);
  item.thursday_close = msmTo24time(item.thursday_close);
  item.friday_open = msmTo24time(item.friday_open);
  item.friday_close = msmTo24time(item.friday_close);
  item.saturday_open = msmTo24time(item.saturday_open);
  item.saturday_close = msmTo24time(item.saturday_close);

  return item;
}

var buildStoreVM = R.map(convertStoreHours);

var compressAddress = R.map(function(i) {
  i.address = i.address_line_2 ?
    i.address_line_1 + ', ' + i.address_line_2 :
    i.address_line_1;

  return i;
});

/**
 * GET lcboapi.com/stores
 *
 * Response:
 * https://lcboapi.com/docs/v1/stores#many
 *
 */
function _getStores(params) {
  get('/stores', params)
    .then(R.pipeP(buildStoreVM, compressAddress, onLocatorQuerySuccess))
    .then(null, function(err) {
      // TODO: Handle bad requests
      console.log(err);
    });
}

export var getStores = debounce(_getStores, 500);

