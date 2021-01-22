import photo from '../media/photos/anushree.jpg';
import { useD3 } from './useD3';
import React from 'react';
import { drag } from 'd3';
const d3 = require('d3');

export default function Bubbles() {
	const ref = useD3((svg) => {
		var simulation = d3.forceSimulation().nodes(nodes_data);
		simulation
			.force('charge_force', d3.forceManyBody().strength(10))
			.force('center_force', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
			.force(
				'collide',
				d3.forceCollide(function(d) {
					return d.size + 1;
				})
			)
			.force('x', d3.forceX(window.innerWidth / 5).strength(0.5));
		var node = svg
			.append('g')
			.attr('class', 'nodes')
			.selectAll('circle')
			.data(nodes_data)
			.enter()
			.append('circle')
			.attr('r', function(d) {
				return d.size;
			})
			.attr('text', (d) => d.id)
			.attr('fill', 'orange')
			.attr('stroke', 'yellow')
			.attr('onclick', "window.top.location.href='';");

		simulation.on('tick', tickActions);
		function tickActions() {
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
	});

	return (
		<div>
			<svg ref={ref} style={{ width: window.innerWidth, height: window.innerHeight, background: 'black' }}>
				<defs>
					<pattern style={{ id: 'photo', height: '100%', width: '100%' }}>
						<img
							style={{
								width: 1,
								height: 1,
								preserveAspectRatio: 'none'
							}}
							src={photo}
						/>
					</pattern>
				</defs>
			</svg>
		</div>
	);
}
var nodes_data = [
	{ id: 'Nilendu', size: 3, path_to_img: '../media/nilendu.jpg' },
	{ id: 'Viswajeeth', size: 5, path_to_img: '../media/viswajeeth.jpg' },
	{ id: 'Abhinav_Yadav', size: 20, path_to_img: '../media/yadav.jpg' },
	{ id: 'Abhinav_Gyan', size: 15, path_to_img: '../media/gyan.jpg' },
	{ id: 'Anushree_Jain', size: 3, path_to_img: '../media/anushree.jpg' },
	{ id: 'Arundhati_Gupta', size: 40, path_to_img: '../media/arundhathi.jpg' },
	{ id: 'Raghav_Heda', size: 5, path_to_img: '../media/raghav.jpg' },
	{ id: 'Rishabh_Yadav', size: 6, path_to_img: '../media/rishabh.jpg' },
	{ id: 'Teja_Reddy', size: 9, path_to_img: '../media/teja.jpg' },
	{ id: 'Honey_Sandhu', size: 10, path_to_img: '../media/honey.jpg' }
];
