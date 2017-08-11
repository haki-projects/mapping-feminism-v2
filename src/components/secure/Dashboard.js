import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Dashboard extends React.Component {
	render() {
		return (
			<div className='container'>
				<h1 className='text-center'>Your Dashboard</h1>
				<div className='row text-center'>
					<div className='col-sm-4'>
						<div className='card'>
							<div className='card-header'>Your Name </div>
							<div className="row align-items-center">
								<div className="col">
									<img className='profile-pic ' src={require('../../../public/images/dummy_profile.png')} alt='profile'></img>
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

					</div>
					</div>
					<div className='col-sm-8 justify-content-center'>
						Dashboard charts
					</div>
				Welcome
				<br/>
				<Link to='/profile'>Profile</Link>
				<br/>
				<Link to='/logout'>Logout</Link>
			</div>
			</div>
		)
	}
}

export default connect()(Dashboard);
