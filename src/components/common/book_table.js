import React, { Component } from 'react';
//will need access to application state and action creators in order to edit, delete, and add new table rows the "add" button can live outside of BookTable of course



class BookTable extends Component{

  render(){

    return(

      <div>
        <table className='table table-sm'>
					<thead>
						<tr>
							<th>Author First Name</th>
							<th>Author Last Name</th>
              <th>English Title</th>
              <th>English Publication Date</th>
              <th>French Title</th>
              <th>French Publication Date</th>
              <th>Created By</th>
              <th> Edit Record </th>
						</tr>
          </thead>
          <tbody>{this.props.booksData}</tbody>
        </table>
      </div>

    );
  }
}

export default BookTable;