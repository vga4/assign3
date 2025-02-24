import React, {Component} from "react";
import * as d3 from 'd3';

class Child1 extends Component {
  constructor(props) {
    super(props)
    this.svgRef = React.createRef();
  }

  componentDidMount(){
    this.renderScatter()
    }
  componentDidUpdate(){
    this.renderScatter()
    }

    renderScatter(){
    const data = this.props.data1
    const margin = { top: 40, right: 50, bottom: 50, left: 50 };
    const width = 500; // from left to right of box
    const height = 300; //from top of box to bottom 
    const innerWidth = width - margin.left - margin.right; //x-axis
    const innerHeight = height - margin.top - margin.bottom; //y-axis
    //console.log(this.props.data1)

    const svg = d3.select(this.svgRef.current)
    .attr("width", width)
    .attr("height", height);

    const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.total_bill)])
    .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.tip)])
    .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    g.append("g")
      .attr('class','x-axis') //we have to assign the class we use for selection
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)

    g.append("g")
      .attr('class','y-axis') //we have to assign the class we use for selection
      .call(yAxis)

    g.append('text')
      .attr("transform", "rotate(-90)")
      .attr("class", "y-label")
      .attr("y", -30)
      .attr("x", -100)
      .style("text-anchor", "middle")
      .attr('style', 'font-weight:bold') //could probably move this to app.css
      .text("Tips");

    g.append('text')
      .attr("y", innerHeight+40)
      .attr("class", "x-label")
      .attr("x", innerWidth/2)
      .style("text-anchor", "middle")
      .attr('style', 'font-weight:bold')//could probably move this to app.css
      .text("Total Bill");

    svg.append('text')
    .attr("x", innerWidth/2)
    .attr("y", 20)
    .attr('style', 'font-weight:bold') //could probably move this to app.css
    .text("Total Bill vs. Tip")

    g.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 3)
    .attr("fill", '#69b3a2')
    .attr("cx", d => xScale(d.total_bill))
    .attr("cy", d => yScale(d.tip));
  }

  render(){
    return <svg ref={this.svgRef}/>;
  }
} 

export default Child1;
