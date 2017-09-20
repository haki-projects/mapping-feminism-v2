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
        original_title: '',
        translation_title: '',
        translator: '',
        original_pub_date: '',
        translation_pub_date: '',
        author_first_name: '',
        author_last_name: '',
        revised_by:'',
        translation_gap: '',
        verified: false,
        original_lang: ''
      },

      save_status:'',
      saving: false

    };
  }
  componentDidMount() {

  }
  handleSubmit(event) {
    event.preventDefault();
  //Do form validation: Original Title, Original Publication date, and original language can not be blank
    this.setState({
      saving: true
    });
    const newBook = this.state.book;
    newBook.created_by = this.props.user.email;
    newBook.revised_by = '';
    const gapNumber = this.calculateTranslationGap(newBook);
    newBook.translation_gap = gapNumber;
    newBook.verified = false;


    this.props.createBook(newBook, () => {
      this.props.router.push('/dashboard');
    });
    //enable button and clear contents
    this.setState({
      saving:false,
      save_status: 'Saved!'
    })
  }


  onInputChange(name, event) {
  let book = Object.assign({}, this.state.book);
  book[name] = event.target.value;
  this.setState({book});
  }

  calculateTranslationGap(book){
    //strip the two strings and turn them into numbers, subtract and return the number
    if(book.original_pub_date && book.translation_pub_date){
      const originalDate = parseInt(book.original_pub_date.slice(0,4));
      const translationDate = parseInt(book.translation_pub_date.slice(0,4));
      return translationDate - originalDate;
    }
    return 0;
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
                <label>Original Title </label>
                <input type='text'
                      className='form-control'
                      placeholder= ''
                      value={this.state.book.original_title}
                      onChange={this.onInputChange.bind(this,'original_title')}/>
              </div>

                <div className='form-group'>
                  <label>Translation Title</label>
                  <input type='text'
                          className='form-control'
                          placeholder= ''
                          value={this.state.book.translation_title}
                          onChange={this.onInputChange.bind(this, 'translation_title')} />
                </div>


            <hr />

            <div className='form-group'>
            <label>Translator</label>
            <input type='text'
                    className='form-control'
                    placeholder= ''
                    value={this.state.book.translator_title}
                    onChange={this.onInputChange.bind(this, 'translator')} />
          </div>

            <div className='form-group'>
            <label>Translation Publication Date</label>
            <input type='date'
                    className='form-control'
                    placeholder= ''
                    value={this.state.book.translation_pub_date}
                    onChange={this.onInputChange.bind(this, 'translation_pub_date')} />
          </div>

          <div className='form-group'>
          <label>Original Publication Date</label>
          <input type='date'
                  className='form-control'
                  placeholder= ''
                  value={this.state.book.original_pub_date}
                  onChange={this.onInputChange.bind(this, 'original_pub_date')} />
        </div>

        <div className='form-group'>
        <label>Original Language</label> <br />
          <select className= 'form-control'
              onChange={this.onInputChange.bind(this, 'original_lang')}>
            <option selected disabled> Choose ...</option>
            <option value='French'>French </option>
            <option value='English'>English</option>
           </select>
      </div>






        {this.state.saving ? (
          <button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0' disabled>Saving...</button>
        ):(<button type='submit' className='btn btn-success mb-2 mr-sm-2 mb-sm-0'>Create</button>)}

        <Link className='btn btn-primary ' to='/dashboard'>Back </Link>
        <Link className='btn btn-danger ' to='/dashboard'>Cancel </Link>
        </form>

        </div>
        </div>


       </div>
    )

  };
}

function mapStateToProps(state, { books }){

  return {
    books,
    user: state.auth.user_details

  };
}

export default connect(mapStateToProps, {createBook})(BookCreate);