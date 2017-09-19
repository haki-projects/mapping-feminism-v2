import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AuthorMap from '../common/author_map';
import _ from 'lodash';
import * as firebase from 'firebase';
import worldMapData from '../../../public/world.json';


class MapDashboard extends React.Component {
  componentDidMount(){

  }
  canAddAuthor(){
		const user = this.props.user_details;
	if (user){
		if(user.role == 'ADMIN'){
			return (
				<Link to='/mapdashboard/author/create' className='btn btn success'>Add Author data </Link>
			)
		}
	}
	return <div></div>

	}
  render() {

    return (<div className='container-fluid'>
      <h1 className='text-center'> Map of Authors </h1>
      <br />
      <div className='row text-center'>
        <div className='col-sm-7 chart-area card'>
        <AuthorMap worldMapData = {worldMapData}/>
        </div>

        <div className='col-sm-4 chart-area card'>testing</div>
<div>
        {this.canAddAuthor()}
</div>
      </div>










    </div>






    )
  }
}

function mapStateToProps(state) {
  return {
    user_details: state.auth.user_details
  }
};

export default connect(mapStateToProps)(MapDashboard);

