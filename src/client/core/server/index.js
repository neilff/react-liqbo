import axios from 'axios';
import Q from 'q';

export const API_ROOT = '/api/';

export function get(endpoint, params) {
  return axios.get(API_ROOT + endpoint, {
    params: params,
    responseType: 'json'
  }).then(function(response) {
    return response.data.result;
  });
}
