import React, { Component } from 'react';
import { createBook } from '../../actions/books';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';


class BookCreate extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      book: {
        id: '',
        english_title: '',
        french_title: '',
        english_pub_date: '',
        french_pub_date: '',
        author_first_name: '',
        author_last_name: ''
      },

      save_status:''

    };
  }
  componentDidMount() {

  }
  handleSubmit(event) {
		event.preventDefault();
    console.log('handled submit', event);
    const newBook = this.state.book;
    this.props.createBook(newBook);

  }

  onInputChange(name, event) {
  let book = Object.assign({}, this.state.book);
  book[name] = event.target.value;
  this.setState({book});
	}

  render() {



    return(

      <div className='container'>
        <div className='card'>
          <h3 className='card-header'>
            Create New Book Record</h3>
          <div className='card-block'>

          <form onSubmit={this.handleSubmit.bind(this)}>

              <div className='form-inline'>
              <label className='mb-2 mr-sm-2 mb-sm-0'>Author First Name</label>
                <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder= ''
                        value={this.state.book.author_first_name}
                        onChange={this.onInputChange.bind(this,'author_first_name')} />
              <label className='mb-2 mr-sm-2 mb-sm-0'>Author last Name</label>
                <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder= ''
                        value={this.state.book.author_last_name}
                        onChange={this.onInputChange.bind(this,'author_last_name')} />
                </div>

                <div className='form-group'>
                <label>English Title </label>
                <input type='text'
                      className='form-control'
                      placeholder= ''
                      value={this.state.book.english_title}
                      onChange={this.onInputChange.bind(this,'english_title')}/>
              </div>

                <div className='form-group'>
                  <label>French Title</label>
                  <input type='text'
                          className='form-control'
                          placeholder= ''
                          value={this.state.book.french_title}
                          onChange={this.onInputChange.bind(this, 'french_title')} />
                </div>


            <hr />

            <div className='form-group'>
            <label>French Publication Date</label>
            <input type='text'
                    className='form-control'
                    placeholder= ''
                    value={this.state.book.french_pub_date}
                    onChange={this.onInputChange.bind(this, 'french_pub_date')} />
          </div>

          <div className='form-group'>
          <label>English Publication Date</label>
          <input type='text'
                  className='form-control'
                  placeholder= ''
                  value={this.state.book.english_pub_date}
                  onChange={this.onInputChange.bind(this, 'english_pub_date')} />
        </div>







        <button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0'>Create</button>
        <Link className='btn btn-primary ' to='/dashboard'>Back </Link>
        <Link className='btn btn-danger ' to='/dashboard'>Cancel </Link>
        </form>

        </div>
        </div>


       </div>
    )

  };
}

function mapStateToProps({ books }){

  return {
    books

  };
}

export default connect(mapStateToProps, {createBook})(BookCreate);
