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
        translation_title: '',
        translator: '',
        original_lang: '',
        original_title: '',
        translation_pub_date: '',
        original_pub_date: '',
        author_first_name: '',
        author_last_name: '',
        verified:''
      },

      save_status:''

    };
  }
  componentDidMount() {
    this.props.fetchBooks();
  }
  handleSubmit(event) {
		event.preventDefault();
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
   newBookValues.revised_by = this.props.user_details.email;
   newBookValues.translation_gap = this.calculateTranslationGap(newBookValues);
   //add logic for revised notification
   return newBookValues;
  }

  onInputChange(name, event) {
  let book = Object.assign({}, this.state.book);
  book[name] = event.target.value;
  this.setState({book});
  }

  calculateTranslationGap(book){
    //strip the two strings and turn them into numbers, subtract and return the number
    if( book.original_pub_date && book.translation_pub_date){
      const originalDate = parseInt(book.original_pub_date.slice(0,4));
      const translationDate = parseInt(book.translation_pub_date.slice(0,4));
      return translationDate - originalDate;
    }
    return 0;
  }

  onDeleteClick(){
    console.log("clicked the delete button: " + this.props.current_book.id);
    this.props.deleteBook(this.props.current_book.id, () => {
      this.props.router.push('/dashboard');
    });

  }

  canDelete(){
    const user = this.props.user_details;
    if(user) {
      if(user.role === 'ADMIN'){
        return (
          <button className='btn btn-danger btn-sm float-right' onClick={this.onDeleteClick.bind(this)}>Delete Record</button>
        )
      }
    }
    return <div></div>
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
            Title: {book.original_title} <br />
            Author: {book.author_first_name + ' ' + book.author_last_name}</h3>
          <div className='card-block'>

          <form onSubmit={this.handleSubmit.bind(this)}>

          {this.props.user_details.role == 'ADMIN' ? ( <div>
            <label className='mb-2 mr-sm-2 mb-sm-0'>Verified?</label>
            <select className= 'custom-select'
                onChange={this.onInputChange.bind(this, 'verified')}>
              <option defaultValue disabled>{book.verified}</option>
              <option value={true}>Yes </option>
              <option value={false}>No</option>
             </select>
             <br />
             <br />
              </div>):(<div></div>)}


              <div className='form-inline'>
              <label className='mb-2 mr-sm-2 mb-sm-0'>Author First Name</label>
                <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder={book.author_first_name}
                        value={this.state.book.author_first_name}
                        onChange={this.onInputChange.bind(this,'author_first_name')}/>

              <label className='mb-2 mr-sm-2 mb-sm-0'>Author last Name</label>
                <input type='text'
                        className='form-control mb-2 mr-sm-2 mb-sm-0'
                        placeholder={book.author_last_name}
                        value={this.state.book.author_last_name}
                        onChange={this.onInputChange.bind(this,'author_last_name')} />


                </div>

                <div className='form-group'>
                <label>Original Title </label>
                <input type='text'
                      className='form-control'
                      placeholder={book.original_title}
                      value={this.state.book.original_title}
                      onChange={this.onInputChange.bind(this,'original_title')}
                      />
              </div>

                <div className='form-group'>
                  <label>Translation Title</label>
                  <input type='text'
                          className='form-control'
                          placeholder={book.translation_title}
                          value={this.state.book.translation_title}
                          onChange={this.onInputChange.bind(this, 'translation_title')} />
                </div>

                <div className='form-group'>
                <label>Original Language</label>
                <input type='text'
                        className='form-control'
                        placeholder={book.original_lang}
                        value={this.state.book.original_lang}
                        onChange={this.onInputChange.bind(this, 'original_lang')} />
              </div>

                <div className='form-group'>
                <label>Translator</label>
                <input type='text'
                        className='form-control'
                        placeholder={book.translator}
                        value={this.state.book.translator}
                        onChange={this.onInputChange.bind(this, 'translator')} />
              </div>

                <div className='form-group'>
                <label>Translation Publication Date: {book.translation_pub_date}</label>
                <input type='date'
                        className='form-control'
                        placeholder={book.translation_pub_date}
                        value={this.state.book.translation_pub_date}
                        onChange={this.onInputChange.bind(this, 'translation_pub_date')} />
              </div>

              <div className='form-group'>
              <label>Original Publication Date: {book.original_pub_date}</label>
              <input type='date'
                      className='form-control'
                      placeholder={book.original_pub_date}
                      value={this.state.book.original_pub_date}
                      onChange={this.onInputChange.bind(this, 'original_pub_date')} />
            </div>

        <button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0'>Save</button>
        <Link className='btn btn-primary ' to='/dashboard'>Back </Link>
        <Link className='btn btn-danger ' to='/dashboard'>Cancel </Link>
        </form>
        <hr />
        {this.canDelete()}


        </div>
        </div>


       </div>
    )

  };
}

function mapStateToProps(state, ownProps){
const id = ownProps.params.id;
  return {
    books: state.books,
    current_book: state.books[id],
    user_details: state.auth.user_details
  };
}

export default connect(mapStateToProps, { fetchBooks, reviseBook, deleteBook} )(BookEdit);
