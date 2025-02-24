import React, {Component} from "react";
import * as d3 from 'd3';

class Child1 extends Component {
  constructor(props) {
    super(props)
    this.state={};
  }

  componentDidMount(){
    const data = this.props.data1
    const margin = { top: 40, right: 50, bottom: 50, left: 50 };
    const width = 500; // from left to right of box
    const height = 300; //from top of box to bottom 
    const innerWidth = width - margin.left - margin.right; //x-axis
    const innerHeight = height - margin.top - margin.bottom; //y-axis
    //console.log(this.props.data1)

    const svg = d3.select(".child1_svg").attr("width", width).attr("height", height);

    const innerChart = svg.select(".inner_chart").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.total_bill)])
    .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.tip)])
    .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerChart.selectAll(".x-axis").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
      .join("g").attr('class','x-axis') //we have to assign the class we use for selection
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)

    innerChart.selectAll(".y-axis").data([null]) // Similarly, just a placeholder for the axis.
      .join("g").attr('class','y-axis') //we have to assign the class we use for selection
      .call(yAxis)

      innerChart.append('text')
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("x", -100)
      .style("text-anchor", "middle")
      .attr('style', 'font-weight:bold') //could probably move this to app.css
      .text("Tips");

    innerChart.append('text')
      .attr("y", innerHeight+40)
      .attr("x", innerWidth/2)
      .style("text-anchor", "middle")
      .attr('style', 'font-weight:bold')//could probably move this to app.css
      .text("Total Bill");

    svg.append('text')
    .attr("x", innerWidth/2)
    .attr("y", 20)
    .attr('style', 'font-weight:bold') //could probably move this to app.css
    .text("Total Bill vs. Tip")

    innerChart.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 3)
    .attr("fill", '#69b3a2')
    .attr("cx", d => xScale(d.total_bill))
    .attr("cy", d => yScale(d.tip))
  }


  render(){
    return <svg className="child1_svg">
        <g className="inner_chart"></g>
    </svg>
  }
} 
  

export default Child1;
