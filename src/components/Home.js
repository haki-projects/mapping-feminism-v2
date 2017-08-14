import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

class Home extends React.Component {
	render() {
		return (
			<div>

				<div className="jumbotron text-center">
      <div className="container">
        <h1 className="display-3">Mapping Feminism</h1>
        <p>Discover how feminist theory has evolved</p>

				<Link to='/login' className='btn btn-primary btn-lg login'>Login</Link>
				<Link to='/register' className='btn btn-success btn-lg'>Register</Link>
      </div>
    </div>
          <div className='container'>
            </div>

    <footer className="container-fluid text-center">
      <p>Footer Text</p>
    </footer>

			</div>
		)
	}
}

export default connect()(Home);
