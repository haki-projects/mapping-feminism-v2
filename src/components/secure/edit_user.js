import React, {Component} from 'react';
import { connect } from 'react-redux';

class UserEdit extends Component{
constructor(props) {
  super(props);

  this.state = {
    user: {
      bio: '',
      created_on: '',
      email: '',
      first_name: '',
      last_name: '',
      num_of_edits: '',
      num_of_entries: '',
      photo_url: '',
      role: ''
    }
  }
}
  componentDidMount() {

  }

  render() {
    return (
      this.props.user_details ?
      <div> {this.props.user_details.email}</div>
      :
      <div> loading... </div>
    )}

}

function mapStateToProps(state) {
  return {
    user_details: state.auth.user_details
  }
}

export default connect(mapStateToProps)(UserEdit);