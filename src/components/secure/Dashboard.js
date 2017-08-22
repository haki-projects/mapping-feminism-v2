import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ProfileCard from '../common/profile_card';
import BookTable from '../common/book_table';
import { fetchBooks, fetchBook } from '../../actions/books';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';

class Dashboard extends React.Component {
	constructor(props){
    super(props);
    this.state = {
			hasRights: true };
  }
	componentDidMount(){
		this.props.fetchBooks();
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
		if(this.state.hasRights) {
			return ( <div>
				<button className='btn btn-link btn-sm' onClick={this.onEditClick.bind(this, book)}>Edit</button>
				<button className='btn btn-link btn-sm' onClick={this.onDeleteClick.bind(this,book)}>Delete</button>
				</div>
			)
		}
		return ( <div></div>
		)

	}



	 renderBooks() {
		return _.map(this.props.books, book => {
			return(

				<tr key={book.id}>
					<td>{book.book_title}</td>
					<td>{book.first_name}</td>
					<td>{book.last_name}</td>
					<td>{book.gender}</td>
					<td>{book.original_publish_date}</td>
					<td>{book.original_publish_language}</td>
					<td>{book.original_publisher}</td>
					<td>{book.translated_publish_date}</td>
					<td>{book.translated_publish_language}</td>
					<td>{book.translated_publisher}</td>
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
				<Link to='/profile'>Profile</Link>
				<br/>
				<Link to='/logout'>Logout</Link>
				<h1 className='text-center'>Your Dashboard</h1>
				<br />

				<div className='row text-center'>
					<div className='col-sm-3'>
					<ProfileCard />
					</div>
					<div className='col-sm-8 justify-content-center chart-area card'>
						Dashboard charts
					</div>
				<br/>
			</div>
			<div className='modal-container'>
				<BookTable  booksData={this.renderBooks()}/>
			</div>


			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		books: state.books,
		current_book: state.current_book
	};
}

export default connect(mapStateToProps, { fetchBooks, fetchBook })(Dashboard);
