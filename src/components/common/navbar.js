import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class TopNav extends Component {

componentDidMount(){
this.loggedIn();

}
  loggedIn(){
    const user = firebase.auth().currentUser;
    if(this.props.user_details && user) {
      return (
        <div>


        <ul className='nav'>
        <li className='nav-item nav-link'>
          Welcome {this.props.user_details.first_name}!
          </li>
          <li className='nav-item'>
          <Link to='/mapdashboard' className='nav-link'> Author Map </Link>
        </li>
        <li className='nav-item'>
        <Link to='/dashboard' className='nav-link'> Book Chart</Link>
      </li>
        <li className='nav-item'>
          <Link to='/logout' className='nav-link'> Logout </Link>
        </li>
        <li className='nav-item'>


      </li>
      </ul>
</div>
      )
    } else {
      return <div>
      <ul className='nav'>
        <li className='nav-item'>
          <Link to='/login' className='nav-link'> Login </Link>
        </li>
    </ul>
      </div>
    }
  }

  render() {
    return <nav className='navbar justify-content-end fixed-top navbar-toggleable-md navbar-light bg-faded'>
              <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse'>
                <span className='navbar-toggler-icon'></span>
              </button>
{this.loggedIn()}







    </nav>
  }
}
function mapStateToProps(state) {
  return {
    user_details: state.auth.user_details
  }
}

export default connect(mapStateToProps)(TopNav);