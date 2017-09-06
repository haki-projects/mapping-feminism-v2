import React, {Component} from 'react';
import { reviseUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

class UserEdit extends Component{
constructor(props) {
  super(props);

  this.state = {
    user: {
      id:'',
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
  createRevisedUser() {
    const stateUser = this.state.user;
    const propsUser = this.props.user_details;
    const newUserValues = stateUser;

    _.forOwn(stateUser, function(value, key){
      if(!value) {
        var copyValue = propsUser[key];
        newUserValues[key] = propsUser[key];
      }
    });
    return newUserValues;
  }

  handleSubmit(event) {
    event.preventDefault();
    const revisedUser = this.createRevisedUser();
    console.log('revised user data', revisedUser);
    this.props.reviseUser(revisedUser);

  }

  onInputChange(name, event) {
    let user = Object.assign({}, this.state.user);
    user[name] = event.target.value;
    this.setState({user});
  }

  render() {
    const user = this.props.user_details;
    return (
      this.props.user_details ?
      <div className='container'>
      <div className='card'>
        <h3 className='card-header'>Update Your Profile </h3>
        <div className='card-block'>
          <form onSubmit={this.handleSubmit.bind(this)}>

          <div className='form-group'>
            <label>First Name </label>
            <input type='text'
                    className='form-control'
                    placeholder={user.first_name ? user.first_name : 'Please enter your first name'}
                    value={this.state.user.first_name}
                    onChange={this.onInputChange.bind(this, 'first_name')}
                    />
          </div>

          <div className='form-group'>
            <label>Last Name </label>
            <input type='text'
                  className='form-control'
                  placeholder={user.last_name ? user.last_name : 'Please enter your last name'}
                  value={this.state.user.last_name}
                  onChange={this.onInputChange.bind(this, 'last_name')}
                  />
          </div>

          <div className='form-group'>
            <label>Bio</label>
            <textarea type='text'
                      rows='5'
                  className='form-control'
                  placeholder={user.bio ? user.bio : 'Please enter your bio'}
                  value={this.state.user.bio}
                  onChange={this.onInputChange.bind(this, 'bio')}
                  />
            </div>

        <button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0'>Save</button>
        <Link className='btn btn-primary ' to='/dashboard'>Back </Link>
        <Link className='btn btn-danger ' to='/dashboard'>Cancel </Link>



          </form>
        </div>
        </div>








      </div>
      :
      <div> loading... </div>

    )}

}

function mapStateToProps(state) {
  return {
    user_details: state.auth.user_details
  }
}

export default connect(mapStateToProps, { reviseUser })(UserEdit);