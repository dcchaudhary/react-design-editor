import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import { FabricObject } from '../utils';
import { NodeObject, OUT_PORT_TYPE } from './Node';
import { PortObject } from './Port';

export interface LineLinkObject extends FabricObject<fabric.Line> {
	fromNode?: NodeObject;
	toNode?: NodeObject;
	fromPort?: PortObject;
	toPort?: PortObject;
	fromPortIndex?: number;
	setPort?: (fromNode: NodeObject, fromPort: PortObject, toNode: NodeObject, toPort: PortObject) => void;
	setPortEnabled?: (node: NodeObject, port: PortObject, enabled: boolean) => void;
}

const LineLink = fabric.util.createClass(fabric.Line, {
	type: 'lineLink',
	superType: 'link',
	initialize(
		fromNode: Partial<NodeObject>,
		fromPort: Partial<PortObject>,
		toNode: Partial<NodeObject>,
		toPort: Partial<PortObject>,
		options: Partial<LineLinkObject>,
	) {
		options = options || {};
		const coords = [fromPort.left, fromPort.top, toPort.left, toPort.top];
		Object.assign(options, {
			strokeWidth: 4,
			id: options.id || uuid(),
			originX: 'center',
			originY: 'center',
			lockScalingX: true,
			lockScalingY: true,
			lockRotation: true,
			hasRotatingPoint: false,
			hasControls: false,
			hasBorders: false,
			perPixelTargetFind: true,
			lockMovementX: true,
			lockMovementY: true,
			selectable: false,
			fromNode,
			fromPort,
			toNode,
			toPort,
			hoverCursor: 'pointer',
		});
		this.callSuper('initialize', coords, options);
	},
	setPort(fromNode: NodeObject, fromPort: PortObject, _toNode: NodeObject, toPort: PortObject) {
		if (fromNode.type === 'BroadcastNode') {
			fromPort = fromNode.fromPort[0];
		}
		fromPort.links.push(this);
		toPort.links.push(this);
		this.setPortEnabled(fromNode, fromPort, false);
	},
	setPortEnabled(node: NodeObject, port: PortObject, enabled: boolean) {
		if (node.descriptor.outPortType !== OUT_PORT_TYPE.BROADCAST) {
			port.set({
				enabled,
				fill: enabled ? port.originFill : port.selectFill,
			});
		} else {
			if (node.toPort.id === port.id) {
				return;
			}
			port.links.forEach((link, index) => {
				link.set({
					fromPort: port,
					fromPortIndex: index,
				});
			});
			node.set({
				configuration: {
					outputCount: port.links.length,
				},
			});
		}
	},
	toObject() {
		return fabric.util.object.extend(this.callSuper('toObject'), {
			id: this.get('id'),
			name: this.get('name'),
			superType: this.get('superType'),
			configuration: this.get('configuration'),
			fromNode: this.get('fromNode'),
			fromPort: this.get('fromPort'),
			toNode: this.get('toNode'),
			toPort: this.get('toPort'),
		});
	},
	_render(ctx: CanvasRenderingContext2D) {
		this.callSuper('_render', ctx);
		ctx.save();
		const xDiff = this.x2 - this.x1;
		const yDiff = this.y2 - this.y1;
		const angle = Math.atan2(yDiff, xDiff);
		ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
		ctx.rotate(angle);
		ctx.beginPath();
		if (this.arrow) {
			// Move 5px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
			ctx.moveTo(5, 0);
			ctx.lineTo(-5, 5);
			ctx.lineTo(-5, -5);
		}
		ctx.closePath();
		ctx.lineWidth = this.strokeWidth;
		ctx.fillStyle = this.stroke;
		ctx.fill();
		ctx.restore();
	},
});

LineLink.fromObject = (options: LineLinkObject, callback: (obj: LineLinkObject) => any) => {
	const { fromNode, fromPort, toNode, toPort } = options;
	return callback(new LineLink(fromNode, fromPort, toNode, toPort, options));
};

// @ts-ignore
window.fabric.LineLink = LineLink;

export default LineLink;
