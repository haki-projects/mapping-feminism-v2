import * as firebase from 'firebase';
import {notify} from 'react-notify-toast';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_A_BOOK = 'FETCH_A_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const REVISE_BOOK = 'REVISE_BOOK';
export const CREATE_BOOK = 'CREATE_BOOK';

const booksRef = firebase.database().ref('/books/');

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
export function reviseBook(book) {
  var updates = {}; //to be populated with any other updates to the FB database
  updates['/books/'+ book.id] = book;
  //Add update to increase the number of edits by 1
  return(dispatch) => {
    firebase.database().ref().update(updates, revisedBook => {
      notify.show('Info Saved!', 'success', 3000);
      dispatch({
          type: REVISE_BOOK,
          book: book,
      })
    })
  }
}
export function setUserNumberOfEntries(user){
	console.log('this is the user object passed when logging in:', user);
	var updates ={};
	updates['/user_details/' + user.id + '/' + 'num_of_edits'] = user.num_of_edits + 1;
	return(dispatch) => {
		firebase.database().ref().update(updates, revisedUser => {
			dispatch({
				type: 'UPDATE_USER_NUM_OF_EDITS',
			})
		})
	}
}



export function createBook(book, backToDashboard){
  var updates = {};
  var newBookKey = firebase.database().ref().child('books').push().key;
  book.id = newBookKey;
  updates['/books/' + newBookKey] = book;

  return (dispatch) => {
    firebase.database().ref().update(updates, addedBook => {
      backToDashboard();
      notify.show('Book created!', 'success', 2000);
        dispatch({
            type: CREATE_BOOK,
            book: book
          })
    })
  }
}

export function deleteBook(id, backToDashboard) {
var updates = {}; //using an update instead of a .remove() allows us to add more database revisions to this object in the future
updates['/books/' + id] = null; //sets the location to null, which removes the book

  return (dispatch) => {
    firebase.database().ref().update(updates, book => {
      backToDashboard();
      dispatch({
        type: DELETE_BOOK,
        id: id
      })
    })
  }

}

export function fetchBook(id) {
return {
  type: FETCH_A_BOOK,
  book_id: id
};
}

