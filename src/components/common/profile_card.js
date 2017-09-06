import React, { Component } from 'react';
import { Link } from 'react-router';



class ProfileCard extends Component {

  render(){
		if(!this.props.user){
			return <div>loading user...</div>
		}

		const { user } = this.props;

    return (

      <div>
      <div className='card card-outline-success'>
							<div className='card-header'>Name: {user.first_name && user.last_name ? user.first_name + ' ' + user.last_name:(<Link to='/dashboard/users/user/:id'>Update Name</Link>)}
							</div>
							<div className="row align-items-center">
								<div className="col">
									<img className='profile-pic rounded-circle' src={require('../../../public/images/dummy_profile.png')} alt='profile'></img>
								</div>
							</div>
							<div className='card-block'>
							<ul className='list-group list-group-flush'>
								<li className='list-group-item'>
									<p className='card-text'>{user.bio} </p>
									</li>
								<li className='list-group-item'>Member Since: {user.created_on} </li>
								<li className='list-group-item'>Last Logged in: {user.last_logged_in}</li>
							</ul>
							<div className='row'>
								<div className='col'># of Entries: {user.num_of_entries}</div>
								<div className='col'># of Edits: {user.num_of_edits}</div>
							</div>


						</div>

					</div></div>


    );
  }

};

export default ProfileCard;