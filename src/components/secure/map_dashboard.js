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


  renderAuthorsTableData() {
    return _.map(this.props.author_table_data, author => {
        return (
          <tr key={author.id}>
            <td>{author.author_first_name}</td>
            <td>{author.author_last_name}</td>
            <td>{author.book_title_1} - {author.publisher_name_1}</td>
            <td>{author.book_title_2} - {author.publisher_name_2}</td>
            <td>{author.book_title_3} - {author.publisher_name_3}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        );
    })
  }


  render() {

    return (
  <div className='container-fluid'>
      <h1 className='text-center'> Map of Authors </h1>

      <br />

    <div className='row text-center'>
      <div className='col-sm-12'>
        <AuthorMap worldMapData = {worldMapData}
                    user_details={this.props.user_details}
                    markerData = {Object.keys(this.props.author_records).map(key => {
                      return this.props.author_records[key];
                    })}/>
      </div>
      </div>
      <hr />
      <div className='row text-center'>
      <div className='col-sm-12 justify-content-center card chart-area'>
      <br />
        <h3>Author Details</h3>

        <div className='single-author-details text-left card-body'></div>




      </div>
    </div>

      <div className='row text-center'>
      <div className='col-sm-12'>
           <h3> Table of Author Data </h3>
            <AuthorTable authorData={this.renderAuthorsTableData()}/>
      </div>
      </div>










    </div>






    )
  }
}

function mapStateToProps(state) {
  return {
    user_details: state.auth.user_details,
    author_records: _.map(state.authorRecords),
    author_table_data: state.authorRecords
  }
};

export default connect(mapStateToProps, { fetchAuthorRecords })(MapDashboard);

