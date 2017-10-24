import * as firebase from 'firebase';
import {notify} from 'react-notify-toast';


export const FETCH_AUTHOR_RECORDS = 'FETCH_AUTHOR_RECORDS';
export const CREATE_AUTHOR_RECORD = 'CREATE_AUTHOR_RECORD';
export const REVISE_AUTHOR = 'REVISE_AUTHOR';
export const DELETE_AUTHOR = 'DELETE_AUTHOR';

const authorRef = firebase.database().ref('/authors/');

export function fetchAuthorRecords() {
  return (dispatch) => {
    authorRef.on('value', snapshot => {
      dispatch({
        type: FETCH_AUTHOR_RECORDS,
        payload: snapshot.val()
      })
    })
  }
}

export function reviseAuthor(author) {
  var updates = {}; // to be populated with any other updates to the Firebase database
  updates['/authors/' + author.id] = author;
  return(dispatch) => {
    firebase.database().ref().update(updates, revisedAuthor => {
      notify.show('Info Saved!', 'success', 3000);
      dispatch({
        type: REVISE_AUTHOR,
        author: author,
      })
    })
  }
}
export function setUserNumberOfEntries(user){
	console.log('this is the user object passed when logging in:', user);
	var updates ={};
	updates['/user_details/' + user.id + '/' + 'num_of_edits'] = user.num_of_entries + 1;
	return(dispatch) => {
		firebase.database().ref().update(updates, revisedUser => {
			dispatch({
				type: 'UPDATE_USER_NUM_OF_EDITS',
			})
		})
	}
}
export function setUserNumberOfEdits(user){
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

export function createAuthorRecord(authorRecord, backToDashboard) {
  var updates ={};
  var newAuthorRecordKey = firebase.database().ref().child('authors').push().key; //let firebase generate a key for new record
  authorRecord.id = newAuthorRecordKey;
  updates['/authors/' + newAuthorRecordKey] = authorRecord; //add the new record to the updates object

  return (dispatch) => {
    firebase.database().ref().update(updates, addedRecord => {
      backToDashboard();
      notify.show('Author Record created!', 'success', 3000);
      dispatch({
        type: CREATE_AUTHOR_RECORD,
        authorRecord
      })
    })

  }

}

export function deleteAuthor(id, backToDashboard) {
  var updates = {}; //using an update instead of a .remove() allows us to add more database revisions to this object in the future
  updates['/authors/' + id] = null; //sets the location to null, which removes the book

    return (dispatch) => {
      firebase.database().ref().update(updates, author => {
        backToDashboard();
        dispatch({
          type: DELETE_AUTHOR,
          id: id
        })
      })
    }

  }