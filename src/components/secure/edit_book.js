import React, { Component } from 'react';
import { fetchBooks, reviseBook, deleteBook } from '../../actions/books';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';


class BookEdit extends Component {
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
    this.props.fetchBooks();
  }
  handleSubmit(event) {
		event.preventDefault();
    console.log('handled submit', event);
    //Send message on screen to let user know the system is working
    const revisedBook = this.createRevisedBook();
    this.props.reviseBook(revisedBook);

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

  onDeleteClick(){
    console.log("clicked the delete button: " + this.props.current_book.id);
    this.props.deleteBook(this.props.current_book.id, () => {
      this.props.router.push('/dashboard');
    });

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
            Title: {book.english_title} <br />
            Author: {book.author_first_name + ' ' + book.author_last_name}</h3>
          <div className='card-block'>

          <form onSubmit={this.handleSubmit.bind(this)}>

              <div className='form-inline'>
              <label className='mb-2 mr-sm-2 mb-sm-0'>Author First Name</label>
                <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder={book.author_first_name}
                        value={this.state.book.author_first_name}
                        onChange={this.onInputChange.bind(this,'author_first_name')} />
              <label className='mb-2 mr-sm-2 mb-sm-0'>Author last Name</label>
                <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder={book.author_last_name}
                        value={this.state.book.author_last_name}
                        onChange={this.onInputChange.bind(this,'author_last_name')} />
                </div>

                <div className='form-group'>
                <label>English Title </label>
                <input type='text'
                      className='form-control'
                      placeholder={book.english_title}
                      value={this.state.book.english_title}
                      onChange={this.onInputChange.bind(this,'english_title')}/>
              </div>

                <div className='form-group'>
                  <label>French Title</label>
                  <input type='text'
                          className='form-control'
                          placeholder={book.french_title}
                          value={this.state.book.french_title}
                          onChange={this.onInputChange.bind(this, 'french_title')} />
                </div>

                <div className='form-group'>
                <label>French Publication Date</label>
                <input type='date'
                        className='form-control'
                        placeholder={book.french_pub_date}
                        value={this.state.book.french_pub_date}
                        onChange={this.onInputChange.bind(this, 'french_pub_date')} />
              </div>

              <div className='form-group'>
              <label>English Publication Date</label>
              <input type='text'
                      className='form-control'
                      placeholder={book.english_pub_date}
                      value={this.state.book.english_pub_date}
                      onChange={this.onInputChange.bind(this, 'english_pub_date')} />
            </div>

        <button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0'>Save</button>
        <Link className='btn btn-primary ' to='/dashboard'>Back </Link>
        <Link className='btn btn-danger ' to='/dashboard'>Cancel </Link>
        </form>
        <hr />
        <button className='btn btn-danger btn-sm float-right' onClick={this.onDeleteClick.bind(this)}>Delete Record</button>

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

export default connect(mapStateToProps, { fetchBooks, reviseBook, deleteBook} )(BookEdit);
