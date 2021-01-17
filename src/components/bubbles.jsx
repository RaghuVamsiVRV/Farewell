import globalStyles from '../styles/layout.module.css'
import { useD3 } from './useD3';
import React from 'react';
const d3 = require('d3');

export default function Bubbles() {
	const ref = useD3((svg) => {
		var simulation = d3.forceSimulation().nodes(nodes_data);
		simulation.force('charge_force', d3.forceManyBody()).force("center_force", d3.forceCenter(300, 300));;

		var node = svg
			.append('g')
			.attr('class', 'nodes')
			.selectAll('circle')
			.data(nodes_data)
			.enter()
			.append('circle')
			.attr('r',10)
			.attr('fill', 'red');

		simulation.on('tick', tickActions);
		function tickActions() {
			//update circle positions to reflect node updates on each tick of the simulation
			node
				.attr('cx', function(d) {
					return d.x;
				})
				.attr('cy', function(d) {
					return d.y;
				});
		}
		
	});

	return (
		<div>
			<svg ref={ref} style={{ width: window.innerWidth, height: window.innerHeight, background: 'black' }} />
		</div>
	);
}
var nodes_data = [
	{ id: 'Travis', sex: 'M' },
	{ id: 'Rake', sex: 'M' },
	{ id: 'Diana', sex: 'F' },
	{ id: 'Rachel', sex: 'F' },
	{ id: 'Shawn', sex: 'M' },
	{ id: 'Emerald', sex: 'F' },
	{ id: 'Travis', sex: 'M' },
	{ id: 'Rake', sex: 'M' },
	{ id: 'Diana', sex: 'F' },
	{ id: 'Rachel', sex: 'F' },
	{ id: 'Shawn', sex: 'M' },
	{ id: 'Emerald', sex: 'F' }
];

