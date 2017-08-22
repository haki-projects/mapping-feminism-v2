import { FETCH_BOOKS, FETCH_A_BOOK } from '../actions/books';
import _ from 'lodash';

//TODO: SEE IF THERE IS A BETTER WAY TO INITIALIZE STATE OR IF IT HAS TO BE THE SAME AS THE OTHER REDUCER
export function books(state = {}, action) {
  switch (action.type) {
    case FETCH_BOOKS:
    return _.mapKeys(action.payload, 'id');

    default:
    return state;
  };
}

export function current_book(state = {}, action) {
  console.log(action);
  switch (action.type) {

    case FETCH_A_BOOK:
    return null;

    default:
    return state;
  }
}