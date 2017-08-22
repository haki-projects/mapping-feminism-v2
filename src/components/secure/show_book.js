import React, { Component } from 'react';
//import { fetchBook } from '../../actions/books';
import { connect } from 'react-redux';


class BookShow extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      current_book: {}
    };
  }






  componentDidMount() {

  }

  render() {


    return(

      <div> inside book: </div>
    )

  };
}

// function mapStateToProps({state}, ownProps){
//   return { book: state.books[ownProps.match.params.id]};
// }

//export default connect(mapStateToProps)(BookShow);
export default BookShow;