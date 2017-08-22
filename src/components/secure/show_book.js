import React, { Component } from 'react';
import { fetchBooks } from '../../actions/books';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class BookShow extends Component {
  constructor(props) {
    super(props);


  }
  componentDidMount() {
    this.props.fetchBooks();

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

            <div className='card-text'>

              Original Language: {book.original_publish_language} <br />
              Original Publishing Date: {book.original_publish_date} <br />
              Original Publisher: {book.original_publisher} <br />
              <hr />

              Translated Language: {book.translated_publish_language} <br />
              Translated Publishing Date: {book.translated_publish_date} <br />
              Translated Publisher: {book.translated_publisher}
            </div>
          </div>
        <div className='card-footer'><Link className='btn btn-primary' to='/dashboard'>Back </Link> </div>
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

export default connect(mapStateToProps, { fetchBooks} )(BookShow);
