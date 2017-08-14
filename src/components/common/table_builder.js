import React, { Component } from 'react';
const BOOKS = 'books';
import _ from 'lodash';



class TableBuilder extends Component {

     getHeaders(type) {
      switch (type) {
        case BOOK:
          return (
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
          );

          case AUTHORS:
          return (
            <tr>
              <th>Author Name</th>
            </tr>
          );

          default:
          return (
            <tr>
              <th>No Headers</th>
            </tr>
          );
         }
    };
        getTableData(data, type) {

          switch (type) {
            case BOOKS:
            return (
                    <tr>
                      <td>{data.book_title}</td>
                      <td>{data.first_name}</td>
                      <td>{data.last_name}</td>
                      <td>{data.gender}</td>
                      <td>{data.original_publish_date}</td>
                      <td>{data.original_publish_language}</td>
                      <td>{data.original_publisher}</td>
                      <td>{data.translated_publish_date}</td>
                      <td>{data.translated_publish_language}</td>
                      <td>{data.translated_publisher}</td>
                    </tr>
                );
              }

        }



  render(){



    return (
      <div>
        <table className={`table ${table.classes}`}>
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
						</tr>
          </thead>
          <tbody>{this.props.booksData}</tbody>
        </table>
      </div>
    );
  };
};

export default TableBuilder;