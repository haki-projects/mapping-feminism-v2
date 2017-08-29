import * as firebase from 'firebase';

export const LOGIN = 'LOGIN';
export const ASSIGN_USER_DETAILS = 'ASSIGN_USER_DETAILS';
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

export function assignUser(user){
	var userDetailsRef = firebase.database().ref('/user_details/' + user.uid);
	return (dispatch) => {
		//Check if userDetailsRef gets a location back, if it doesnt, that means the user does not exist yet, and needs to be created, then go to the step
		//where we send the user details to the reducer
		userDetailsRef.once('value', snapshot => {
			if(snapshot.val() == null){
					firebase.database().ref('/user_details/' + user.uid).set({
						created_on: '',
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

export function logout() {
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

