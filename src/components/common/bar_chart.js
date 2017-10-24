import React, { Component } from 'react';
import { scaleLinear, scaleBand, axisBottom, axisLeft } from 'd3-scale';
import { max } from 'd3-array';
import { select, event as currentEvent } from 'd3-selection';
import * as d3 from 'd3';



class BarChart extends Component {

  componentDidMount(){


  }
  componentDidUpdate(){
    this.createBarChart();
  }

  createBarChart() {
    const node = this.node;
    const svgContainer = select(node);
    var margin = {top: 20, right: 20, bottom: 30, left: 120},
    width = +svgContainer.attr("width") - margin.left - margin.right,
    height = +svgContainer.attr("height") - margin.top - margin.bottom;

    var tooltip = select('body').append('div').attr('class', 'toolTip');

    var g = svgContainer.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");






    var xScale = scaleLinear()
        .range([0, width]);
    var yScale = scaleBand()
        .range([height, 0]);

        xScale.domain([0, d3.max(this.props.data, function(d) {return d.num_of_edits})])
        yScale.domain(this.props.data.map(function(d) {return d.email;})).padding(0.1);

        g.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(xScale).ticks(5).tickFormat( function (d) {return parseInt(d / 100);}).tickSizeInner([-height]));

        g.append('g')
          .attr('class', 'y axis')
          .call(d3.axisLeft(yScale));


// Draw bars
    select(node)
      .selectAll('.bar')
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 120)
      .attr('y', function(d){return yScale(d.email) ;})
      .attr('id', d => {return '_' + d.id + 'bar';})
      .attr('height', yScale.bandwidth())
      .attr('width', function(d) {return xScale(d.num_of_edits);})
      .on('mouseover', d => {showDetails(d) })
      .on('mouseout', d => {hideDetails(d) })




  function showDetails(d) {
    select('.bar-chart-details')
    .html('User: '+ d.email + '<br />'
       +  'Number of Edits: ' + d.num_of_edits + '<br />'
   )
   .style('color', 'steelblue')
   }

   function hideDetails(d) {
    select('.bar-chart-details')
    .html('')
  }



  }





  render() {
    return <svg ref={node => this.node = node} width={960} height={500}>
            </svg>
  }
}

export default BarChart;