import * as firebase from 'firebase';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_A_BOOK = 'FETCH_A_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

const booksRef = firebase.database().ref('/');

export function fetchBooks() {
  return (dispatch) => {
    booksRef.on('value', snapshot => {
      dispatch({
        type: FETCH_BOOKS,
        payload: snapshot.val()
      })
    })
  }
}

export function fetchBook(book) {
return {
  type: FETCH_A_BOOK,
  current_book: book
};
}