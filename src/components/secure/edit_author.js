import React, { Component } from 'react';
import { fetchAuthorRecords, reviseAuthor } from '../../actions/authors';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setUserNumberOfEntries } from '../../utils/secure';
import _ from 'lodash';
import Notifications, {notify} from 'react-notify-toast';
import { createLog } from '../../utils/logger';

class AuthorEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: {
        id: '',
        author_first_name: '',
        author_last_name: '',
        birthplace_longitude: '',
        birthplace_latitude: '',
        birthplace_marker_color: '',

        last_workplace_name: '',
        last_workplace_longitude: '',
        last_workplace_latitude: '',
        last_workplace_marker_color: '',


        book_title_1: '',
        publisher_name_1: '',
        publisher_longitude_1: '',
        publisher_latitude_1: '',
        marker_color_1:'',

        book_title_2: '',
        publisher_name_2: '',
        publisher_longitude_2: '',
        publisher_latitude_2: '',
        marker_color_2:'',

        book_title_3: '',
        publisher_name_3: '',
        publisher_longitude_3: '',
        publisher_latitude_3: '',
        marker_color_3:''
      },
      saving_status:''
    };
  }
  componentDidMount(){
    this.props.fetchAuthorRecords();
  }

  handleSubmit(event) {
    event.preventDefault();
    const revisedAuthor = this.createRevisedAuthor();

    this.props.reviseAuthor(revisedAuthor);

    //update log and update user details (eventually combine these updates into one function?)
    createLog(
      this.props.user_details.email,'revise',
      'Author record changed: ' + revisedAuthor.author_first_name + ' ' + revisedAuthor.author_last_name);
    setUserNumberOfEntries(this.props.user_details);

  }

  createRevisedAuthor() {
    const stateAuthor = this.state.author;
    const propsAuthor = this.props.current_author;
    const newAuthorValues = stateAuthor;

    _.forOwn(stateAuthor, function(value, key){
      if(!value) {
        var copyValue=propsAuthor[key];
        newAuthorValues[key] = propsAuthor[key];
      }
    });
    newAuthorValues.revised_by = this.props.user_details.email;
    return newAuthorValues;
  }

  onInputChange(name, event) {
    let author = Object.assign( {}, this.state.author);
    author[name] = event.target.value;
    this.setState({author});
  }

  onDeleteClick(){

  }

  canDelete() {
    const user = this.props.user_details;
    if(user) {
      if(user.role === 'ADMIN'){
        return (
          <button className='btn btn-danger btn-sm float-right' onClick={this.onDeleteClick.bind(this)}>Delete Record</button>
        )
      }
    }
    return <div></div>
  };

render() {
  if(!this.props.current_author) {
    return <div className='container text-center'> loading...</div>
  }
  const author = this.props.current_author;

  return(
    <div className='container'>
    <Notifications />
      <div className='card'>
        <h3 className='card-header'>
          Author: {author.author_first_name + ' ' + author.author_last_name}
        </h3>

        <div className='card-block'>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <h3> Author Information </h3>
          <div className='form-inline'>
            <label className='mb-2 mr-sm-2 mb-sm-0'> Author First Name </label>
              <input type='text'
                    className='form-control mb-2 mr-sm-2 mb-sm-0'
                    placeholder={author.author_first_name}
                    value={this.state.author.author_first_name}
                    onChange={this.onInputChange.bind(this, 'author_first_name')} />

              <label className='mb-2 mr-sm-2 mb-sm-0'> Author Last Name </label>
              <input type='text'
                    className='form-control mb-2 mr-sm-2 mb-sm-0'
                    placeholder= {author.author_last_name}
                    value={this.state.author.author_last_name}
                    onChange={this.onInputChange.bind(this, 'author_last_name')} />
          </div>

          <br />

          <h5><label className='mb-2 mr-sm-2 mb-sm-0'> Birthplace</label></h5>
          <div className='form-inline'>
          <label className='mb-2 mr-sm-2 mb-sm-0'> Longitude</label>
          <input type='text'
                className='form-control mb-2 mr-sm-2 mb-sm-0'
                placeholder={author.birthplace_longitude}
                value={this.state.author.birthplace_longitude}
                onChange={this.onInputChange.bind(this, 'birthplace_longitude')} />
          <label className='mb-2 mr-sm-2 mb-sm-0'> Latitude</label>
          <input type='text'
                className='form-control mb-2 mr-sm-2 mb-sm-0'
                placeholder={author.birthplace_latitude}
                value={this.state.author.birthplace_latitude}
                onChange={this.onInputChange.bind(this, 'birthplace_latitude')} />
                <a target='_blank' href='http://www.latlong.net/'>Search</a>
          </div>

          <br />
          <hr />
          <h3> Publisher Information </h3>
          <div className='card card-block'>
            <div className='form-group'>
            <label className='mb-2 mr-sm-2 mb-sm-0'>Book Title</label>
            <input type='text'
                  className='form-control mb-2 mr-sm-2 mb-sm-0'
                  placeholder={author.book_title_1}
                  value={this.state.author.book_title_1}
                  onChange={this.onInputChange.bind(this, 'book_title_1')} />
              </div>
              <div className='form-group'>
              <label className='mb-2 mr-sm-2 mb-sm-0'>Publisher Name</label>
              <input type='text'
                    className='form-control mb-2 mr-sm-2 mb-sm-0'
                    placeholder={author.publisher_name_1}
                    value={this.state.author.publisher_name_1}
                    onChange={this.onInputChange.bind(this, 'publisher_name_1')} />
                </div>

                <label> Publisher Location </label>
                <div className='form-inline'>
                <label className='mb-2 mr-sm-2 mb-sm-0'> Longitude</label>
                <input type='text'
                className='form-control mb-2 mr-sm-2 mb-sm-0'
                placeholder={author.publisher_longitude_1}
                value={this.state.author.publisher_longitude_1}
                onChange={this.onInputChange.bind(this, 'publisher_longitude_1')} />

                <label className='mb-2 mr-sm-2 mb-sm-0'> Latitude</label>
                <input type='text'
                className='form-control mb-2 mr-sm-2 mb-sm-0'
                placeholder={author.publisher_latitude_1}
                value={this.state.author.publisher_latitude_1}
                onChange={this.onInputChange.bind(this, 'publisher_latitude_1')} />
                <a target='_blank' href='http://www.latlong.net/'>Search</a>
                </div>
              </div>

              <div className='card card-block'>
                <div className='form-group'>
                <label className='mb-2 mr-sm-2 mb-sm-0'>Book Title</label>
                <input type='text'
                      className='form-control mb-2 mr-sm-2 mb-sm-0'
                      placeholder={author.book_title_2}
                      value={this.state.author.book_title_2}
                      onChange={this.onInputChange.bind(this, 'book_title_2')} />
                  </div>
                  <div className='form-group'>
                  <label className='mb-2 mr-sm-2 mb-sm-0'>Publisher Name</label>
                  <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder={author.publisher_name_2}
                        value={this.state.author.publisher_name_2}
                        onChange={this.onInputChange.bind(this, 'publisher_name_2')} />
                    </div>

                    <label> Publisher Location </label>
                    <div className='form-inline'>
                    <label className='mb-2 mr-sm-2 mb-sm-0'> Longitude</label>
                    <input type='text'
                    className='form-control mb-2 mr-sm-2 mb-sm-0'
                    placeholder={author.publisher_longitude_2}
                    value={this.state.author.publisher_longitude_2}
                    onChange={this.onInputChange.bind(this, 'publisher_longitude_2')} />

                    <label className='mb-2 mr-sm-2 mb-sm-0'> Latitude</label>
                    <input type='text'
                    className='form-control mb-2 mr-sm-2 mb-sm-0'
                    placeholder={author.publisher_latitude_2}
                    value={this.state.author.publisher_latitude_2}
                    onChange={this.onInputChange.bind(this, 'publisher_latitude_2')} />
                    <a target='_blank' href='http://www.latlong.net/'>Search</a>
                    </div>
                  </div>

                  <div className='card card-block'>
                    <div className='form-group'>
                    <label className='mb-2 mr-sm-2 mb-sm-0'>Book Title</label>
                    <input type='text'
                          className='form-control mb-2 mr-sm-2 mb-sm-0'
                          placeholder={author.book_title_3}
                          value={this.state.author.book_title_3}
                          onChange={this.onInputChange.bind(this, 'book_title_3')} />
                      </div>
                      <div className='form-group'>
                      <label className='mb-2 mr-sm-2 mb-sm-0'>Publisher Name</label>
                      <input type='text'
                            className='form-control mb-2 mr-sm-2 mb-sm-0'
                            placeholder={author.publisher_name_3}
                            value={this.state.author.publisher_name_3}
                            onChange={this.onInputChange.bind(this, 'publisher_name_3')} />
                        </div>

                        <label> Publisher Location </label>
                        <div className='form-inline'>
                        <label className='mb-2 mr-sm-2 mb-sm-0'> Longitude</label>
                        <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder={author.publisher_longitude_3}
                        value={this.state.author.publisher_longitude_3}
                        onChange={this.onInputChange.bind(this, 'publisher_longitude_3')} />

                        <label className='mb-2 mr-sm-2 mb-sm-0'> Latitude</label>
                        <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder={author.publisher_latitude_3}
                        value={this.state.author.publisher_latitude_3}
                        onChange={this.onInputChange.bind(this, 'publisher_latitude_3')} />
                        <a target='_blank' href='http://www.latlong.net/'>Search</a>
                        </div>
                      </div>
              <br />
              <hr />
              <br />




          <h5><label>Last Place of Work</label></h5>
          <div className='form-group'>
          <label className='mb-2 mr-sm-2 mb-sm-0'>Name</label>
          <input type='text'
                className='form-control mb-2 mr-sm-2 mb-sm-0'
                placeholder={author.last_workplace_name}
                value={this.state.author.last_workplace_name}
                onChange={this.onInputChange.bind(this, 'last_workplace_name')} />
                </div>
          <div className='form-inline'>
          <label className='mb-2 mr-sm-2 mb-sm-0'>Longitude</label>
          <input type='text'
                className='form-control mb-2 mr-sm-2 mb-sm-0'
                placeholder={author.last_workplace_longitude}
                value={this.state.author.last_workplace_longitude}
                onChange={this.onInputChange.bind(this, 'last_workplace_longitude')} />

            <label className='mb-2 mr-sm-2 mb-sm-0'>Latitude</label>
            <input type='text'
                  className='form-control mb-2 mr-sm-2 mb-sm-0'
                  placeholder={author.last_workplace_latitude}
                  value={this.state.author.last_workplace_latitude}
                  onChange={this.onInputChange.bind(this, 'last_workplace_latitude')} />
                  <a target='_blank' href='http://www.latlong.net/'>Search</a>
            </div>


              <br />

              {this.state.saving ? (
                <button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0' disabled>Saving...</button>
              ):(<button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0'>Save</button>)}
              <Link className='btn btn-primary ' to='/mapdashboard'>Back </Link>
              <Link className='btn btn-danger ' to='/mapdashboard'>Cancel </Link>



        </form>
        </div>
        </div>

</div>
  )
}














}

function mapStateToProps(state, ownProps) {
  const id = ownProps.params.id;
  return {
    user_details: state.auth.user_details,
    current_author: state.authorRecords[id]
  };
}
export default connect(mapStateToProps, { fetchAuthorRecords, reviseAuthor }) (AuthorEdit);