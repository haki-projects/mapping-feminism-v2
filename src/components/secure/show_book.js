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
    if(!this.props.book){
      return <div className='container text-center'> loading....</div>
    }
   const { book } = this.props;


    return(

      <div className='container'>
        <div className='card'>
          <h3 className='card-header'>
            Title: {book.english_title} <br />
            </h3>
          <div className='card-block'>

            <div className='card-text'>
              Author: {book.author_first_name + ' ' + book.author_last_name} <br />
              French Title: {book.french_title} <br />
              French Publication Date: {book.french_pub_date} <br />
              English Publication Date: {book.english_pub_date} <br />
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
    book: books[id]
  };
}

export default connect(mapStateToProps, { fetchBooks} )(BookShow);
