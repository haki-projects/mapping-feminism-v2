import React, {Component} from 'react';
import { queue, json } from 'd3-queue';
import {geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import { feature } from 'topojson-client';
import mapData from '../../../public/world.json';


class AuthorMap extends Component {
  constructor(props) {

    super(props);
    this.state = {}
  }
  componentDidMount(){

    this.createMap();
  }

  componentDidUpdate(){
    this.createMap();
  }

  createMap() {
    const margin = {top:10, left:100, right:100, bottom:10}
    const width = 1028 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const node = this.node;

    const worldData = feature(this.props.worldMapData, this.props.worldMapData.objects.countries).features;

    const projection = geoMercator()
      .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);


    const worldMap = select(node)
      .selectAll('countries')
      .data(worldData)
      .enter().append('path')
      .attr('class', 'country')
      .attr('id', d => {return '_' + d.id;})
      .attr('d', path)
      .attr('fill', '#1E9244')
      .attr('stroke', '#fff')
      .attr('stroke-width', '.5')
      .on('mouseover', d => {
        console.log(d);
        select('#_' + d.id)
          .attr('stroke-width', '1')
      })
      .on('mouseout', d =>{
        select('#_' + d.id)
        .attr('stroke-width', '.5')

      })


  }





  render() {
    return <svg style={{backgroundColor:'#575e70'}} ref={node => this.node = node} width={1028} height={500}> </svg>
  }
}

export default AuthorMap;