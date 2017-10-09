import React, { Component } from 'react';
//will need access to application state and action creators in order to edit, delete, and add new table rows the "add" button can live outside of BookTable of course



class AuthorTable extends Component{

  render(){

    return(

      <div>
        <table className='table table-sm'>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
              <th>Book Title & Publisher</th>
              <th>Book Title & Publisher</th>
              <th>Book Title & Publisher</th>
              <th>Revised By</th>
              <th> Edit Record </th>
						</tr>
          </thead>
          <tbody>{this.props.authorData}</tbody>
        </table>
      </div>

    );
  }
}

export default AuthorTable;