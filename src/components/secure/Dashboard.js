import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ProfileCard from '../common/profile_card';
import BookTable from '../common/book_table';
import { fetchBooks } from '../../actions/books';
import _ from 'lodash';

class Dashboard extends React.Component {
	componentDidMount(){
		this.props.fetchBooks();
	}

	 renderBooks() {
		return _.map(this.props.books, book => {
			return(
				<tr>
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
					<ProfileCard />
					</div>
					<div className='col-sm-9 justify-content-center chart-area'>
						Dashboard charts
					</div>
				<br/>
				<Link to='/profile'>Profile</Link>
				<br/>
				<Link to='/logout'>Logout</Link>
			</div>
			<div>
				<BookTable booksData = {this.renderBooks()}/>
			</div>




			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		books: state.books
	};
}

export default connect(mapStateToProps, { fetchBooks })(Dashboard);
