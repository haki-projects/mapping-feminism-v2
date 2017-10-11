import * as firebase from 'firebase';
import { notify } from 'react-notify-toast';
import moment from 'moment';

export const LOGIN = 'LOGIN';
export const ASSIGN_USER_DETAILS = 'ASSIGN_USER_DETAILS';
export const REVISE_USER = 'REVISE_USER';
export const LOGOUT = 'LOGOUT';

export const SET_NEXT = 'SET_NEXT';
export const RESET_NEXT = 'RESET_NEXT';


//user details needs its own action here. once it has it's own action where it fetches the userdetails, we can pass those
//details to the reducer, which then adds them to app state. Make sure to clear the userdetails once the user logs out.
export function login(user) {
	return {
		type: LOGIN,
		user
	}
}



/**
 * Called when a user logs into the website. The function first checks to see if the user details exist in Firebase (first time log-in)
 * If they dont exist, a user_details record is created in Firebase. After that, firebase listens for changes to this user_details location
 * Any changes to the location (such as the reviseUser function), will dispatch ASSIGN_USER_DETAILS to the appropriate reducer
 * @param {*} user
 */
export function assignUser(user){
	var userDetailsRef = firebase.database().ref('/user_details/' + user.uid);
	return (dispatch) => {
		userDetailsRef.once('value', snapshot => {
			//User does not exist yet. create the user record
			if(snapshot.val() == null){
					firebase.database().ref('/user_details/' + user.uid).set({
						id: user.uid,
						bio:'',
						created_on: moment().format('YYYY MM DD'),
						first_name: '',
						last_name: '',
						last_logged_in: '',
						num_of_edits: 0,
						num_of_entries: 0,
						photo_url: '',
						email: user.email,
						role: 'STUDENT'
					});
			}
		});

		userDetailsRef.on('value', snapshot => {
			dispatch({
				type: ASSIGN_USER_DETAILS,
				user_details: snapshot.val()
			})
		});
}
}

/**
 * Used when editing a user's details in the edit_user.js.
 * It takes the revised user record and updates the record on Firebase
 * @param {*} user
 */
export function reviseUser(user) {
	var updates = {};
	updates['/user_details/' + user.id] = user;
	return(dispatch) => {
		firebase.database().ref().update(updates, revisedUser => {
			notify.show('User Info Saved!', 'success', 3000);
			dispatch({
				type: REVISE_USER,
				user: user
			})
		})
	}
}

export function setUserLoginTime(user){
	console.log('this is the user object passed when logging in:', user);
	var updates ={};
	updates['/user_details/' + user.uid + '/' + 'last_logged_in'] = moment().format('MMMM Do YYYY, h:mm:ss a');
	return(dispatch) => {
		firebase.database().ref().update(updates, revisedUser => {
			dispatch({
				type: 'UPDATE_USER_LOGIN_TIME',
			})
		})
	}
}

export function logout() {
	//update user's last_logged_in function to the the current time
	return {
		type: LOGOUT

	}
}




export function setNext(next) {
	return {
		type: SET_NEXT,
		next
	}
}

export function resetNext() {
	return {
		type: RESET_NEXT
	}
}

function createUserDetails(user){
	user.created_on = '';
	user.email = user.email;
	user.role = 'STUDENT';
	return user;
}

