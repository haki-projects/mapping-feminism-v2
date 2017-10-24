import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdminRecords, fetchAllUserDetails } from '../../actions/admin';
import _ from 'lodash';
import BarChart from '../common/bar_chart';



class AdminDashboard extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchAdminRecords();
    this.props.fetchAllUserDetails();

  }
  componentDidUpdate(){
  }

  renderLogs(){
    return _.map(this.props.logData, log => {
      return(
        <tr key={log.id}>
          <td>{log.username}</td>
          <td>{log.action}</td>
          <td>{log.notes}</td>
          <td>{log.timestamp}</td>
        </tr>
      );
    });
  }

  renderUsers(){
    return _.map(this.props.all_users_details, user => {
      return (
        <tr key={user.id}>
          <td>{user.email}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.num_of_edits}</td>
          <td>{user.num_of_entries}</td>
          <td>{user.last_logged_in}</td>
        </tr>
      );
    });
  }

  getBarData(){

  }


  render(){
    return(
      <div className='container'>
      <div>
        <h2 className='text-center'> Admin Dashboard </h2>
      </div>


      <div className='row'>
          <BarChart
            data={Object.keys(this.props.barChartData).map(key => {
              return this.props.barChartData[key];
            })}
             />

     <div className='col-sm-3 text-center bar-chart-details'></div>
      </div>

      <br />


      <div>
      <h3>Users Summary</h3>
        <table className='table table-sm'>
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Num. of Edits</th>
              <th>Num. of Entries</th>
              <th>Last Logged In</th>
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>
        </table>
      </div>

      <hr />







          <div>
          <h3>Activity Logs</h3>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>{this.renderLogs()}</tbody>
            </table>
          </div>


       </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    user_details: state.auth.user_details,
    all_users_details: state.userDetailsRecords,
    logData: state.adminRecords,
    barChartData: state.userDetailsRecords
  }
}

export default connect(mapStateToProps, { fetchAdminRecords, fetchAllUserDetails})(AdminDashboard);