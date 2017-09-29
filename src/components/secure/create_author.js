import React, { Component } from 'react';
import { createAuthorRecord } from '../../actions/authors';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

class AuthorCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      author: {
        id: '',
        author_first_name: '',
        author_last_name: '',
        birthplace: {
          longitude: '',
          latitude: '',
          marker_color: ''
        },
        last_workplace: {
          longitude: '',
          latitude: '',
          marker_color: ''
        },
        author_books: [
          {
            book_title: '',
            publisher_name: '',
            publisher_longitude: '',
            publisher_latitude: '',
            marker_color:''
        },
        {
          book_title: '',
          publisher_name: '',
          publisher_longitude: '',
          publisher_latitude: '',
          marker_color:''
      },
      {
        book_title: '',
        publisher_name: '',
        publisher_longitude: '',
        publisher_latitude: '',
        marker_color:''
    },

        ]
      },
      saving:false
    };
  }

  componentDidMount(){

  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      saving: true
    });
    const newAuthorRecord = this.state.author;
    newAuthorRecord.color = this.getRecordColor(newAuthorRecord);

    //Add action to create a new record
    this.props.createAuthorRecord(newAuthorRecord, () => {
      this.props.router.push('/mapdashboard');
    });

    this.setState({
      saving:false
    })

  }

  getRecordColor(authorRecord) {
    //Create switch statement to get correct color based on the records event
    return 'red';
  }

  onInputChange(name, event) {
    let author = Object.assign({}, this.state.author);
    author[name] = event.target.value;
    this.setState({author});
  }

render(){
  return(
    <div className='container'>
      <div className='card'>
        <h3 className='card-header'> Create New Author Record </h3>
          <div className='card-block'>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className='form-inline'>
                <label className='mb-2 mr-sm-2 mb-sm-0'> Author First Name </label>
                  <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder=''
                        value={this.state.author.author_first_name}
                        onChange={this.onInputChange.bind(this, 'author_first_name')} />

                  <label className='mb-2 mr-sm-2 mb-sm-0'> Author Last Name </label>
                  <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder=''
                        value={this.state.author.author_last_name}
                        onChange={this.onInputChange.bind(this, 'author_last_name')} />
              </div>

              <br />
              <hr />
              <br />

              <div className='form-group'>
              <label>Longitude</label>
              <input type='text'
                    className='form-control'
                    placeholder=''
                    value={this.state.author.longitude}
                    onChange={this.onInputChange.bind(this, 'longitude')} />
                </div>

                <div className='form-group'>
                <label>Latitude</label>
                <input type='text'
                      className='form-control'
                      placeholder=''
                      value={this.state.author.latitude}
                      onChange={this.onInputChange.bind(this, 'latitude')} />
                </div>
                Having trouble finding the Longitude and Latitude?<a target='_blank' href='http://www.latlong.net/'>Click Here </a>
                <br />
                <hr />
                <br />

                <div className='form-group mb-2 mr-sm-2 mb-sm-0'>
                <label>What happened at this location? </label>
                <select className='form-control'
                        onChange={this.onInputChange.bind(this, 'location_event')}>
                      <option selected disabled> Choose... </option>
                      <option value='birth_place'>Birthplace</option>
                      <option value='published'> Publisher</option>
                    </select>
                    </div>

                  <div className='form-group'>
                  <label>Describe what happened</label>
                  <textarea className='form-control' rows='4'></textarea>
                  </div>

                  <br />
                  <hr />
                  {this.state.saving ? (
                    <button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0' disabled>Saving...</button>
                  ):(<button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0'>Create</button>)}
                  <Link className='btn btn-primary ' to='/mapdashboard'>Back </Link>
                  <Link className='btn btn-danger ' to='/mapdashboard'>Cancel </Link>



            </form>
          </div>




        </div>

</div>)
}

}

function mapStateToProps(state){
  return {
    user: state.auth.user_details
  };
}

export default connect(mapStateToProps, { createAuthorRecord })(AuthorCreate);

