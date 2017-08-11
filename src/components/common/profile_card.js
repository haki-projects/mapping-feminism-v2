import React, { Component } from 'react';
import { Link } from 'react-router';



class ProfileCard extends Component {

  render(){

    return (

      <div>
      <div className='card card-outline-success'>
							<div className='card-header'>Your Name </div>
							<div className="row align-items-center">
								<div className="col">
									<img className='profile-pic rounded-circle' src={require('../../../public/images/dummy_profile.png')} alt='profile'></img>
								</div>
							</div>
							<div className='card-block'>
							<ul className='list-group list-group-flush'>
								<li className='list-group-item'>
									<p className='card-text'>Bio:Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
									Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
									 dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellen
										tesque eu, pretium quis, sem. Nulla consequat massa quis enim. </p>
									</li>
								<li className='list-group-item'>Member Since: </li>
								<li className='list-group-item'>Last Logged in: </li>
							</ul>
							<div className='row'>
								<div className='col'># of Entries</div>
								<div className='col'># of Edits</div>
								<div className='col'># of Logins</div>
							</div>
							<div className='row'>
								<Link to='/#' className='col'>see more</Link>
							</div>

						</div>

					</div></div>


    );
  }

};

export default ProfileCard;