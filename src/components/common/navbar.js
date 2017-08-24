import React, { Component } from 'react';
import { Link } from 'react-router';

class TopNav extends Component {

  render() {
    return <nav className='navbar justify-content-end fixed-top navbar-toggleable-md navbar-light bg-faded'>
              <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse'>
                <span className='navbar-toggler-icon'></span>
              </button>
              <div className='justify-content-center'> Welcome!</div>


              <ul className='nav'>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'> Login or log out </Link>
                </li>
                <li className='nav-item'>
                <Link to='/login' className='nav-link'> Profile</Link>
              </li>
              </ul>


    </nav>
  }
}

export default TopNav;

