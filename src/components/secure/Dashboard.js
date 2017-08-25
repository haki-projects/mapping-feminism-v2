import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ProfileCard from '../common/profile_card';
import BookTable from '../common/book_table';
import { fetchBooks, fetchBook } from '../../actions/books';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import * as firebase from 'firebase';

class Dashboard extends React.Component {
	constructor(props){
    super(props);
    this.state = {
			hasRights: true,
		current_user: ''};
  }
	componentDidMount(){
		this.props.fetchBooks();
	const user = firebase.auth().currentUser;
		//set the state hasRights function
	}

	onViewClick(book) {
		this.props.router.push(`/dashboard/books/view/${book.id}`);

	}
	onDeleteClick(book) {
		console.log('insite delete button', book);

	}
	onEditClick(book) {
		console.log('insite edit button', book);
		this.props.router.push(`/dashboard/books/edit/${book.id}`);

	}

	canEditField(book){
		const user = this.props.user_details;
		if (book.created_by == user.email || user.role == 'ADMIN') {

			return ( <div>
				<button className='btn btn-link btn-sm' onClick={this.onEditClick.bind(this, book)}>Edit</button>
				</div>
			)
		}
		return  <div></div>
	}
	canAddAuthor(){
		const user = this.props.user_details;

	}



	 renderBooks() {
		return _.map(this.props.books, book => {
			return(

				<tr key={book.id}>
					<td>{book.author_first_name}</td>
					<td>{book.author_last_name}</td>
					<td>{book.english_title}</td>
					<td>{book.english_pub_date}</td>
					<td>{book.french_title}</td>
					<td>{book.french_pub_date}</td>
					<td>{book.created_by}</td>

					<td className='btn-group' role='group'>
						<button className='btn btn-link btn-sm' onClick={this.onViewClick.bind(this, book)}>View</button>
					{this.canEditField(book)}
					</td>
				</tr>

			);
		});
	}





	render() {

		return (
			<div className='container-fluid'>
				<h1 className='text-center'>Your Dashboard</h1>
				<br />

				<div className='row text-center'>
					<div className='col-sm-3'>
					<ProfileCard user = {this.props.user_details}/>
					</div>
					<div className='col-sm-8 justify-content-center chart-area card'>
						Dashboard charts
					</div>
				<br/>
			</div>
			<div>

				<Link to='/dashboard/books/create' className='btn btn success'>Add Book </Link>
				<BookTable  booksData={this.renderBooks()}/>
			</div>


			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		books: state.books,
		current_book: state.current_book,
		user_details: state.auth.user_details
	};
}

export default connect(mapStateToProps, { fetchBooks, fetchBook })(Dashboard);
