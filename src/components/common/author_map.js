import React, {Component} from 'react';
import { queue, json } from 'd3-queue'


class AuthorMap extends Component {
  constructor(props) {

    super(props);
    this.state = {}
  }

  componentDidUpdate(){
    this.createMap();
  }

  createMap() {

   queue()
    .defer(json, '../../../public/world.json')
    .await( function(error, data) {
      console.log('testing the load ', data);
    });

    function ready(data) {
      console.log('test data', data);
    }

  }





  render() {
    return <svg ref={node => this.node = node} width={800} height={500}> </svg>
  }
}

export default AuthorMap;