import { FETCH_ADMIN_RECORDS, FETCH_ALL_USER_DETAILS } from '../actions/admin';
import _ from 'lodash';

export function adminRecords(state = {}, action) {
  switch (action.type) {
    case FETCH_ADMIN_RECORDS:
    return _.mapKeys(action.payload, 'id');

    default:
    return state;
  }
}

export function userDetailsRecords(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_USER_DETAILS:
    return _.mapKeys(action.payload, 'id');

    default:
    return state;
  }
}