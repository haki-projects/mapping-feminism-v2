import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router';
import { queue, json } from 'd3-queue';
import {geoMercator, geoPath } from 'd3-geo';
import { select, selectAll, event } from 'd3-selection';
import { feature } from 'topojson-client';
import _ from 'lodash';
import * as d3 from 'd3';
import { behavior } from 'd3';
import mapData from '../../../public/world.json';




class AuthorMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin:{top:10, left:100, right:100, bottom:10},
      authors_enabled: []

    }
  }
  componentDidMount(){

    this.createMap();
  }

  componentDidUpdate(){
    this.createMap();
  }

  onEditClick(author){
    this.props.router.push(`/mapdashboard/author/edit/${author.id}`);
  }

  canEditField(author){
    const user = this.props.user_details;
    if (author.created_by == user.email || user.role == 'ADMIN' || user.role == 'STUDENT' || author.revised_by == '' || author.revised_by == user.email) {
      return (
            <button className='btn btn-link' onClick={this.onEditClick.bind(this, author)}>Edit</button>
      )
        }
        return <div></div>
  }

  canAddAuthor(){
    const user = this.props.user_details;
    if (user){
      if(user.role == 'ADMIN'){
        return (
          <Link to='/mapdashboard/author/create' className='btn btn-success'>Add Author data </Link>
        )
      }
    }
    return <div></div>
  }

  renderAuthors() {
    return _.map(this.props.markerData, author => {
      return(
        <li className='list-group-item' key = {author.id}>

        <button type='button' className='btn btn-secondary' onClick={this.onAuthorButtonClick.bind(this, author)}>{author.author_first_name + ' ' + author.author_last_name}</button>
        <button type='button' className='btn btn-link'  onClick={this.onAuthorHideButtonClick.bind(this, author)}>Hide</button>
        {this.canEditField(author)}

        </li>
      )
    })
  }

   //define zoom function event listener
   zoomFunction() {
     console.log(event)
    d3.getEvent = function(){return require('d3-selection').event}.bind(this);
    d3.selectAll('path')
    .attr('transform', 'translate(' + d3.getEvent.translate + ') scale (' + d3.getEvent.scale + ')');
  }



  createMap() {
    const margin = {top:10, left:100, right:100, bottom:10}
    const width = 1028 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const node = this.node;
    const markers = this.props.markerData;

    const zoom = d3.zoom()
    .scaleExtent([0.2, 10])
    .on('zoom', this.zoomFunction);

    const svgContainer = select(node)
    .style('background-color', '#575e70')
    .style('border', '2px solid steelblue')
    .call(zoom)
    .append('g');

    const worldData = feature(this.props.worldMapData, this.props.worldMapData.objects.countries).features;

    const projection = geoMercator()
      .translate([width / 2, height / 2]);

    const gPath = geoPath().projection(projection);

    const worldMap = svgContainer
      .selectAll('countries')
      .data(worldData)
      .enter().append('svg:g').append('path')
      .attr('class', 'country')
      .attr('id', d => {return '_' + d.id;})
      .attr('d', gPath)
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


 const birthplaceMarkers = svgContainer
      .selectAll('birthplace')
      .data(this.props.markerData)
      .enter().append('circle')
      .attr('r', 3)
      .attr('fill', 'red')
      .attr('id', d => {return '_' + d.id;})
      .attr('cx', d => { return projection([d.birthplace_longitude, d.birthplace_latitude])[0]})
      .attr('cy', d => {return projection([d.birthplace_longitude, d.birthplace_latitude])[1]})
      .on('click', d => {
        this.onAuthorButtonClick(d)})
      .on('mouseout', d => {
        this.onAuthorHideButtonClick(d)

      })

const lastWorkplaceMarkers = svgContainer
      .selectAll('workplace')
      .data(this.props.markerData)
      .enter().append('circle')
      .attr('r', 3)
      .attr('fill', 'brown')
      .attr('id', d => {return '_' + d.id;})
      .attr('cx', d => { return projection([d.last_workplace_longitude, d.last_workplace_latitude])[0]})
      .attr('cy', d => {return projection([d.last_workplace_longitude, d.last_workplace_latitude])[1]});


const publishers = this.getPublishersData(this.props.markerData);
const publisherMarkers = svgContainer
      .selectAll('publisher')
      .data(publishers)
      .enter().append('circle')
      .attr('r', 3)
      .attr('fill', 'black')
      .attr('id', d => {return '_' + d.id;})
      .attr('cx', d => { return projection([d.publisher_longitude, d.publisher_latitude])[0]})
      .attr('cy', d => {return projection([d.publisher_longitude, d.publisher_latitude])[1]});
 }


  onAuthorButtonClick(author) {
    this.showDetails(author);
    selectAll('#_' + author.id)
    .attr('stroke-width', '1')
    .attr('stroke', 'white')
    const margin = {top:10, left:100, right:100, bottom:10}
    const width = 1028 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const projection = geoMercator()
    .translate([width / 2, height / 2]);

  const gPath = geoPath().projection(projection);
    const node = this.node;
    const svgContainer = select(node);
    const authorGeoJson = this.getGeoJsonObj(author);


    var authorPaths = svgContainer
      .append('path')
      .attr('id', d => {return '_' + author.id + 'line';})
      .attr('d', gPath(authorGeoJson))
      .style('stroke', 'white')
      .attr('fill', 'none');

   }

   onAuthorHideButtonClick(author) {
     //hide the path data/ remove all paths with the associated author ID
     this.hideDetails(author);
     selectAll('#_' + author.id)
     .attr('stroke-width', '0')
     .attr('stroke', 'white')
     d3.select('#_'+ author.id + 'line')
      .remove();
   }

   showDetails(author){
    select('.single-author-details')
    .html('Author: '+ author.author_first_name + ' ' + author.author_last_name + '<br />'
       +  'Book Title & Publisher: ' + author.book_title_1 + ' - ' + author.publisher_name_1 + '<br />'
       +  'Book Title & Publisher: ' + author.book_title_2 + ' - ' + author.publisher_name_2 + '<br />'
       +  'Book Title & Publisher: ' + author.book_title_3 + ' - ' + author.publisher_name_3 + '<br />'
       +  'Last Place of work: ' + author.last_workplace_name + '<br />'+ '<br />'
   )

   }
   hideDetails(author){
     select('.single-author-details').html('')

   }
/******************************************************
 * HELPER FUNCTIONS
 *
 *******************************************************/


 getPublishersData(authorData){
   var publisherMarkers = [];
   _.forEach(authorData, author => {
    //check for each publisher. if long/lat data exists, create an object and add it to publisherMarkers
    if(author.publisher_latitude_1 && author.publisher_longitude_1){
      const pub1 = {
        id: author.id,
        publisher_name: author.publisher_name_1,
        publisher_longitude:  author.publisher_longitude_1,
        publisher_latitude: author.publisher_latitude_1
      }
      publisherMarkers.push(pub1);
    }
    if(author.publisher_latitude_2 && author.publisher_longitude_2){
      const pub2 = {
        id: author.id,
        publisher_name: author.publisher_name_2,
        publisher_longitude:  author.publisher_longitude_2,
        publisher_latitude: author.publisher_latitude_2
      }
      publisherMarkers.push(pub2);

    }
    if(author.publisher_latitude_3 && author.publisher_longitude_3){
      const pub3 = {
        id: author.id,
        publisher_name: author.publisher_name_3,
        publisher_longitude:  author.publisher_longitude_3,
        publisher_latitude: author.publisher_latitude_3
      }
      publisherMarkers.push(pub3);
    }

   })

  return publisherMarkers;
 }
  getGeoJSONCoord(author){
    var authorCoords = []
    const authorBirthCoords = [parseFloat(author.birthplace_longitude), parseFloat(author.birthplace_latitude)];

    //creates the coordinates to be used
    if(author.publisher_latitude_1 && author.publisher_longitude_1) {
      const publisher_coords1 = [authorBirthCoords, [parseFloat(author.publisher_longitude_1), parseFloat(author.publisher_latitude_1)]]
      authorCoords.push(publisher_coords1);
    }

    if(author.publisher_latitude_2 && author.publisher_longitude_2) {
      const publisher_coords2 = [authorBirthCoords, [parseFloat(author.publisher_longitude_2), parseFloat(author.publisher_latitude_2)]]
      authorCoords.push(publisher_coords2);
    }

    if(author.publisher_latitude_3 && author.publisher_longitude_3) {
      const publisher_coords3 = [authorBirthCoords, [parseFloat(author.publisher_longitude_3), parseFloat(author.publisher_latitude_3)]]
      authorCoords.push(publisher_coords3);
    }

    if(author.last_workplace_latitude && author.last_workplace_longitude) {
      const last_workplace_coords = [authorBirthCoords, [parseFloat(author.last_workplace_longitude), parseFloat(author.last_workplace_latitude)]]
      authorCoords.push(last_workplace_coords);
    }

    return authorCoords;
  }
/**
 * GetGeoJsonObj : Creates a GeoJson object from the current authors data, and returns the finished object
 */
  getGeoJsonObj(author){
    const authorGeoCoord = this.getGeoJSONCoord(author);
    var newFeature;
    var authorGeo = {};
    //Set up GeoJson skeleton
    authorGeo['type'] = 'MultiLineString';
    authorGeo['coordinates'] = authorGeoCoord;

    return authorGeo;
  }









  render() {
    return (
  <div className='row'>
      <svg ref={node => this.node = node} width={1028} height={500}> </svg>
      <div className='col-sm-3 author-details'>
      <ul className='list-group'>
        {this.renderAuthors()}
      </ul>
        <br/>
        <div><Link to='/mapdashboard/author/create' className='btn btn-success'>Add Author data </Link></div>
      </div>
  </div>
  )
  }
}
function mapStateToProps(state) {
  return {
    user_details: state.auth.user_details
  }
}

export default withRouter(AuthorMap);