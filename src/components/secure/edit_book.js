import React, { Component } from 'react';
import { fetchBooks } from '../../actions/books';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';


class BookEdit extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      book: {
        id: '',
        book_title: '',
        email: '',
        first_name:'',
        last_name:'',
        gender:'',
        original_publish_date: '',
        original_publish_language: '',
        original_publisher: '',
        translated_publish_date: '',
        translated_publish_language: '',
        translated_publisher: ''
      }

    };
  }
  componentDidMount() {
    this.props.fetchBooks();
  }
  handleSubmit(event) {
		event.preventDefault();
    console.log('handled submit', event);
    //Send message on screen to let user know the system is working
    const revisedBook = this.createRevisedBook();

    //pass new book object to Action for updating books
  }
  createRevisedBook() {
   const stateBook = this.state.book;
   const propsBook = this.props.current_book;
   const newBookValues= stateBook;

   _.forOwn(stateBook, function(value, key){
    if(!value) {
      var copyValue = propsBook[key];
      newBookValues[key] = propsBook[key];
      }
   });
   return newBookValues;

  }
  onInputChange(name, event) {
  let book = Object.assign({}, this.state.book);
  book[name] = event.target.value;
  this.setState({book});
	}

  render() {
    if(!this.props.current_book){
      return <div className='container text-center'> loading....</div>
    }
   const  book  = this.props.current_book;


    return(

      <div className='container'>
        <div className='card'>
          <h3 className='card-header'>
            Title: {book.book_title} <br />
            Author: {book.first_name + ' ' + book.last_name}</h3>
          <div className='card-block'>

          <form onSubmit={this.handleSubmit.bind(this)}>

              <div className='form-inline'>
              <label className='mb-2 mr-sm-2 mb-sm-0'>Author First Name</label>
                <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder={book.first_name}
                        value={this.state.book.first_name}
                        onChange={this.onInputChange.bind(this,'first_name')} />
              <label className='mb-2 mr-sm-2 mb-sm-0'>Author last Name</label>
                <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder={book.last_name}
                        value={this.state.book.last_name}
                        onChange={this.onInputChange.bind(this,'last_name')} />
                </div>

                <div className='form-group'>
                <label>Book Title </label>
                <input type='text'
                      className='form-control'
                      placeholder={book.book_title}
                      value={this.state.book.book_title}
                      onChange={this.onInputChange.bind(this,'book_title')}/>
              </div>

                <div className='form-group'>
                  <label>Original Language</label>
                  <input type='text'
                          className='form-control'
                          placeholder={book.original_publish_language}
                          value={this.state.book.original_publish_language}
                          onChange={this.onInputChange.bind(this, 'original_publish_language')} />
                </div>

                <div className='form-group'>
                <label>Original Publishing Date</label>
                <input type='date'
                        className='form-control'
                        placeholder={book.original_publish_date}
                        value={this.state.book.original_publish_date}
                        onChange={this.onInputChange.bind(this, 'original_publish_date')} />
              </div>

              <div className='form-group'>
              <label>Original Publisher</label>
              <input type='text'
                      className='form-control'
                      placeholder={book.original_publisher}
                      value={this.state.book.original_publisher}
                      onChange={this.onInputChange.bind(this, 'original_publisher')} />
            </div>
            <hr />

            <div className='form-group'>
            <label>Translated Language</label>
            <input type='text'
                    className='form-control'
                    placeholder={book.translated_publish_language}
                    value={this.state.book.translated_publish_language}
                    onChange={this.onInputChange.bind(this, 'translated_publish_language')} />
          </div>

          <div className='form-group'>
          <label>Translated Publishing Date</label>
          <input type='date'
                  className='form-control'
                  placeholder={book.translated_publish_date}
                  value={this.state.book.translated_publish_date}
                  onChange={this.onInputChange.bind(this, 'translated_publish_date')} />
        </div>
        <div className='form-group'>
        <label>Translated Publisher</label>
        <input type='text'
                className='form-control'
                placeholder={book.translated_publisher}
                value={this.state.book.translated_publisher}
                onChange={this.onInputChange.bind(this, 'translated_publisher')} />
      </div>






        <button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0'>Save</button>
        <Link className='btn btn-primary ' to='/dashboard'>Back </Link>
        <Link className='btn btn-danger ' to='/dashboard'>Cancel </Link>
        </form>

        </div>
        </div>


       </div>
    )

  };
}

function mapStateToProps({ books }, ownProps){
const id = ownProps.params.id;
  return {
    books,
    current_book: books[id]
  };
}

export default connect(mapStateToProps, { fetchBooks} )(BookEdit);
