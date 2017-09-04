import React  from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../actions/auth';


class Logout extends React.Component {
	componentDidMount() {
		firebase.auth().signOut();
		this.props.onLogout();
		this.props.onRedirect('/');
	}

	render() {
		return null;
	}
}

export default connect(null, dispatch => ({
	onRedirect: (path) => {
		dispatch(push(path));
	},
	onLogout: () => {
		dispatch(logout());
	}
}))(Logout);
