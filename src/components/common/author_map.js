import React, {Component} from 'react';
import { queue, json } from 'd3-queue';
import {geoMercator, geoPath } from 'd3-geo';
import { select, selectAll } from 'd3-selection';
import { feature } from 'topojson-client';
import _ from 'lodash';
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
      ],
      margin:{top:10, left:100, right:100, bottom:10},

    }
  }
  componentDidMount(){

    this.createMap();
  }

  componentDidUpdate(){
    this.createMap();
  }

  renderAuthors() {
    return _.map(this.props.markerData, author => {
      return(
        <button className='btn' key = {author.id} onClick={this.onAuthorButtonClick.bind(this, author)}>{author.author_first_name + ' ' + author.author_last_name}</button>
      )
    })
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

//  const authorNames = select('.author-details').append('svg')
//           .attr('width', 400)
//           .attr('height', 200)
//           .style('background-color', 'grey')
//           .append('g')
//           .attr('transform', 'translate(0,0)')
//           .data(this.props.markerData)
//           .enter().append('text')

 const birthplaceMarkers = select(node)
      .selectAll('birthplace')
      .data(this.props.markerData)
      .enter().append('circle');

const publisherMarkers = select(node)
      .selectAll('publisher')
      .data(this.props.markerData)
      .enter().append('circle');

const lastWorkplaceMarkers = select(node)
      .selectAll('workplace')
      .data(this.props.markerData)
      .enter().append('circle');

const birthplaces = birthplaceMarkers.attr('r', 3)
            .attr('fill', 'red')
            .attr('id', d => {return '_' + d.id;})
            .attr('cx', d => { return projection([d.birthplace_longitude, d.birthplace_latitude])[0]})
            .attr('cy', d => {return projection([d.birthplace_longitude, d.birthplace_latitude])[1]})

            const publisher = publisherMarkers.attr('r', 3)
            .attr('fill', 'black')
            .attr('id', d => {return '_' + d.id;})
            .attr('cx', d => { return projection([d.birthplace_longitude, d.birthplace_latitude])[0]})
            .attr('cy', d => {return projection([d.birthplace_longitude, d.birthplace_latitude])[1]})

            const lastWorkplace = lastWorkplaceMarkers.attr('r', 3)
            .attr('fill', 'brown')
            .attr('id', d => {return '_' + d.id;})
            .attr('cx', d => { return projection([d.last_workplace_longitude, d.last_workplace_latitude])[0]})
            .attr('cy', d => {return projection([d.last_workplace_longitude, d.last_workplace_latitude])[1]})

  }

  onAuthorButtonClick(author) {
    console.log(author);
  }

  createLines(author) {
    const width = 1028 - 200;
    const height = 500 - 20;
    const projection = geoMercator()
    .translate([width / 2, height / 2]);
    //check if there is a marker for publisher 2, if so, create a line. if not, move to the next if statement
    //check if there is a marker for publisher 3, if so, create a line. if not, move to the next if statement
    //cehck if there is a marker for lastworkplace, if so, create a line

  }

  drawLine(x1, y1, x2, y2, type){

  }





  render() {
    return (
  <div className='row'>
      <svg style={{backgroundColor:'#575e70'}} ref={node => this.node = node} width={1028} height={500}> </svg>
      <div className='col-sm-4 author-details'>{this.renderAuthors()}</div>
  </div>
  )
  }
}

export default AuthorMap;