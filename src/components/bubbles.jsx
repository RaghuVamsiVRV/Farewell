import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import photo from '../media/photos/anushree.jpg';
import * as d3 from 'd3';

class BarChart extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	drawChart(bigga) {
		console.log(bigga);

		const svg = d3.select(this.myRef.current);
		var simulation = d3.forceSimulation().nodes(bigga);
		simulation
			.force('charge_force', d3.forceManyBody().strength(1000))
			.force('center_force', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
			.force('collide', d3.forceCollide(30))
			.force('x', d3.forceX(window.innerWidth / 3))
			.force('x', d3.forceX(window.innerWidth / 1.5));

		// var defs = svg.append('defs');
		// defs
		// 	.append('pattern')
		// 	.attr('id', 'photo')
		// 	.attr('height', '100%')
		// 	.attr('width', '100%')
		// 	.attr('patterContentUnits', 'objectBoundingBox')
		// 	.append('image')
		// 	.attr('height', 1)
		// 	.attr('width', 1)
		// 	.attr('preserveAspectRatio', 'none')
		// 	.attr('xlink:href', '../media/photos/teja.jpg');

		var node = svg
			.append('g')
			.attr('class', 'nodes')
			.selectAll('circle')
			.data(bigga)
			.enter()
			.append('circle')
			.attr('r', 20)
			.attr('fill', 'url(#photo)')
			.attr('stroke', 'yellow')
			.on('mouseover', function(d, i) {
				d3.select(this).transition().attr('r', '30');

				// div.transition().duration(50).style('opacity', '1');
			})
			.on('mouseout', function(d, i) {
				d3.select(this).transition().attr('r', '20');

				// div.transition().duration(50).style('opacity', '0');
			});
		node.attr('onclick', function(d) {
			var link = "window.top.location.href='" + '/' + d._id + "'";
			return link;
		});

		var texts = svg
			.append('g')
			.selectAll('text')
			.data(bigga)
			.enter()
			.append('text')
			.text((d) => d.name)
			.style('fill', 'white')
			.attr('opacity', '0')
			.on('mouseover', function(d, i) {
				d3.select(this).transition().duration('50').attr('opacity', '1');
				// div.transition().duration(50).style('opacity', '1');
			})
			.on('mouseout', function(d, i) {
				d3.select(this).transition().duration('2000').attr('opacity', '0');
				// div.transition().duration(50).style('opacity', '0');
			});

		texts.attr('onclick', function(d) {
			var link = "window.top.location.href='" + '/' + d._id + "'";
			return link;
		});
		node.append('title').text((d) => d.name).attr('opacity', '1');
		simulation.on('tick', tickActions);
		function tickActions() {
			texts.attr('x', (d) => d.x - d.name.length * 4);
			texts.attr('y', (d) => d.y + 3);
			node
				.attr('cx', function(d) {
					return d.x;
				})
				.attr('cy', function(d) {
					return d.y;
				});
		}

		var zoom_handler = d3.zoom().on('zoom', zoom_actions);
		zoom_handler(svg);
		function zoom_actions(event) {
			node.attr('transform', event.transform);
			texts.attr('transform', event.transform);
		}

		var drag_handler = d3.drag().on('start', drag_start).on('drag', drag_drag).on('end', drag_end);
		function drag_start(event) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}
		function drag_drag(event) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		function drag_end(event) {
			if (d3.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}
		drag_handler(node);
		drag_handler(texts);
		// const svg = d3.select('body').append('svg').attr('width', 700).attr('height', 300);
	}
	componentDidMount() {
		fetch('http://localhost:4000/users?batch=2017&college=IIT PATNA')
			.then((response) => response.json())
			.then((seniors) => this.drawChart(seniors.users));

		// const data = axios.get('http://localhost:4000/users?batch=2017&college=IIT PATNA');
		// console.log(data);
		// this.drawChart();
	}
	// defs
	// 		.append('pattern')
	// 		.attr('id', 'photo')
	// 		.attr('height', '100%')
	// 		.attr('width', '100%')
	// 		.attr('patterContentUnits', 'objectBoundingBox')
	// 		.append('image')
	// 		.attr('height', 1)
	// 		.attr('width', 1)
	// 		.attr('preserveAspectRatio', 'none')
	// 		.attr('xlink:href', '../media/photos/teja.jpg');

	render() {
		return (
			<div>
				<svg
					ref={this.myRef}
					style={{ width: window.innerWidth, height: window.innerHeight, background: 'black' }}
				/>
			</div>
		);
	}
}

export default BarChart;
