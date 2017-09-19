import React, { Component } from 'react';
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
        author_last_name: ''
      }


    };
  }

  componentDidMount(){

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
            <form>
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



            </form>
          </div>




        </div>




    testing create author component</div>)
}

}

function mapStateToProps(state){
  return {
    user: state.auth.user_details
  };
}

export default connect(mapStateToProps)(AuthorCreate);

