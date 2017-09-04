import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Notifications, { notify } from 'react-notify-toast';


class Login extends React.Component {
	state = {
		email: '',
		password: '',
		error: null
	};

	handleSubmit(event) {
		event.preventDefault();
			firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
				this.setState({ error: error });
				notify.show(error);
			});


	}

	validateForm(){
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
		notify.show("You have entered an invalid email address", "error")
		return false;
	}

	onInputChange(name, event) {
		var change = {};
		change[name] = event.target.value;
		this.setState(change);
	}

	render() {
		var errors = this.state.error ? <p> {this.state.error} </p> : '';
		return (
			<div className=' container'>
					<div className='row text-center justify-content-center'>
							<div className='col-6'>
							<div className='card'>

							<h2 className='card-header'> Student Login </h2>
								<div className='card-block'>

				<form onSubmit={this.handleSubmit.bind(this)}>
					<label>Email <input type='email'
															className='form-control'
					                    placeholder='Email'
					                    value={this.state.email}
					                    onChange={this.onInputChange.bind(this, 'email')}
					/></label>
					<br/>
					<label>Password <input type='password'
																 placeholder='Password'
																className='form-control'
					                       value={this.state.password}
					                       onChange={this.onInputChange.bind(this, 'password')}
					/></label>

					{errors}
					<br/>
					<button type='submit' className='btn btn-primary'>Login</button>
					<Link to='/' className='btn btn-danger'>Cancel</Link>
				</form>
						</div>
					</div>
					</div>
			</div>
			</div>
		);
	}
}

export default connect()(Login);