import { fabric } from 'fabric';

import {
	Arrow,
	Cube,
	CurvedLink,
	Line,
	LineLink,
	Link,
	Node,
	OrthogonalLink,
} from './objects';
import Svg, { SvgOption } from './objects/Svg';
import { FabricObject } from './utils';

export interface ObjectSchema {
	create: (...option: any) => fabric.Object;
}

export interface CanvasObjectSchema {
	[key: string]: ObjectSchema;
}

export const createCanvasObject = (objectSchema: CanvasObjectSchema) => objectSchema;

const CanvasObject: CanvasObjectSchema = {
	group: {
		create: ({ objects, ...option }: { objects: FabricObject[] }) => new fabric.Group(objects, option),
	},
	'i-text': {
		create: ({ text, ...option }: { text: string }) => new fabric.IText(text, option),
	},
	textbox: {
		create: ({ text, ...option }: { text: string }) => new fabric.Textbox(text, option),
	},
	triangle: {
		create: (option: any) => new fabric.Triangle(option),
	},
	circle: {
		create: (option: any) => new fabric.Circle(option),
	},
	rect: {
		create: (option: any) => new fabric.Rect(option),
	},
	cube: {
		create: (option: any) => new Cube(option),
	},
	image: {
		create: ({ element = new Image(), ...option }) =>
			new fabric.Image(element, {
				...option,
				crossOrigin: 'anonymous',
			}),
	},
	polygon: {
		create: ({ points, ...option }: { points: any }) =>
			new fabric.Polygon(points, {
				...option,
				perPixelTargetFind: true,
			}),
	},
	line: {
		create: ({ points, ...option }: { points: any }) => new Line(points, option),
	},
	arrow: {
		create: ({ points, ...option }: { points: any }) => new Arrow(points, option),
	},
	node: {
		create: (option: any) => new Node(option),
	},
	lineLink: {
		create: (fromNode, fromPort, toNode, toPort, option) =>
			new LineLink(fromNode, fromPort, toNode, toPort, option),
	},
	link: {
		create: (fromNode, fromPort, toNode, toPort, option) => new Link(fromNode, fromPort, toNode, toPort, option),
	},
	curvedLink: {
		create: (fromNode, fromPort, toNode, toPort, option) =>
			new CurvedLink(fromNode, fromPort, toNode, toPort, option),
	},
	orthogonalLink: {
		create: (fromNode, fromPort, toNode, toPort, option) =>
			new OrthogonalLink(fromNode, fromPort, toNode, toPort, option),
	},
	svg: {
		create: (option: SvgOption) => new Svg(option),
	},
};

export default CanvasObject;
