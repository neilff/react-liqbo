import axios from 'axios';
import Q from 'q';
import {keys} from '../../keys/keys';

export const API_ROOT = 'https://lcboapi.com';

export function get(endpoint, params) {
  return axios.get(API_ROOT + endpoint, {
    headers: {
      Authorization: 'Token ' + keys.LCBO_API
    },
    params: params,
    responseType: 'json'
  }).then(function(response) {
    return response.data.result;
  });
}
