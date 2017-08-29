import React, { Component } from 'react';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';


class BubbleChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bubbleData: [
        {
          id: '2432432',
          label: 'Test 1',
          size: 6
        },
        {
          id: '536463',
          label: 'Test 2',
          size: 200
        },
        {
          id: '536456',
          label: 'Test 2',
          size: 60
        },
        {
          id: '5364',
          label: 'Test 2',
          size: 5
        }

      ]
    }
  }


  componentDidMount(){
    this.createBubbleChart();
  }
  componentDidUpdate(){
    this.createBubbleChart();

  }

  createBubbleChart() {
    const node = this.node;
    const radiusScale = scaleSqrt().domain([1, 300]).range([20, 100]);



    const simulation = forceSimulation()
          .force('x', forceX(250).strength(0.05))
          .force('y', forceY(250).strength(0.05))
          .force('collide', forceCollide(function(d) {
            return radiusScale(d.translation_gap) + 2;
          }))



    const books = select(node)
      .selectAll('books')
      .data(this.props.data)
      .enter().append('circle')
      .attr('r', d => { return radiusScale(d.translation_gap)})
      .attr('fill', d => {
        if(d.original_lang === 'English'){return '#2196F3'};
        if(d.original_lang === 'French'){return '#795548'}
      })
      .on('click', d => { console.log(d)})

      const labels = select(node)
        .selectAll('.book-label')
        .data(this.props.data)
        .enter().append('text')
        .attr('class', 'book-label')
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
        .attr('font-size', '12px')
        .text( d => {return d.translation_gap})

      simulation.nodes(this.props.data)
        .on('tick', ticked)

      function ticked() {
        books
          .attr('cx', d =>{return d.x})
          .attr('cy', d =>{ return d.y})
        labels
          .attr('x', d => {return d.x})
          .attr('y', d => {return d.y})

      }
  }




  render() {
    return <svg ref={node => this.node = node}
            width={800} height={500}>
            </svg>
  }
}

export default BubbleChart;