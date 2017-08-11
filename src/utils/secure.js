import * as firebase from 'firebase';
import * as config from '../../firebase.config.js';
import { setNext } from '../actions/auth';

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
		if (firebase.auth().currentUser === null  || firebase.auth().currentUser.role !== 'Administrator') {
			store.dispatch(setNext(nextState.location.pathname));
			replace({
				pathname: '/login', //for now, send them back to the login screen in order to log in as an admin
			})
		}
	}
}


