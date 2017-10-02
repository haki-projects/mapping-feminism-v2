import React, {Component} from 'react';
import { queue, json } from 'd3-queue';
import {geoMercator, geoPath } from 'd3-geo';
import { select, selectAll } from 'd3-selection';
import { feature } from 'topojson-client';
import * as d3 from 'd3';
import mapData from '../../../public/world.json';


class AuthorMap extends Component {
  constructor(props) {

    super(props);
    this.state = {
      markers : [
        {
          longitude: 2.352222,
          latitude: 48.856614
        }
      ]
    }

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
      .attr('stroke', '#f6f6f6')
      .attr('stroke-width', '.3')
      .on('mouseover', d => {
        select('#_' + d.id)
          .attr('stroke-width', '1.5')
      })
      .on('mouseout', d =>{
        select('#_' + d.id)
        .attr('stroke-width', '.3')
 })

 const markers = select(node)
      .selectAll('authors')
      .data(this.props.markerData)
      .enter().append('circle');

      const birthplaceMarkers = markers.attr('r', 3)
            .attr('fill', 'red')
            .attr('cx', d => { return projection([d.birthplace_longitude, d.birthplace_latitude])[0]})
            .attr('cy', d => {return projection([d.birthplace_longitude, d.birthplace_latitude])[1]})

            // const publisherMarkers = markers.attr('r', 3)
            // .attr('fill', 'black')
            // .attr('cx', d => { return projection([d.birthplace_longitude, d.birthplace_latitude])[0]})
            // .attr('cy', d => {return projection([d.birthplace_longitude, d.birthplace_latitude])[1]})

            const lastWorkplaceMarkers = markers.attr('r', 3)
            .attr('fill', 'brown')
            .attr('cx', d => { return projection([d.last_workplace_longitude, d.last_workplace_latitude])[0]})
            .attr('cy', d => {return projection([d.last_workplace_longitude, d.last_workplace_latitude])[1]})


  }





  render() {
    return <svg style={{backgroundColor:'#575e70'}} ref={node => this.node = node} width={1028} height={500}> </svg>
  }
}

export default AuthorMap;