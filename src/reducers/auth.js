import * as AuthActions from '../actions/auth';

const initialState = {
	user: null,
	next: null,
	user_details: null
};

export function auth(state = initialState, action) {
	switch (action.type) {
		case AuthActions.LOGIN:
			return Object.assign({}, state, {
				user: action.user
			});

		case AuthActions.ASSIGN_USER_DETAILS:
			return Object.assign({}, state, {
				user_details: action.user_details
			});

		case AuthActions.LOGOUT:
			return Object.assign({}, state, {
				user: null,
				user_details: null
			});

		case AuthActions.SET_NEXT:
			return Object.assign({}, state, {
				next: action.next
			});

		case AuthActions.RESET_NEXT:
			return Object.assign({}, state, {
				next: null
			});

		default:
			return state
	}
}