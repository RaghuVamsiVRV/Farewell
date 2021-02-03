import React, { Component } from 'react';
import { Button, ButtonGroup } from "reactstrap";
import * as d3 from 'd3';



class BarChart extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	drawChart(bigga) {
		const height = window.innerHeight;
		const width = window.innerWidth;
		var forcedictX = { CE: width / 2, CS: width / 2, ME: width / 4, CB: width / 1.33, EE: width / 4.5 };
		var forcedictY = { CE: height / 4, CS: height / 1.33, ME: height / 2, CB: height / 2, EE: height / 2.5 };
		var colordict = { CE: '#c5aa84', CS: '#3adcc6', ME: '#914529', CB: '#f26d7d', EE: '#d0343a' };

		console.log(forcedictX);

		const svg = d3.select(this.myRef.current);
		var simulation = d3.forceSimulation().nodes(bigga);
		simulation
			.force('charge_force', d3.forceManyBody().strength(600))
			.force(
				'X',
				d3.forceX(function(d) {
					return forcedictX[d.branch];
				})
			)
			.force(
				'Y',
				d3.forceY(function(d) {
					return forcedictY[d.branch];
				})
			)
			.force(
				'collide',
				d3.forceCollide(function(d) {
					return d.size + 7;
				})
			);
		// var defs = svg.append('defs');
		// defs
		// 	.append('pattern')
		// 	.attr('id', 'picture')
		// 	.attr('height', '100%')
		// 	.attr('width', '100%')
		// 	.attr('patterContentUnits', 'objectBoundingBox')
		// 	.append('image')
		// 	.attr('height', 1)
		// 	.attr('width', 1)
		// 	.attr('preserveAspectRatio', 'none')
		// 	.attr('xmlns', 'http://www.w3.org/2000/svg')
		// 	.attr('src', photo);
		var zoom_handler = d3.zoom().on('zoom', zoom_actions);
		zoom_handler(svg);
		function zoom_actions(event) {
			node.attr('transform', event.transform);
			texts.attr('transform', event.transform);
		}

		var node = svg
			.append('g')
			.attr('class', 'nodes')
			.selectAll('circle')
			.data(bigga)
			.enter()
			.append('circle')
			.attr('r', (d) => d.size)
			.attr('fill', (d) => colordict[d.branch])
			.attr('stroke', 'white')
			.on('mouseover', function(d, i) {
				d3.select(this).transition().attr('r', (d) => d.size + 5);

				// div.transition().duration(50).style('opacity', '1');
			})
			.on('mouseout', function(d, i) {
				d3.select(this).transition().attr('r', (d) => d.size);

				// div.transition().duration(50).style('opacity', '0');
			});
		node.attr('onclick', function(d) {
			var link = "window.top.location.href='" + '/' + d._id + "'";
			return link;
		});
		// var i;
		// for (i = 0; i < bigga.length; i++) {
		// 	if (bigga[i].brach == 'CE') {
		// 		node.data(bigga[i]);
		// 	}
		// }
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

		d3.select('#branchwise').on('click', function() {
			simulation
				.force(
					'X',
					d3.forceX(function(d) {
						return forcedictX[d.branch];
					})
				)
				.force(
					'Y',
					d3.forceY(function(d) {
						return forcedictY[d.branch];
					})
				)
				.alphaTarget(0.3)
				.restart();
		});

		d3.select('#normal').on('click', function() {
			simulation.force('X', d3.forceX(width / 2)).force('Y', d3.forceY(height / 2)).alphaTarget(0.3).restart();
		});
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

	render() {
		return (
			<div class={'patterner'}>
				<div className="buttons">
					<Button id={'branchwise'} className="button">Branchwise</Button>
					<Button id={'normal'} className="button">Normal</Button>
				</div>
				

				<svg
					ref={this.myRef}
					style={{ width: window.innerWidth, height: window.innerHeight, background: 'black' }}
				/>
			</div>
		);
	}
}

export default BarChart;
