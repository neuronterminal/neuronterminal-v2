import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NetworkData, NeuralNode, NeuralLink } from '../types';
import { getNodeColor } from '../utils/colors';

interface NetworkGraphProps {
  data: NetworkData;
  showWeights: boolean;
  showActivations: boolean;
  selectedNode: string | null;
  onNodeSelect: (nodeId: string | null) => void;
}

export function NetworkGraph({
  data,
  showWeights,
  showActivations,
  selectedNode,
  onNodeSelect
}: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const width = svgRef.current.clientWidth || 600;
    const height = svgRef.current.clientHeight || 400;
    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll('*').remove();

    // Create force simulation
    const simulation = d3.forceSimulation<NeuralNode>(data.nodes)
      .force('link', d3.forceLink<NeuralNode, NeuralLink>(data.links)
        .id(d => d.id)
        .distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Create container groups
    const container = svg.append('g');
    const linksGroup = container.append('g');
    const nodesGroup = container.append('g');

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Draw links with gradients
    const links = linksGroup
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#00ff41')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.abs(d.weight) * 3);

    if (showWeights) {
      links.append('title')
        .text(d => `Weight: ${d.weight.toFixed(3)}`);
    }

    // Draw nodes with glowing effect
    const nodes = nodesGroup
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', 12)
      .attr('fill', d => getNodeColor(d.type))
      .attr('stroke', '#00ff41')
      .attr('stroke-width', d => d.id === selectedNode ? 3 : 1)
      .style('filter', 'url(#glow)')
      .on('click', (event, d) => {
        onNodeSelect(d.id === selectedNode ? null : d.id);
        event.stopPropagation();
      });

    // Add glow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow');
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');
    
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    if (showActivations) {
      nodes.append('title')
        .text(d => `${d.label}\nActivation: ${d.activation.toFixed(3)}`);
    }

    // Add node labels
    nodesGroup
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .attr('dx', 15)
      .attr('dy', 5)
      .text(d => d.label)
      .attr('fill', '#00ff41')
      .attr('font-size', '12px')
      .attr('font-family', 'monospace');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      links
        .attr('x1', d => (d.source as NeuralNode).x!)
        .attr('y1', d => (d.source as NeuralNode).y!)
        .attr('x2', d => (d.target as NeuralNode).x!)
        .attr('y2', d => (d.target as NeuralNode).y!);

      nodes
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);

      nodesGroup
        .selectAll('text')
        .attr('x', d => d.x!)
        .attr('y', d => d.y!);
    });

    return () => {
      simulation.stop();
    };
  }, [data, showWeights, showActivations, selectedNode]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full bg-[#0d0208]"
      onClick={() => onNodeSelect(null)}
    />
  );
}