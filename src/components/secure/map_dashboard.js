import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuthorRecords } from '../../actions/authors';
import { Link } from 'react-router';
import AuthorMap from '../common/author_map';
import _ from 'lodash';
import * as firebase from 'firebase';
import worldMapData from '../../../public/world.json';
import AuthorTable from '../common/author_table';


class MapDashboard extends React.Component {
  componentDidMount(){
    this.props.fetchAuthorRecords();

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

  renderAuthorsTableData() {
    return _.map(this.props.markerData), author => {
        return (
          <tr key={author.id}>
            <td>{author.author_first_name}</td>
            <td>{author.author_last_name}</td>
            <td>{author.publisher_name_1}</td>
            <td>{author.publisher_name_2}</td>
            <td>{author.publisher_name_3}</td>
            <td>{author}</td>
            <td>{author}</td>
            <td>{author}</td>
          </tr>
        );
    }
  }


  render() {

    return (
  <div className='container-fluid'>
      <h1 className='text-center'> Map of Authors </h1>

      <br />

    <div className='row text-center'>
      <div className='col-sm-12'>
        <AuthorMap worldMapData = {worldMapData}
                    markerData = {Object.keys(this.props.author_records).map(key => {
                      return this.props.author_records[key];
                    })}/>
      </div>
      </div>

      <div>
      {this.canAddAuthor()}
      </div>

      <div className='row text-center'>
      <div className='col-sm-12'>
            Table of Author Data
            <AuthorTable />
      </div>
      </div>










    </div>






    )
  }
}

function mapStateToProps(state) {
  return {
    user_details: state.auth.user_details,
    author_records: _.map(state.authorRecords)
  }
};

export default connect(mapStateToProps, { fetchAuthorRecords })(MapDashboard);

