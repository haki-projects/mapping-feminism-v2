import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AuthorMap from '../common/author_map';
import _ from 'lodash';
import * as firebase from 'firebase';


class MapDashboard extends React.Component {
  render() {

    return (<div className='container-fluid'>
      <h1 className='text-center'> Map of Authors </h1>
      <br />
      <div className='row text-center'>
        <div className='col-sm-8 chart-area card'>
        <AuthorMap />
        </div>

        <div className='col-sm-3 chart-area card'></div>
      </div>










    </div>






    )
  }
}

export default MapDashboard;

