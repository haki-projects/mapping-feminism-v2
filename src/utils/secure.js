import * as firebase from 'firebase';
import * as config from '../../firebase.config.js';
import { setNext } from '../actions/auth';
import { isAdmin } from '../utils/helper_functions';

firebase.initializeApp(config);

/**
 * This function takes in the store as an argument (so we can update the reducer with the new state. in our case. we are passing protected urls to the
 * setNext action creator in order to keep everything in sync.)
 * so basically, this function checks to see if a user is logged into firebase before sending them to a protected page. if they are not logged in,
 * then we set the router (being tracked/sycned int he application state) to the old url. then we use the replace function to send them back to the login screen.
 * eventually, we will set up a requireAuth function to handle the administrator role
 * @param {*} store
 */
export function requireAuth(store) {
	return function (nextState, replace) {
		if (firebase.auth().currentUser === null) {
			store.dispatch(setNext(nextState.location.pathname));
			replace({
				pathname: '/login',
			})
		}
	}
}

//Used to authenticate paths for administrator roles
//TODO: hook this up within rest of code.
export function requireAuthAndAdmin(store){
	return function (nextState, replace) {
		if (firebase.auth().currentUser === null || isAdmin(firebase.auth().currentUser.uid) == false) {
			store.dispatch(setNext(nextState.location.pathname));
			replace({
				pathname: '/login', //for now, send them back to the login screen in order to log in as an admin
			})
		}
	}
}

export function setUserNumberOfEntries(user){
	console.log('this is the user object passed when entry edited:', user);
	var updates ={};
	updates['/user_details/' + user.id + '/' + 'num_of_entries'] = parseInt(user.num_of_entries) + 1;

		firebase.database().ref().update(updates, revisedUser => {

		})
	}

	export function setUserNumberOfEdits(user){
		console.log('this is the user object passed when entry edited:', user);
		var updates ={};
		updates['/user_details/' + user.id + '/' + 'num_of_edits'] = parseInt(user.num_of_edits) + 1;

			firebase.database().ref().update(updates, revisedUser => {

			})
		}



