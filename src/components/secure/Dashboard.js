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
			showModal: false,
			current_book: {} };
  }
	componentDidMount(){
		this.props.fetchBooks();
	}

	onViewClick(book) {
		console.log('inside view click', book);
		this.props.fetchBook(book);
	}
	onDeleteClick(book) {

	}
	onEditClick(book) {

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
						<button className='btn btn-link btn-sm' onClick={this.onEditClick.bind(this, book.id)}>Edit</button>
						<button className='btn btn-link btn-sm' onClick={this.onDeleteClick.bind(this, book.id)}>Delete</button>
					</td>
				</tr>

			);
		});
	}

	close(){
		this.setState({ showModal: false});
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

			<Modal show={this.state.showModal} onHide={this.close}>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>

				<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
			</Modal.Body>
			<Modal.Footer>

			</Modal.Footer>
		</Modal>




			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		books: state.books,
		current_book: state.book
	};
}

export default connect(mapStateToProps, { fetchBooks, fetchBook })(Dashboard);
