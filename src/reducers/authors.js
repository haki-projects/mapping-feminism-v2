import { FETCH_AUTHOR_RECORDS } from '../actions/authors';
import _ from 'lodash';

export function authorRecords(state = {}, action) {
  switch (action.type) {
    case FETCH_AUTHOR_RECORDS:
    return _.mapKeys(action.payload, 'id');

    default:
    return state;
  };
}