import React, { Component } from 'react';
//will need access to application state and action creators in order to edit, delete, and add new table rows the "add" button can live outside of BookTable of course



class BookTable extends Component{

  render(){

    return(

      <div>
        <table className='table table-sm'>
					<thead>
						<tr>
							<th>Original Title</th>
							<th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Original Publish Date</th>
              <th>Original Publish Language</th>
              <th>Original Publisher</th>
              <th>Translated Publish Date</th>
              <th>Translated Publish Language</th>
              <th>Translated Publisher</th>
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