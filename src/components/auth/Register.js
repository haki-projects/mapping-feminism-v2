import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Register extends React.Component {
	state = {
		email: '',
		password: '',
		error: null
	};

	handleSubmit(event) {
		event.preventDefault();
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
				this.setState({ error: error });
			});
	}

	onInputChange(name, event) {
		var change = {};
		change[name] = event.target.value;
		this.setState(change);
	}

	render() {
		var errors = this.state.error ? <p> {this.state.error} </p> : '';
		return (
			<div className = 'container'>
				<div className='row text-center justify-content-center'>
					<div className='col-6'>
					<div className='card'>

				<h1 className='card-header'>Register</h1>
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
																	className='form-control'
					                       placeholder='Password'
					                       value={this.state.password}
					                       onChange={this.onInputChange.bind(this, 'password')}
					/></label>

					{errors}
					<br/>
					<button className='btn btn-primary' type='submit'>Register</button>
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

export default connect()(Register);