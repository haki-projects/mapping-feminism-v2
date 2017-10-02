import * as firebase from 'firebase';
import {notify} from 'react-notify-toast';

export const FETCH_AUTHOR_RECORDS = 'FETCH_AUTHOR_RECORDS';
export const CREATE_AUTHOR_RECORD = 'CREATE_AUTHOR_RECORD';

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