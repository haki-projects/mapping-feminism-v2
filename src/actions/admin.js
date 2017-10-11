import * as firebase from 'firebase';

export const FETCH_ADMIN_RECORDS = 'FETCH_ADMIN_RECORDS';
export const FETCH_ALL_USER_DETAILS = 'FETCH_ALL_USER_DETAILS';


const logsRef = firebase.database().ref('/logs/');
const userDetailsRef = firebase.database().ref('/user_details/');

export function fetchAllUserDetails() {
  return (dispatch) => {
    userDetailsRef.on('value', snapshot => {
      dispatch({
        type: FETCH_ALL_USER_DETAILS,
        payload: snapshot.val()
      })
    })
  }
}


export function fetchAdminRecords(){
  return (dispatch) => {
    logsRef.on('value', snapshot => {
      dispatch({
        type: FETCH_ADMIN_RECORDS,
        payload: snapshot.val()
      })
    })
  }
}